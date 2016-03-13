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
