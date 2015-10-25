(function () {
    'use strict';

    angular
        .module('app')
        .controller('MessagesCtrl', MessagesController);

    MessagesController.$inject = ['$modal', 'steelfigService'];
    function MessagesController ($modal, steelfig) {
        var vm = this;
        var attendees = [];
        vm.messages = [];
        vm.openMessage = false;

        vm.new = newMessage;
        vm.open = openMessage;
        vm.reply = replyMessage;

        activate();

        function activate () {
            steelfig.message.fetch()
                .then(function (messages) {
                    vm.messages = messages;
                });
        }

        function newMessage () {
            $modal.open({
                templateUrl: 'app/messages/new-message.modal.html',
                controller: 'NewMessageModalCtrl as vm'
            }).result
            .then(function (messages) {
                vm.messages = messages;
            });
        }

        function openMessage (message, markAsRead) {
            vm.openMessage = message;

            if (markAsRead) {
                steelfig.message.read(message);
            }
        }

        function replyMessage (message) {
            $modal.open({
                templateUrl: 'app/messages/reply-message.modal.html',
                controller: 'ReplyMessageModalCtrl as vm',
                resolve: {
                    orgMessage: function () {
                        return message || {};
                    }
                }
            }).result
            .then(function (messages) {
                vm.messages = messages;
            });
        }
    }
})();
