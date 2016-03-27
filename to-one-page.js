(function($) {
  //Static elements
  $(".content").append("<div class='to1pg-pages-container'></div>").addClass("currently-visible to1pg-home");
  //set up position of container for incoming and out of rotation content
  $(".to1pg-pages-container").css({
    marginRight: function() {
      margin = $(window).height() + 100;
      return "-" + margin + "px";
    },
    width: function() {
      return $(window).width();
    }
  });

  //global variables
  var globals = {
    baseUrl: window.location.protocol + "//" + window.location.hostname + "/newdeco",
    pageContainer: $(".to1pg-pages-container")
  }


/**
* @description Makes an ajax request for new page content and inserts it into .to1pg-page-container.
*
* @param {string} url The url from the element that was clicked, which is used to construct the api endpoint url
*/
  function getContent(url) {
    //create the url to which the content request will be sent
    var slugPattern = /\/([^/]*)\/?$/,
      slug = url.match(slugPattern)[1],
      endPoint = globals.baseUrl + '/wp-json/wp/v2/pages/?slug=' + slug;

    //perform the ajax request
    $.get(endPoint, function(page) {
      var contentClass = 'to1pg-' + slug,
        content = page[0].content.rendered,
        container = globals.pageContainer;
      container.trigger("newpage", [contentClass]);
      //on success, add the content to the page
      if($("." + contentClass).length == 0) {
        $(".to1pg-pages-container").append("<div class='" + contentClass + " hidden'></div>");
        $("." + contentClass).html(content);
      }
    });
  }
  $(".to1pg-btn").click(function(event) {
    event.preventDefault();
    $(event.target).trigger("secondClick");
    var url = event.target.attributes.href.value;
    getContent(url);
  });

})(jQuery)
