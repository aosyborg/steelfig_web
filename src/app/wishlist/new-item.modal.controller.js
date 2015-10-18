(function () {
    'use strict';

    angular
        .module('app')
        .controller('EditItemModalCtrl', EditItemModalCtrl);

    EditItemModalCtrl.$inject = ['$modalInstance', 'steelfigWishlistService', 'item'];
    function EditItemModalCtrl ($modalInstance, steelfigWishlistService, item) {
        var vm = this;
        vm.send = send;
        vm.cancel = cancel;
        vm.isLoading = false;
        vm.item = item;
        vm.errors = {
            name: false,
            price: false,
            url: false,
            comments: false
        };

        function send (item) {
            vm.errors.name = false;
            vm.errors.price = false;
            vm.errors.url = false;
            vm.errors.comments = false;
            vm.isLoading = true;

            steelfigWishlistService.addItem(vm.item)
                .then(function (items) {
                    vm.isLoading = false;
                    $modalInstance.close(items);

                }, function (response) {
                    vm.isLoading = false;
                    angular.forEach(response.data.validation, function(error) {
                        if (/name/i.test(error)) {
                            vm.errors.name = true;
                        }
                        if (/price/i.test(error)) {
                            vm.errors.price = true;
                        }
                        if (/url/i.test(error)) {
                            vm.errors.url = true;
                        }
                        if (/comments/i.test(error)) {
                            vm.errors.comments = true;
                        }
                    });

                });
        }

        function cancel () {
            $modalInstance.dismiss('cancel');
        }
    }

})();
