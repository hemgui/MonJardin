// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'monjardin.controllers', 'firebase'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });


    $rootScope.baseUrl = 'https://hemgui-yawl.firebaseio.com/';
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.search', {
            url: "/search",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html",
                    controller: "SearchCtrl"
                }
            }
        })
        .state('app.all', {
            url: "/all",
            views: {
                'menuContent': {
                    templateUrl: "templates/all.html",
                    controller: "AllCtrl"
                }
            }
        })
        .state('app.mygarden', {
            url: "/mygarden",
            views: {
                'menuContent': {
                    templateUrl: 'templates/mygarden.html',
                    controller: 'MyGardenCtrl'
                }
            }
        })
        .state('app.detail', {
            url: "/detail/:plantId",
            views: {
                'menuContent': {
                    templateUrl: "templates/detail.html",
                    controller: 'DetailCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/all');
})
.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode
){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
