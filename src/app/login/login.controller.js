(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginController);

    LoginController.$inject = ['$window', 'googleOAuth'];
    function LoginController ($window, googleService) {
        var vm = this;
        vm.signin = signin;

        function signin() {
            googleService.requestAuth(function (data) {
                $window.location.href = '/';
            });
        }
    }
})();
