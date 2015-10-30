(function () {
    'use strict';

    angular
        .module('app')
        .controller('WishlistCtrl', WishlistController);

    WishlistController.$inject = ['$scope', '$modal', 'steelfigService'];
    function WishlistController ($scope, $modal, steelfig) {
        var vm = this;
        vm.items = [];
        vm.edit = editItem;
        vm.delete = deleteItem;
        vm.sortListeners = {
            update: function (event, ui) {
                var i = ui.item.sortable.index,
                    item = vm.items[i],
                    newPosition = ui.item.index();

                item.sort = newPosition;
                steelfig.wishlist.set(item);
            }
        };

        activate();

        function activate () {
            steelfig.wishlist.fetch()
                .then(function (items) {
                    vm.items = items;
                });
        }

        function editItem (item) {
            $modal.open({
                templateUrl: 'app/wishlist/edit-item.modal.html',
                controller: 'EditItemModalCtrl as vm',
                resolve: {
                    item: function () {
                        return item || {};
                    }
                }
            }).result
            .then(function (items) {
                if (!items) {
                    return;
                }

                vm.items = items;
            });
        }

        function deleteItem (item) {
            steelfig.wishlist.delete(item)
                .then(function () {
                    angular.forEach(vm.items, function (n, i) {
                        if (n.id == item.id) {
                            vm.items.splice(i, 1);
                        }
                    });
                });
        }
    }
})();
