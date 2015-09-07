(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', AppController);

    AppController.$inject = ['$scope', '$location', 'steelfigAuth', 'steelfigService'];
    function AppController ($scope, $location, steelfigAuth, steelfigService) {
        // Force login
        if (!steelfigAuth.loadToken()) {
            return $location.path('login');
        }

        steelfigService.fetchUser()
            .then(function (data) {
                $scope.account = data.account;
                $scope.user = data.user;

                // TODO: don't leave this here!!
                $scope.eventId = 1;
                localStorage.setItem('eventId', 1);
            });
    }
})();
