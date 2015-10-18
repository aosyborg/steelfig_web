(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewAttendeeModalCtrl', NewAttendeeModalCtrl);

    NewAttendeeModalCtrl.$inject = ['$modalInstance', 'steelfigService'];
    function NewAttendeeModalCtrl ($modalInstance, steelfigService) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.errors = {
            name: false,
            email: false
        };

        function send (invitation) {
            vm.errors.name = false;
            vm.errors.email = false;
            vm.isLoading = true;

            steelfigService.invite(invitation)
                .then(function (attendees) {
                    vm.isLoading = false;
                    $modalInstance.close(attendees);

                }, function (response) {
                    vm.isLoading = false;
                    angular.forEach(response.data.validation, function(error) {
                        if (/name/i.test(error)) {
                            vm.errors.name = true;
                        }
                        if (/email/i.test(error)) {
                            vm.errors.email = true;
                        }
                    });

                });
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
