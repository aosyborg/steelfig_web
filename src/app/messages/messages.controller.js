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
        vm.new = newMessage;
        vm.reply = replyMessage;
        vm.delete = deleteMessage;

        activate();

        function activate () {
            steelfig.message.fetch()
                .then(function (messages) {
                    vm.messages = messages;
                });
        }

        function newMessage (message) {
            $modal.open({
                templateUrl: 'app/messages/new-message.modal.html',
                controller: 'NewMessageModalCtrl as vm',
                resolve: {
                    message: function () {
                        return message || {};
                    }
                }
            }).result
            .then(function (message) {
                if (!message) {
                    return;
                }

                // TODO update messages
            });
        }

        function replyMessage (message) {
        }

        function deleteMessage (message) {
        }
    }
})();
