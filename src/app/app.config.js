(function () {
    'use strict';

    angular
        .module('app')
        .config(configureHttp)
        .config(configureSceDelegate)
        .config(configureSteelfigUser)
        .config(configureSteelfigSchedule)
        .config(configureSteelfigAttendee)
        .config(configureSteelfigMessage)
        .config(configureSteelfigWishlist);

    var port = window.location.port,
        debug = Boolean(port),
        environments = {
            dev: 'http://localhost:8000/v1',
            prod: 'https://api.steelfig.com/v1'
        },
        steelfigApiUrl = environments[debug ? 'dev' : 'prod'];

    configureHttp.$inject = ['$httpProvider'];
    function configureHttp ($httpProvider) {
        if (!$httpProvider.defaults.headers.common) {
            $httpProvider.defaults.headers.common = {};
        }

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
    }

    configureSceDelegate.$inject = ['$sceDelegateProvider'];
    function configureSceDelegate ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.steelfig.com/*'
        ]);
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
