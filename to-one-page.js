$(".content").append("<div class='to1pg-container'></div>");
//global variables
var globals = {
    baseUrl: window.location.protocol + "//" + window.location.hostname,
    currentPage: {
        pageClass: "to1pg-home",
        pageExists: true
    },
    container: $(".to1pg-container")
  };
container.css({
    marginRight: function() {
        return "-" + $(window).width() + 100 + "px";
    }
});


/**
* @description Gets the slug from a given url
* @param {string} url The url
* @returns {string} The slug
*/
function getSlug(url) {
    var slugPattern = /[/#]([^/?]*)\/?$/;
    return url.match(slugPattern)[1];
}

//Add ability to reverse JQuery collections.
jQuery.fn.reverse = [].reverse;

(function($) {
  //Static elements
  $(".content").addClass("currently-visible to1pg-home");

/**
* @description Makes an ajax request for new page content and inserts it into .to1pg-page-container.
* @param {string} url The url from the element that was clicked, which is used to construct the api endpoint url
*/
  function getContent(url) {
    //create the url to which the content request will be sent
    slug = getSlug(url);
    var endPoint = globals.baseUrl + '/wp-json/wp/v2/pages/?slug=' + slug;

    //perform the ajax request
    $.get(endPoint, function(page) {
      var contentClass = 'to1pg-' + slug,
        content = page[0].content.rendered;
      //on success, add the content to the page
      if($("." + contentClass).length === 0) {
        globals.currentPage.pageClass = contentClass;
        container.append("<div class='" + contentClass + " single-pg'></div>");
        //css hides new content automatically. Animation code toggles currently-visible class for animation in
        $("." + contentClass).css({
            left: function() {
                return $(window).width() + 100 + "px";
            }
        }).html(content);
      }
    })
    .fail(function() {
        globals.currentPage.pageExists = false;
    });
  }
  
  $(".to1pg-btn").click(function(event) {
    event.preventDefault();
    var url = event.target.attributes.href.value;
    getContent(url);
  });

})(jQuery);

