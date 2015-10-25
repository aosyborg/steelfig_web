(function () {
    'use strict';

    angular
        .module('steelfig.utils')
        .filter('datetime', dateFilter);

    function dateFilter () {
        return function (input) {
            var date = new Date(input),
                result = '';

            if (!input) {
                return 'Unread';
            }

            result += date.getFullYear();
            result += '-' + date.getMonth();
            result += '-' + date.getDate();
            result += ' ' + date.getHours() % 12;
            result += ':' + pad(date.getMinutes());
            result += ' ' + date.getHours() % 12 === 0 ? 'am' : 'pm';
            return result;
        };

        function pad (n) {
            return n<10 ? '0' + n : n;
        }
    }
}());

