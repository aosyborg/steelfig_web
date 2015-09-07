(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider
            .hashPrefix('!')
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/landing/landing.html'
            })
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/login/login.html'
            })
            .state('attendees', {
                url: '/attendees',
                controller: 'AttendeesCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/attendees/attendees.html',
                resolve: {
                    attendeesPrepService: attendeesPrepService
                }
            })
            .state('messages', {
                url: '/messages',
                controller: 'MessagesCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/messages/messages.html'
            })
            .state('wishlist', {
                url: '/wishlist',
                controller: 'WishlistCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/wishlist/wishlist.html'
            });

        $urlRouterProvider.otherwise('/');
    }

    attendeesPrepService.$inject = ['steelfigService'];
    function attendeesPrepService (steelfigService) {
        return steelfigService.fetchAttendees();
    }
})();
