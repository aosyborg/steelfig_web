(function () {
    'use strict';

    angular
        .module('app')
        .controller('AttendeesCtrl', AttendeesController);

    AttendeesController.$inject = ['$scope', '$location', '$modal', '$timeout', 'steelfigService'];
    function AttendeesController ($scope, $location, $modal, $timeout, steelfig) {
        var vm = this;
        vm.alerts = [];
        vm.attendees = [];
        vm.myRSVP = {};

        vm.openRSVPModal = openRSVPModal;
        vm.isUserInGroup = isUserInGroup;
        vm.newAttendeeModal = newAttendeeModal;
        vm.settingsModal = settingsModal;
        vm.link = link;
        vm.unlink = unlink;
        vm.showList = showList;

        activate();

        function activate () {
            steelfig.attendee.fetchAll()
                .then(function (attendees) {
                    setAttendees(attendees);
                });
        }

        function openRSVPModal () {
            $modal.open({
                templateUrl: 'app/attendees/attendee-status.modal.html',
                controller: 'AttendeeStatusModalCtrl as vm',
                resolve: {
                    rsvp: function () {
                        return vm.myRSVP;
                    }
                }
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

                setAttendees(attendees);
                vm.alerts.push({type: 'success', msg: 'Invitation sent!'});
                $timeout(function () {
                    console.log('working');
                    vm.alerts.pop();
                }, 1000);
            });
        }

        function settingsModal () {
            $modal.open({
                templateUrl: 'app/attendees/settings.modal.html',
                controller: 'SettingsModalCtrl as vm',
                resolve: {
                    rsvp: function () {
                        return vm.myRSVP;
                    }
                }
            });
        }

        function link (attendee) {
            steelfig.user.linkAccount(attendee)
                .then(function (attendees) {
                    if (!attendees) {
                        return;
                    }

                    setAttendees(attendees);
                });
        }

        function unlink () {
            steelfig.user.unlinkAccount()
                .then(function (attendees) {
                    if (!attendees) {
                        return;
                    }

                    setAttendees(attendees);
                });
        }

        function setAttendees (attendees) {
            vm.attendees = attendees;

            angular.forEach(attendees, function (attendee, accountId) {
                if (accountId == $scope.account.id) {
                    vm.myRSVP = attendee;
                }
            });
        }

        function showList (attendee) {
            $location.path('/wishlist/' + attendee.attendeeId);
        }
    }
})();
