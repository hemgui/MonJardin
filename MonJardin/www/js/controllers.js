angular.module('monjardin.controllers', ['ionic'])

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    }])
    .controller('SearchCtrl', ['$scope', function($scope) {

    }])
    .controller('AllCtrl', ['$rootScope', '$scope', '$http', '$ionicScrollDelegate', 'filterFilter', function($rootScope, $scope, $http, $ionicScrollDelegate, filterFilter) {

        var plantsListRef = new Firebase($rootScope.baseUrl + "plants");
        plantsListRef.on('value', function(snapshot) {
            $scope.jsonPlants = snapshot.val();
            var letters = $scope.letters = [];
            var plants = $scope.plants = [];
            var currentCharCode = 'A'.charCodeAt(0) - 1;

            //window.CONTACTS is defined below
            $scope.jsonPlants
                .sort(function(a, b) {
                    return a.fullname > b.fullname ? 1 : -1;
                })
                .forEach(function(plant) {
                    //Get the first letter of the last name, and if the last name changes
                    //put the letter in the array
                    var plantCharCode = plant.fullname.toUpperCase().charCodeAt(0);
                    //We may jump two letters, be sure to put both in
                    //(eg if we jump from Adam Bradley to Bob Doe, add both C and D)
                    var difference = plantCharCode - currentCharCode;
                    for (var i = 1; i <= difference; i++) {
                        addLetter(currentCharCode + i);
                    }
                    currentCharCode = plantCharCode;
                    plants.push(plant);
                });
            //If names ended before Z, add everything up to Z
            for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
                addLetter(i);
            }

            function addLetter(code) {
                var letter = String.fromCharCode(code);
                plants.push({
                    isLetter: true,
                    letter: letter
                });
                letters.push(letter);
            }

            //Letters are shorter, everything else is 52 pixels
            $scope.getItemHeight = function(item) {
                return item.isLetter ? 40 : 100;
            };
            $scope.getItemWidth = function(item) {
                return '100%';
            };

            $scope.scrollBottom = function() {
                $ionicScrollDelegate.scrollBottom(true);
            };

            var letterHasMatch = {};
            $scope.getPlants = function() {
                letterHasMatch = {};
                //Filter contacts by $scope.search.
                //Additionally, filter letters so that they only show if there
                //is one or more matching contact
                return $scope.plants.filter(function(item) {
                    var itemDoesMatch = !$scope.search || item.isLetter ||
                        item.fullname.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                    //Mark this person's last name letter as 'has a match'
                    if (!item.isLetter && itemDoesMatch) {
                        var letter = item.fullname.charAt(0).toUpperCase();
                        letterHasMatch[letter] = true;
                    }

                    return itemDoesMatch;
                }).filter(function(item) {
                    //Finally, re-filter all of the letters and take out ones that don't
                    //have a match
                    if (item.isLetter && !letterHasMatch[item.letter]) {
                        return false;
                    }
                    return true;
                });
            };

            $scope.clearSearch = function() {
                $scope.search = '';
            };
        });
    }])
    .controller('MyGardenCtrl', ['$scope', function($scope) {

    }])
    .controller('DetailCtrl', ['$scope', '$rootScope', '$stateParams', function($scope, $rootScope, $stateParams) {
        var plantListRef = new Firebase($rootScope.baseUrl + $stateParams.plantId);
        plantListRef.on('value', function(snapshot) {
            $scope.plant = snapshot.val();
            $scope.json = JSON.stringify($scope.plant);
        });
    }]);
