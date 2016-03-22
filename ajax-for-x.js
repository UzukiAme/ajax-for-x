var app = angular.module("toOnePageApp", ["pageDataService"]);

app.controller('mainCtrl', ["$scope", "$http", "pageData", function($scope, $http, pageData) {
  $scope.baseUrl = window.location.protocol + "//" + window.location.host + "/newdeco";
  $scope.pageData;
  $scope.getContent = function(eventObj) {
    var href = eventObj.target.attributes.href.value,
      regex = /\/([^/]*)$/,
      pageId = href.match(regex)[1];

    pageData.getPage($scope.baseUrl, pageId).then(function(content) {
      $scope.$broadcast("newdata", content);
    });
  };
}]);

app.directive('displayPage', [function() {
  return {
    restrict: 'E',
    scope: {
      pageName: "@pageName"
    },
    link: function(scope, elem, attrs) {
    }
  }
}]);

app.directive('dynamicContainer', [function() {
  return {
    restrict: "E",
    require: displayPage,
    link: function(scope, elem, attrs) {
      scope.$on('newdata', function(content) {
        elem.append(displayPage);
      });
    }
  }
}]);


//User clicks
//dirctive fires mainCtrl.request
  //Uses jQuery to get href from DOM
//jQuery filters content and passes it to another directive
//Directive is updated with the data
  //can I tell it to hide until a specific ajax request completes?
