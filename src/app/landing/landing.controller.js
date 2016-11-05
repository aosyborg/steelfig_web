(function () {
    'use strict';

    angular
        .module('app')
        .controller('LandingCtrl', LandingController);

    LandingController.$inject = ['$scope', '$modal', '$location', 'steelfigService'];
    function LandingController ($scope, $modal, $location, steelfig) {
        var vm = this;
        vm.myRSVP = {};
        vm.attendees = [];
        vm.openRSVPModal = openRSVPModal;
        vm.go = go;

        activate();

        function activate () {
            steelfig.attendee.fetchAll()
                .then(function (attendees) {
                    angular.forEach(attendees, function (attendee, accountId) {
                        if (accountId == $scope.account.id) {
                            vm.myRSVP = attendee;
                        }

                        if (attendee.status == 1) {
                            vm.attendees.push(attendee);
                        }
                    });
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

        function go (path) {
            $location.path(path);
        }
    }
})();
