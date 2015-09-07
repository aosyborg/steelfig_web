(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigService', Steelfig);

    function Steelfig () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$q', '$location', '$http', 'steelfigAuth'];
        function fetchService ($q, $location, $http, steelfigAuth) {
            return {
                signin: signin,
                fetchUser: user,
                fetchAttendees: attendees
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

            function attendees (reload) {
                var eventId = localStorage.getItem('eventId');
                if (!eventId) {
                    throw new Error('eventId not set in storage!');
                }

                return $http.get(apiUrl + '/attendees/event/' + eventId)
                    .then(function (response) {
                        var users = response.data.attendees,
                            rows = {};

                        // Group users to accounts
                        angular.forEach(users, function (user) {
                            if (!rows[user.accountId]) {
                                rows[user.accountId] = {
                                    users: [user],
                                    accountId: user.accountId,
                                    accountName: user.accountName,
                                    comment: user.comment,
                                    status: user.status
                                };
                            } else {
                                rows[user.accountId].users.push(user);
                            }
                        });

                        return rows;
                    });
            }
        }
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
