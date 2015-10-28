(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigAttendeeService', SteelfigAttendee);

    function SteelfigAttendee () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                fetch: fetch,
                fetchAll: fetchAll,
                invite: invite,
                rsvp: rsvp,
                group: groupAttendees
            };

            function fetch (attendeeId) {
                return $http.get(apiUrl + '/event/' + getEventId() + '/attendee/' + attendeeId)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function fetchAll () {
                return $http.get(apiUrl + '/event/' + getEventId() + '/attendees')
                    .then(function (response) {
                        return groupAttendees(response.data.attendees);
                    });
            }

            function invite (invitation) {
                invitation = invitation || {};
                invitation.eventId = getEventId();
                return $http.post(apiUrl + '/event/invite', invitation)
                    .then(function (response) {
                        return groupAttendees(response.data.attendees);
                    });
            }

            function rsvp (data) {
                data = data || {};
                data.eventId = getEventId();
                return $http.patch(apiUrl + '/event/rsvp', data)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function groupAttendees (attendees) {
                var rows = {};

                // Group users to accounts
                angular.forEach(attendees, function (user) {
                    if (!rows[user.accountId]) {
                        rows[user.accountId] = {
                            users: [user],
                            attendeeId: user.attendeeId,
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
})();
