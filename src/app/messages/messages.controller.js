(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessagesCtrl', MessagesController);

    MessagesController.$inject = ['$scope'];
    function MessagesController ($scope) {
        activate();

        function activate () {
        }
    }
})();
