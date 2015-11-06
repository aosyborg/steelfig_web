(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigWishlistService', SteelfigWishlist);

    function SteelfigWishlist () {
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
                fetch: fetchItems,
                set: setItem,
                delete: deleteItem,
                markPurchased: markPurchased
            };

            function fetchItems (attendeeId) {
                attendeeId = attendeeId ? '/' + attendeeId : '';
                return $http.get(apiUrl + '/wishlist' + attendeeId)
                    .then(function (response) {
                        return response.data.wishlist;
                    });
            }

            function setItem (item) {
                item = item || {};
                item.eventId = getEventId();
                if (angular.isString(item.price)) {
                    item.price = item.price.replace(/\$/, '');
                }

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

            function markPurchased (item) {
                item.isPurchased = 1;
                return $http.patch(apiUrl + '/wishlist/purchase/item/' + item.id)
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
