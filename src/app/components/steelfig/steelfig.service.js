(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigService', Steelfig);

    function Steelfig () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$q', '$location', '$http', 'steelfigAuth',
            'steelfigEventService', 'steelfigWishlistService'];
        function fetchService ($q, $location, $http, steelfigAuth,
                steelfigEvent, steelfigWish) {
            return {
                signin: signin,
                fetchUser: user,
                fetchAttendees: steelfigEvent.fetchAttendees,
                unlinkAccount: unlinkAccount,
                invite: steelfigEvent.invite,
                fetchWishlist: steelfigWish.fetch
            };

            function signin (accessToken) {
                return $http.post(apiUrl + '/auth', {access_token: accessToken})
                    .then(function (response) {
                        var apiToken = response.data.user.apiToken;
                        steelfigAuth.setToken(apiToken);
                        $location.path('/');
                    });
            }

            function user (options, reload) {
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
