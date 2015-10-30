(function () {
    'use strict';

    angular
        .module('steelfig.utils')
        .filter('scheduleDate', scheduleDate);

    scheduleDate.$inject = ['$sce'];
    function scheduleDate ($sce) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'];

        return function (date) {
            var html = months[date.getMonth()] + ' ' +
                       date.getDate() + ', ' +
                       date.getFullYear() + '<br>' +
                       days[date.getDay()];

            return $sce.trustAsHtml(html);
        };
    }

})();
