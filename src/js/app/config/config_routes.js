(function() {
    'use strict';

    angular
        .module('ac.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];
    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : "partials/partial_main",
                controller  : 'MainController',
                controllerAs: 'main'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
})();