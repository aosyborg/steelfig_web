(function () {
    'use strict';

    angular
        .module('app')
        .controller('AttendeesCtrl', AttendeesController);

    AttendeesController.$inject = ['attendeesPrepService', '$modal'];
    function AttendeesController (attendeesPrepService, $modal) {
        var vm = this;
        vm.attendees = attendeesPrepService;
        vm.newAttendeeModal = newAttendeeModal;

        function newAttendeeModal () {
            $modal.open({
                templateUrl: 'app/attendees/new-attendee.modal.html',
                controller: 'NewAttendeeModalCtrl as vm',
            });
        }
    }
})();
