(function () {
    'use strict';

    angular
        .module('steelfig.auth')
        .provider('steelfigAuth', SteelfigAuth);

    function SteelfigAuth () {
        var provider = this,
            storageKey = 'steelfig_api_token';

        provider.$get = fetchService;

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                loadToken: loadToken,
                setToken: setToken,
                clearToken: clearToken
            };

            function loadToken () {
                var token = localStorage.getItem(storageKey);
                if (!token) {
                    return false;
                }

                setToken(token);
                return true;
            }

            function setToken (token) {
                localStorage.setItem(storageKey, token);
                $http.defaults.headers.common.Authorization = 'Basic ' + token;
            }

            function clearToken () {
                localStorage.removeItem(storageKey);
                $http.defaults.headers.common.Authorization = null;
            }
        }
    }
})();
