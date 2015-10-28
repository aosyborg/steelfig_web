(function () {
    'use strict';

    angular
        .module('steelfig.utils')
        .directive('confirm', confirm);

    confirm.$inject = ['$modal'];
    function confirm ($modal) {
        return {
            priority: 1,
            restrict: 'A',
            scope: {
                ngClick: '&',
                confirm: '@',
                confirmtitle: '@',
                btnlabel: '@'
            },
            link: link
        };

        function link (scope, element) {
            element.unbind('click').bind('click', function ($event) {
                $event.preventDefault();
                var data = {
                    title: scope.confirmtitle,
                    body: scope.confirm,
                    btnLabel: scope.btnlabel
                };

                $modal.open({
                    templateUrl: 'app/components/utils/confirm.html',
                    controller: 'ConfirmCtrl as vm',
                    resolve: {
                        data: function () {
                            return data;
                        }
                    }
                }).result
                .then(scope.ngClick);
            });
        }
    }

})();
