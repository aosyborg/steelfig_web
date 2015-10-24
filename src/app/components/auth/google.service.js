(function () {
    'use strict';

    angular
        .module('steelfig.auth')
        .provider('googleOAuth', GoogleOAuth);

    function GoogleOAuth () {
        var provider = this,
            apiKey = 'AIzaSyBUlX2mOJn4AITfEd93_FHoet30KPvsqCk',
            callback;

        provider.$get = fetchService;

        fetchService.$inject = ['$http', 'steelfigService'];
        function fetchService ($http, steelfig) {
            return {
                requestAuth: requestAuth
            };

            function requestAuth (callback) {
                var options = {
                    scope: 'email profile',
                    client_id: '351176360892-f92klr20iki3af3u8gl4v49t3t42eh6s.apps.googleusercontent.com'
                };

                provider.callback = callback;
                gapi.client.setApiKey(apiKey);
                gapi.auth.authorize(options, handleAuthResult);
            }

            function handleAuthResult(authResult) {
                if (!authResult || authResult.error) {
                    console.log('Error: ' + authResult.error);
                    return;
                }

                steelfig.user.signin(authResult.access_token, provider.callback);
            }
        }
    }
})();
