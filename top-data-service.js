var pageDataService = angular.module("pageDataService", []);

pageDataService.factory('pageData', ["$http", function($http) {
  return {
    getPage: function(baseUrl, pageId) {
      var pathToPages = "/wp-json/wp/v2/pages/";
      return $http.get(baseUrl + pathToPages + "?slug=" + pageId).then(function(response) {
          return response.data[0].content;
      });
    },
  }
}]);
