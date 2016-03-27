(function($) {
  //Static elements
  $(".content").append("<div class='top-pages-container'></div>");
  $(".top-pages-container").css({
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
    pageContainer: $(".top-pages-container")
  }


/**
* @description Makes an ajax request for new page content and inserts it into .top-page-container.
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
      var contentClass = 'top-' + slug,
        content = page[0].content.rendered,
        container = globals.pageContainer;
      container.trigger("newpage", [contentClass]);
      //on success, add the content to the page
      if($("." + contentClass).length == 0) {
        $(".top-pages-container").append("<div class='" + contentClass + "'></div>");
        $("." + contentClass).css({
          display: "none"
        })
        .html(content);
      }
    });
  }
  $(".to-one-pg-btn").click(function(event) {
    event.preventDefault();
    var url = event.target.attributes.href.value;
    getContent(url);
  });

})(jQuery)
