(function () {
    'use strict';

    angular
        .module('app')
        .controller('PartialCtrl', PartialController);

    PartialController.$inject = ['$scope', '$location'];
    function PartialController ($scope, $location) {
        $scope.menuIsCollapsed = true;
        $scope.accountDropDownIsCollapsed = true;
        $scope.go = function (path) {
            $location.path(path);
        };
    }
})();
