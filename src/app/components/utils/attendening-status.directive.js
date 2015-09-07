(function () {
    'use strict';

    angular
        .module('steelfig.utils')
        .directive('attendingStatus', attendingStatus);

    function attendingStatus () {
        return {
            restrict: 'AE',
            scope: {
                status: '='
            },
            link: link,
            template: "{{text}}"
        };

        function link (scope) {
            var mapping = [
                'Just looking',
                'Participating',
                'I\'m out'
            ];

            scope.text = mapping[scope.status];
        }
    }

})();
