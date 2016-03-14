var app = angular.module("toOnePageApp", []);

app.controller('mainCtrl', ["$scope", "$http", function($scope, $http) {
  var promise;
  $scope.request = function() {
    promise = $http.get("http://localhost/newdeco/ajax-toy").then(function(response) {
      return response.data;
    });
    return promise;
  }
}]);

app.directive('requestClick', function() {
  return {
    restrict: 'A',
    scope: {
      click: '&'
    },
    link: function(scope, element, attributes) {

    }
  }
});


//User clicks
//dirctive fires mainCtrl.request
  //Uses jQuery to get href from DOM
//jQuery filters content and passes it to another directive
//Directive is updated with the data
  //can I tell it to hide until a specific ajax request completes?
