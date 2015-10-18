(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ['$scope', 'googleOAuth'];
    function LoginController ($scope, googleService) {
        $scope.signin = signin;

        activate();

        function activate () {
        }

        function signin() {
            googleService.requestAuth();
        }
    }
})();
