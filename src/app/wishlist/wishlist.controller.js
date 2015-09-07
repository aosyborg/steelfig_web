(function () {
    'use strict';

    angular
        .module('app')
        .controller('WishlistCtrl', WishlistController);

    WishlistController.$inject = ['$scope'];
    function WishlistController ($scope) {
        activate();

        function activate () {
        }
    }
})();
