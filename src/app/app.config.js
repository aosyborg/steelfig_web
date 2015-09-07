(function () {
    'use strict';

    angular
        .module('app')
        .config(configureHttp);

    configureHttp.$inject = ['$httpProvider'];
    function configureHttp ($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
    }
})();
