(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigScheduleService', SteelfigSchedule);

    function SteelfigSchedule () {
        var provider = this,
            apiUrl = '';

        provider.$get = fetchService;
        provider.setApiUrl = setApiUrl;

        function setApiUrl (url) {
            apiUrl = url;
        }

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                fetch: fetch,
                modify: modify
            };

            function fetch () {
                var eventId = getEventId();
                return $http.get(apiUrl + '/schedule?eventId=' + eventId)
                    .then(function (response) {
                        var schedules = response.data,
                            date;

                        for (var i in schedules) {
                            date = schedules[i].available_at;

                            schedules[i].available_at = new Date(date);
                        }

                        return schedules;
                    });
            }

            function modify (date) {
                var data = {
                        eventId: getEventId(),
                        availableAt: '' +
                            date.getFullYear() + '-' +
                            (date.getMonth() + 1) + '-' +
                            date.getDate() + ' ' +
                            date.getHours() + ':00'
                    };

                return $http.patch(apiUrl + '/schedule', data)
                    .then(function (response) {
                        return response.data;
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
