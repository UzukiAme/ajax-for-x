(function($) {
  var html;
  //This will contain routing logic which uses regex to avoid dozens of explicit definitions
  //will eventually be in a function
  //Custom events and "stopPropigation()" will likely be used to target specific page requests.
  $(".x-btn").click(function() {
    html = $.get("ajax-toy");
  });

  //success split off in anticipation of differing formatting and success needs depending on page requested.
  function format_response(ajaxResponse) {
    return $(ajaxResponse.responseText).find(".content").wrapInner("<div class='hidden'>").html();
  }
  //insertion logic must take into account the possibility of a menu click vs a btn click
  $(document).on("ajaxSuccess", function() {
    html = format_response(html);
    console.log(html);
  });
})(jQuery)

/* Use this structure to get html data and pass it to directive def which utilizes
jquery to format the html? Currently, data acquisition and DOM manipulation will be mixed, which
will likely end up getting messy.
app.factory('myService', function($http) {
  var promise;
  var myService = {
    async: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('test.json').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
      }
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

app.controller('MainCtrl', function( myService,$scope) {
  $scope.clearData = function() {
    $scope.data = {};
  };
  $scope.getData = function() {
    // Call the async method and then do stuff with what is returned inside our own then function
    myService.async().then(function(d) {
      $scope.data = d;
    });
  };
});
*/
