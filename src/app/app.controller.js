(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', AppController);

    AppController.$inject = ['$scope', '$log', '$location', 'steelfigAuth', 'steelfigService'];
    function AppController ($scope, $log, $location, steelfigAuth, steelfigService) {
        $scope.$log = $log;

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
