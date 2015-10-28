(function () {
    'use strict';

    angular
        .module('steelfig.utils')
        .filter('rsvpResponse', rsvpResponse);

    function rsvpResponse () {
        return function (status) {
            var mapping = [
                'Just looking',
                'I will attend!',
                'I\'m out'
            ];

            return mapping[status];
        };
    }

})();
