(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsModalCtrl', SettingsModalCtrl);

    SettingsModalCtrl.$inject = ['$modalInstance', 'steelfigService', 'rsvp'];
    function SettingsModalCtrl ($modalInstance, steelfig, rsvp) {
        var vm = this;
        vm.save = save;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.accountName = rsvp.accountName;
        vm.errors = {
            name: false
        };

        function save () {
            vm.errors.name = false;
            vm.isLoading = true;

            rsvp.accountName = vm.accountName;
            steelfig.user.updateAccount({name: vm.accountName});
            $modalInstance.close();
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
