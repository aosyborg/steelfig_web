(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScheduleCtrl', ScheduleController);

    ScheduleController.$inject = ['steelfigService'];
    function ScheduleController (steelfig) {
        var vm = this,
            A_DAY = 86400000,
            calendarStart = new Date('December 12, 2015'),
            calendarEnd = new Date('December 28, 2015'),
            currentDay = new Date(calendarStart.getTime()),
            schedules = [];

        vm.days = [];
        vm.attendees = [];

        activate();
        vm.back = back;
        vm.forward = forward;
        vm.isAvailable = isAvailable;
        vm.modifyAvailability = modifyAvailability;

        function activate () {
            steelfig.schedule.fetch()
                .then(function (data) {
                    schedules = data;
                });

            steelfig.attendee.fetchAll()
                .then(function (attendees) {
                    vm.attendees = attendees;
                });

            vm.days = [
                new Date(calendarStart.getTime()),
                new Date(calendarStart.getTime() + A_DAY),
                new Date(calendarStart.getTime() + (A_DAY * 2)),
            ];
        }

        function back () {
            var day;

            for (var i=1; vm.days[0].getTime()>calendarStart.getTime() && i<=3; i++) {
                day = new Date(vm.days[0].getTime() - A_DAY);
                vm.days.unshift(day);
                vm.days.pop();
            }
        }

        function forward () {
            var day;

            for (var i=1; vm.days[2].getTime()<calendarEnd.getTime() && i<=3; i++) {
                day = new Date(vm.days[2].getTime() + A_DAY);
                vm.days.shift();
                vm.days.push(day);
            }
        }

        function isAvailable (attendee, day, hour) {
            var result = false;

            angular.forEach(schedules, function (schedule) {
                var date = schedule.available_at;

                if (schedule.attendee_id == attendee.attendeeId) {
                    if (date.getFullYear() == day.getFullYear() &&
                        date.getMonth() == day.getMonth() &&
                        date.getDate() == day.getDate() &&
                        date.getHours() == hour) {
                        result = true;
                    }
                }
            });

            return result;
        }

        function modifyAvailability (attendee, day, hour) {
            day.setHours(hour);
            steelfig.schedule.modify(day);

            // Remove the date if it exists
            var result = false;
            angular.forEach(schedules, function (schedule, i) {
                var date = schedule.available_at;

                if (schedule.attendee_id == attendee.attendeeId) {
                    if (date.getFullYear() == day.getFullYear() &&
                        date.getMonth() == day.getMonth() &&
                        date.getDate() == day.getDate() &&
                        date.getHours() == hour) {
                        schedules.splice(i, 1);
                        result = true;
                        return false;
                    }
                }
            });

            // Add the date if it doesn't
            if (!result) {
                schedules.push({
                    attendee_id: attendee.attendeeId,
                    available_at: new Date(day.getTime())
                });
            }

            return result;
        }
    }
})();
