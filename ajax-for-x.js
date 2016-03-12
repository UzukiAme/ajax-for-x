var baseUrl = "/localhost/newdeco";//window.location.protocol + "//" + window.location.host;

var app = angular.module('toOnePageApp', ['ngRoute', 'ngSanitize']);

app.controller('mainCtrl', ["$scope", function($scope) {}]);

app.controller('homeCtrl', [function($scope) {
  $scope.homeContent;
  $http({
    method: "GET",
    url: '?',
    headers: ['Content-Type: text/html']
  }).then(function(response) {
    $scope.homeContent = $sce.trustAsHtml(response.data);
  });
}]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when(baseUrl, {
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  });
}]);
