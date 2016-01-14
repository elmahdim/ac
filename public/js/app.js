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
(function() {
  'use strict';
  angular
    .module('ac.controllers')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$http'];

  function MainController($scope, $http) {

    $scope.table = {};
    $scope.field = {
     type  : "",
     value : ""
    };
    $scope.flag = null;
    $scope.editorEnabled = false;
    
    $scope.init = function() {
      $http.get("/api/rows")
        .success(function(data) {
          $scope.table = data;
        })
        .error(function() { /* error message */ });
    }
    $scope.init();
    
    $scope.addRow = function() {
     //if ($scope.field.$valid) {
       $http.post('/api/add', $scope.field)
           .success(function (data) {
               $scope.table = data;
               $scope.init();
           })
           .error(function() { /* error message */ });
          if ( $scope.field.type === "number") {
           var input = !isNaN($scope.field.value);
           if (!input) {
             $scope.flag = false;
           } else {
             $scope.flag = true;
           }
          }
          $scope.field = "";
       /* } else {
          $scope.flag = false;
        }*/
    };
    
    $scope.editRow = function (id) {
        $http.get('/api/edit/' +id).success(function(data) {
          $scope.field = data;
        });
    };

    $scope.updateRow = function (id) {
        $http.put('/api/update/' + $scope.field._id, $scope.field).success(function(data) {
          $scope.init();
        })
    };
    
    $scope.removeRow = function (id) {
        $http.delete('/api/remove/' + id).success(function(data) {
          var elem = document.getElementById(id);
              elem.parentNode.removeChild(elem);
        })
        .error(function() { /* error message */ });
    };
    
    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };
    
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };
  }
})();