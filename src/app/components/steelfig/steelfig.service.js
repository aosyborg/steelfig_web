(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigService', Steelfig);

    function Steelfig () {
        var provider = this,
            apiUrl;

        provider.setApiUrl = setApiUrl;
        provider.$get = fetchService;

        function setApiUrl (url) {
            apiUrl = url;
        }

        fetchService.$inject = [
            'steelfigUserService',
            'steelfigAttendeeService',
            'steelfigMessageService',
            'steelfigWishlistService'];
        function fetchService (user, attendee, message, wishlist) {
            return {
                user: user,
                attendee: attendee,
                message: message,
                wishlist: wishlist
            };
        }
    }
})();
