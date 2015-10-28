(function () {
    'use strict';

    angular
        .module('app')
        .controller('AttendeeStatusModalCtrl', AttendeeStatusModalCtrl);

    AttendeeStatusModalCtrl.$inject = ['$modalInstance', 'steelfigService', 'rsvp'];
    function AttendeeStatusModalCtrl ($modalInstance, steelfig, rsvp) {
        var vm = this;
        vm.save = save;
        vm.cancel = cancel;
        vm.rsvp = angular.copy(rsvp);

        function save () {
            steelfig.attendee.rsvp(vm.rsvp);
            rsvp.status = vm.rsvp.status;
            rsvp.comment = vm.rsvp.comment;
            $modalInstance.close(vm.rsvp);
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
