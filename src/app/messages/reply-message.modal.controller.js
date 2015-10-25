(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReplyMessageModalCtrl', ReplyMessageModalCtrl);

    ReplyMessageModalCtrl.$inject = ['$modalInstance', 'steelfigService', 'orgMessage'];
    function ReplyMessageModalCtrl ($modalInstance, steelfig, orgMessage) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.errors = {};
        vm.title = 'Re: ' + orgMessage.subject;

        activate();

        function activate () {
        }

        function send (message) {
            vm.isLoading = true;
            vm.errors = {
                message: false
            };

            message = message || {};
            message.subject = vm.title;
            message.replyTo = orgMessage.id;
            steelfig.message.reply(message)
                .then(function (messages) {
                    vm.isLoading = false;
                    $modalInstance.close(messages);

                }, function (response) {
                    var errors = response.data.validation;
                    vm.isLoading = false;

                    angular.forEach(errors, function (error) {
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
