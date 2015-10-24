(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigUserService', SteelfigUser);

    function SteelfigUser () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$q', '$http', 'steelfigAuth'];
        function fetchService ($q, $http, auth) {
            return {
                signin: signin,
                fetch: fetch,
                linkAccount: linkAccount,
                unlinkAccount: unlinkAccount,
            };

            function signin (accessToken, callback) {
                return $http.post(apiUrl + '/auth', {access_token: accessToken})
                    .then(function (response) {
                        var apiToken = response.data.user.apiToken;
                        auth.setToken(apiToken);

                        if (angular.isFunction(callback)) {
                            callback();
                        }
                    });
            }

            function fetch (options, reload) {
                var queryString = param(options || {}),
                    localStorageKey = 'steelfig_user',
                    storedUser = localStorage.getItem(localStorageKey);

                reload = reload || false;
                if (!reload && storedUser) {
                    return $q(function (resolve, reject) {
                        resolve(JSON.parse(storedUser));
                    });
                }

                return $http.get(apiUrl + '/user' + queryString)
                    .then(function (response) {
                        localStorage.setItem(localStorageKey, JSON.stringify(response.data));
                        return response.data;
                    });
            }

            function linkAccount () {
            }

            function unlinkAccount () {
                return $http.post(apiUrl + '/account/unlink', {eventId: getEventId()});
            }
        }
    }

    function getEventId () {
        var eventId = localStorage.getItem('eventId');
        if (!eventId) {
            throw new Error('eventId not set in storage!');
        }

        return eventId;
    }

    function param (options) {
        var params = [];
        angular.forEach(options, function (value, key) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        });

        if (params.length) {
            return '?' + params.join('&');
        }

        return '';
    }
})();
