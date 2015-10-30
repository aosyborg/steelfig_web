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
            .state('schedule', {
                url: '/schedule',
                controller: 'ScheduleCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/schedule/schedule.html'
            })
            .state('attendees', {
                url: '/attendees',
                controller: 'AttendeesCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/attendees/attendees.html'
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
            })
            .state('buddylist', {
                url: '/wishlist/:attendeeId',
                controller: 'BuddyWishlistCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/wishlist/buddylist.html'
            });

        $urlRouterProvider.otherwise('/');
    }
})();
