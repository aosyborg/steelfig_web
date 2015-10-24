(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ['$location', 'googleOAuth'];
    function LoginController ($location, googleService) {
        var vm = this;
        vm.signin = signin;

        activate();

        function activate () {
        }

        function signin() {
            googleService.requestAuth(function () {
                $location.path('/');
            });
        }
    }
})();
