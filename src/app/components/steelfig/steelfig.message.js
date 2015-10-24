(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigMessageService', SteelfigMessage);

    function SteelfigMessage () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                fetch: fetch,
                reply: replyMessage,
                delete: deleteMessage
            };

            function fetch () {
                return $http.get(apiUrl + '/messages')
                    .then(function (response) {
                        return response.data.messages;
                    });
            }

            function replyMessage (message) {
                message = message || {};
                message.eventId = getEventId();
                return $http.post(apiUrl + '/message', message)
                    .then(function (response) {
                        return true;
                    });
            }

            function deleteMessage (message) {
                return $http.delete(apiUrl + '/message/' + message.id)
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
