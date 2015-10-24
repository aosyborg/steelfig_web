(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewMessageModalCtrl', NewMessageModalCtrl);

    NewMessageModalCtrl.$inject = ['$modalInstance', 'steelfigService', 'message'];
    function NewMessageModalCtrl ($modalInstance, steelfig, message) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.errors = {
            to: false,
        };

        function send (message) {
            vm.errors.to = false;
            vm.isLoading = true;

            steelfig.message.addItem(item)
                .then(function (items) {
                    vm.isLoading = false;
                    $modalInstance.close(items);

                }, function (response) {
                    vm.isLoading = false;
                    angular.forEach(response.data.validation, function(error) {
                        if (/to/i.test(error)) {
                            vm.errors.to = true;
                        }
                    });

                });
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
