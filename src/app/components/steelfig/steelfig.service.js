(function () {
    'use strict';

    angular
        .module('steelfig')
        .provider('steelfigService', Steelfig);

    function Steelfig () {
        var provider = this;

        provider.$get = fetchService;

        fetchService.$inject = [
            'steelfigUserService',
            'steelfigScheduleService',
            'steelfigAttendeeService',
            'steelfigMessageService',
            'steelfigWishlistService'];
        function fetchService (user, schedule, attendee, message, wishlist) {
            return {
                user: user,
                schedule: schedule,
                attendee: attendee,
                message: message,
                wishlist: wishlist
            };
        }
    }
})();
