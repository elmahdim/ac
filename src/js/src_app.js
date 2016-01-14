(function() {
    'use strict';
    angular.module('ac.controllers', []);
    angular.module('ac.routes', []);
    angular.module('ac.directives', []);
    angular.module('ac.services', []);

    var dependencies = [
        'ngRoute',
        'ngResource',
        'ac.controllers',
        'ac.directives',
        'ac.routes',
        'ac.services'
    ];
    angular.module('ac', dependencies);
})();