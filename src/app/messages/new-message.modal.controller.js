(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewMessageModalCtrl', NewMessageModalCtrl);

    NewMessageModalCtrl.$inject = ['$modalInstance', 'steelfigService'];
    function NewMessageModalCtrl ($modalInstance, steelfig) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.attendees = {};
        vm.errors = {};

        activate();

        function activate () {
            vm.isLoading = true;

            steelfig.attendee.fetchAll()
                .then(function (attendees) {
                    vm.isLoading = false;
                    vm.attendees = attendees;
                });
        }

        function send (message) {
            message = message || {};
            vm.isLoading = true;
            vm.errors = {
                toId: false,
                subject: false,
                message: false
            };

            steelfig.message.create(message)
                .then(function (messages) {
                    vm.isLoading = false;
                    $modalInstance.close(messages);

                }, function (response) {
                    var errors = response.data.validation;
                    vm.isLoading = false;

                    angular.forEach(errors, function (error) {
                        if (/toId/i.test(error)) {
                            vm.errors.toId = true;
                        }
                        if (/subject/i.test(error)) {
                            vm.errors.subject = true;
                        }
                        if (/message/i.test(error)) {
                            vm.errors.message = true;
                        }
                    });
                });
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
