(function () {
    'use strict';

    angular
        .module('app')
        .controller('LandingCtrl', LandingController);

    LandingController.$inject = ['$scope', '$modal', 'steelfigService'];
    function LandingController ($scope, $modal, steelfig) {
        var vm = this;
        vm.myRSVP = {};
        vm.openRSVPModal = openRSVPModal;

        activate();

        function activate () {
            steelfig.attendee.fetchAll()
                .then(function (attendees) {
                    angular.forEach(attendees, function (attendee, accountId) {
                        if (accountId == $scope.account.id) {
                            vm.myRSVP = attendee;
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

    }
})();
