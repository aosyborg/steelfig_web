(function () {
    'use strict';

    angular
        .module('app')
        .config(configureHttp)
        .config(configureSteelfigUser)
        .config(configureSteelfigSchedule)
        .config(configureSteelfigAttendee)
        .config(configureSteelfigMessage)
        .config(configureSteelfigWishlist);

    var steelfigApiUrl = 'http://api.steelfig.com:8000/v1';

    configureHttp.$inject = ['$httpProvider'];
    function configureHttp ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }

    configureSteelfigUser.$inject = ['steelfigUserServiceProvider'];
    function configureSteelfigUser (provider) {
        provider.setApiUrl(steelfigApiUrl);
    }

    configureSteelfigSchedule.$inject = ['steelfigScheduleServiceProvider'];
    function configureSteelfigSchedule (provider) {
        provider.setApiUrl(steelfigApiUrl);
    }

    configureSteelfigAttendee.$inject = ['steelfigAttendeeServiceProvider'];
    function configureSteelfigAttendee (provider) {
        provider.setApiUrl(steelfigApiUrl);
    }

    configureSteelfigMessage.$inject = ['steelfigMessageServiceProvider'];
    function configureSteelfigMessage (provider) {
        provider.setApiUrl(steelfigApiUrl);
    }

    configureSteelfigWishlist.$inject = ['steelfigWishlistServiceProvider'];
    function configureSteelfigWishlist (provider) {
        provider.setApiUrl(steelfigApiUrl);
    }
})();
