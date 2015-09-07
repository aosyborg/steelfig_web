(function () {
    'use strict';

    angular
        .module('app')
        .controller('NewAttendeeModalCtrl', NewAttendeeModalCtrl);

    NewAttendeeModalCtrl.$inject = ['$modalInstance'];
    function NewAttendeeModalCtrl ($modalInstance) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;

        function send () {
            $modalInstance.close();
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
