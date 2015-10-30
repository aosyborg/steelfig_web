(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigMessageService', SteelfigMessage);

    function SteelfigMessage () {
        var provider = this,
            apiUrl = '';

        provider.$get = fetchService;
        provider.setApiUrl = setApiUrl;

        function setApiUrl (url) {
            apiUrl = url;
        }

        fetchService.$inject = ['$q', '$http'];
        function fetchService ($q, $http) {
            return {
                fetch: fetch,
                create: create,
                reply: replyMessage,
                read: readMessage
            };

            function fetch () {
                return $http.get(apiUrl + '/messages?eventId=' + getEventId())
                    .then(function (response) {
                        return response.data;
                    });
            }

            function create (message) {
                message = message || {};
                message.eventId = getEventId();
                return $http.post(apiUrl + '/message', message)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function replyMessage (message) {
                message = message || {};
                message.eventId = getEventId();
                return $http.post(apiUrl + '/message/reply', message)
                    .then(function (response) {
                        return response.data;
                    });
            }

            function readMessage (message) {
                if (message.read_at) {
                    return $q(function (resolve, reject) {
                        resolve(true);
                    });
                }

                message.read_at = (new Date()).toLocaleString();
                return $http.patch(apiUrl + '/message/read/' + message.id)
                    .then(function (response) {
                        return true;
                    });
            }
        }

        function getEventId () {
            var eventId = localStorage.getItem('eventId');
            if (!eventId) {
                throw new Error('eventId not set in storage!');
            }

            return eventId;
        }
    }
})();
