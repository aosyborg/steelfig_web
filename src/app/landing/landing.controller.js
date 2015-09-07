(function () {
    'use strict';

    angular
        .module('app')
        .controller('LandingCtrl', LandingController);

    LandingController.$inject = ['$scope', '$location'];
    function LandingController ($scope, $location) {
        $scope.go = changeLocation;

        activate();
        function activate () {
        }

        function changeLocation(path) {
            $location.path(path);
        }
    }
})();
