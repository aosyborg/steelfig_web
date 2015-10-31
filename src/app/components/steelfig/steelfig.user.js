(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigUserService', SteelfigUser);

    function SteelfigUser () {
        var provider = this,
            apiUrl = '';

        provider.$get = fetchService;
        provider.setApiUrl = setApiUrl;

        function setApiUrl (url) {
            apiUrl = url;
        }

        fetchService.$inject = ['$rootScope', '$q', '$http', 'steelfigAuth', 'steelfigAttendeeService'];
        function fetchService ($scope, $q, $http, auth, attendeeService) {
            return {
                signin: signin,
                fetch: fetch,
                updateAccount: updateAccount,
                linkAccount: linkAccount,
                unlinkAccount: unlinkAccount,
            };

            function signin (accessToken, callback) {
                return $http.post(apiUrl + '/auth', {access_token: accessToken})
                    .then(function (response) {
                        var apiToken = response.data.user.apiToken;
                        auth.setToken(apiToken);
                        callback();
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

            function updateAccount (data) {
                return $http.patch(apiUrl + '/account', data)
                    .then(function (response) {
                        $scope.account = response.data.account;
                        localStorage.removeItem('steelfig_user');
                        return response.data.account;
                    });
            }

            function linkAccount (attendee) {
                attendee = attendee || {};
                attendee.eventId = getEventId();
                return $http.post(apiUrl + '/account/link', attendee)
                    .then(function (response) {
                        $scope.user = response.data.user;
                        $scope.account = response.data.account;
                        localStorage.removeItem('steelfig_user');
                        return attendeeService.group(response.data.attendees);
                    });
            }

            function unlinkAccount () {
                return $http.patch(apiUrl + '/account/link', {eventId: getEventId()})
                    .then(function (response) {
                        $scope.user = response.data.user;
                        $scope.account = response.data.account;
                        localStorage.removeItem('steelfig_user');
                        return attendeeService.group(response.data.attendees);
                    });
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
