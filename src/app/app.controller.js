(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', AppController);

    AppController.$inject = ['$scope', '$log', '$location', 'steelfigAuth', 'steelfigService'];
    function AppController ($scope, $log, $location, steelfigAuth, steelfig) {
        $scope.$log = $log;
        $scope.logout = logout;

        activate();

        function activate () {
            // TODO: don't leave this here!!
            $scope.eventId = 1;
            localStorage.setItem('eventId', 1);

            // Force login
            if (!steelfigAuth.loadToken()) {
                return $location.path('login');
            }

            steelfig.user.fetch()
                .then(function (data) {
                    $scope.account = data.account;
                    $scope.user = data.user;

                });
        }

        function logout () {
            localStorage.clear();
            $location.path('login');
        }
    }
})();
