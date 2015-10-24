(function () {
    'use strict';

    angular
        .module('app')
        .config(configureHttp)
        .config(configureSteelfig);

    configureHttp.$inject = ['$httpProvider'];
    function configureHttp ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }

    configureSteelfig.$inject = ['steelfigServiceProvider'];
    function configureSteelfig (steelfigProvider) {
        steelfigProvider.setApiUrl('http://api.steelfig.com:8000/v1');
    }
})();
