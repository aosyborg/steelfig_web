(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuddyWishlistCtrl', BuddyWishlistController);

    BuddyWishlistController.$inject = ['$stateParams', '$modal', 'steelfigService'];
    function BuddyWishlistController ($stateParams, $modal, steelfig) {
        var vm = this;
        vm.items = [];
        vm.buddy = {};
        vm.markPurchased = markPurchased;

        activate();

        function activate () {
            var attendeeId = $stateParams.attendeeId;
            steelfig.attendee.fetch(attendeeId)
                .then(function (buddyAccount) {
                    vm.buddy = buddyAccount;
                });

            steelfig.wishlist.fetch(attendeeId)
                .then(function (items) {
                    vm.items = items;
                });
        }

        function markPurchased (item) {
            //item.isPurchased = 1;
            steelfig.wishlist.updateItem(item);
        }
    }
})();
