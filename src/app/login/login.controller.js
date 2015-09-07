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
            document.getElementById('app-container').style
                .background = '#ffffff url("images/login.jpg") no-repeat center top';
        }

        function signin() {
            googleService.requestAuth();
        }
    }
})();
