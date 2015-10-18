(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigEventService', SteelfigEvent);

    function SteelfigEvent () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                fetchAttendees: attendees,
                invite: invite
            };

            function attendees (reload) {
                return $http.get(apiUrl + '/event/attendees/' + getEventId())
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
        }
    }

    function getEventId () {
        var eventId = localStorage.getItem('eventId');
        if (!eventId) {
            throw new Error('eventId not set in storage!');
        }

        return eventId;
    }

    function groupAttendees (attendees) {
        var rows = {};

        // Group users to accounts
        angular.forEach(attendees, function (user) {
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
    }
})();
