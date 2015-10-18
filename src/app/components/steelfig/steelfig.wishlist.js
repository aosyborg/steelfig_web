(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigWishlistService', SteelfigWishlist);

    function SteelfigWishlist () {
        var provider = this,
            apiUrl = 'http://api.steelfig.com:8000/v1';

        provider.$get = fetchService;

        fetchService.$inject = ['$http'];
        function fetchService ($http) {
            return {
                fetch: fetch,
                addItem: addItem,
                delete: deleteItem
            };

            function fetch () {
                return $http.get(apiUrl + '/wishlist')
                    .then(function (response) {
                        return response.data.wishlist;
                    });
            }

            function addItem (item) {
                item = item || {};
                item.eventId = getEventId();
                return $http.post(apiUrl + '/wishlist/item', item)
                    .then(function (response) {
                        return response.data.wishlist;
                    });
            }

            function deleteItem (item) {
                return $http.delete(apiUrl + '/wishlist/item/' + item.id)
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
