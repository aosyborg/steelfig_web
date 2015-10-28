(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfirmCtrl', ConfirmCtrl);

    ConfirmCtrl.$inject = ['$modalInstance', 'data'];
    function ConfirmCtrl ($modalInstance, data) {
        var vm = this;
        vm.title = data.title || "Are you sure?";
        vm.body = data.body || "This cannot be undone";
        vm.btnLabel = data.btnLabel || "Delete";
        vm.ok = ok;
        vm.cancel = cancel;

        function ok () {
            $modalInstance.close();
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
