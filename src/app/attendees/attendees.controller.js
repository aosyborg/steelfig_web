(function () {
    'use strict';

    angular
        .module('app')
        .controller('AttendeesCtrl', AttendeesController);

    AttendeesController.$inject = ['$scope', '$modal', 'steelfigService'];
    function AttendeesController ($scope, $modal, steelfigService) {
        var vm = this;
        vm.alerts = [];
        vm.attendees = [];
        vm.isUserInGroup = isUserInGroup;
        vm.newAttendeeModal = newAttendeeModal;
        vm.unlink = unlink;

        activate();

        function activate () {
            steelfigService.fetchAttendees()
                .then(function (attendees) {
                    vm.attendees = attendees;
                });
        }

        function isUserInGroup (attendeeGroup) {
            var result = false;
            angular.forEach(attendeeGroup.users, function (attendee) {
                if ($scope.user && $scope.user.id == attendee.userId) {
                    result = true;
                }
            });

            return result;
        }

        function newAttendeeModal () {
            $modal.open({
                templateUrl: 'app/attendees/new-attendee.modal.html',
                controller: 'NewAttendeeModalCtrl as vm',
            }).result
            .then(function (attendees) {
                if (!attendees) {
                    return;
                }

                vm.attendees = attendees;
                vm.alerts.push({type: 'success', msg: 'Invitation sent!'});
            });
        }

        function unlink () {
            steelfigService.unlinkAccount()
                .then(activate);
        }
    }
})();
