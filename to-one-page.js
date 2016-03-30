//static elements
jQuery(".page").append("<div class='to1pg-container'></div>");

//global variables
var globals = {
    baseUrl: window.location.protocol + "//" + window.location.hostname,
    currentPage: {
        pageClass: "to1pg-home",
        exists: true,
        done: true,
        reqSlug: ""
    },
    container: jQuery(".to1pg-container")
  };
globals.container.css({
    marginRight: -(jQuery(window).width() + 100)
    });


/**
* @description Gets the slug from a given url
* @param {string} url The url
* @returns {string} The slug
*/
function getSlug(url) {
    var slugPattern = /[/#]([^/?]*)\/?$/;
    var slug = url.match(slugPattern)[1];
    globals.currentPage.reqSlug = slug;
    return slug;
}

//Add ability to reverse JQuery collections.
jQuery.fn.reverse = [].reverse;

(function($) {
  $(".content").addClass("currently-visible to1pg-home single-pg");
  
/**
* @description Makes an ajax request for new page content and inserts it into .to1pg-container. Update the globals object with the class of the page animate in
*     and ajax failure indicator (globals.currentPage.pageExists), if necesarry.
* @param {string} url The url from the element that was clicked, which is used to construct the api endpoint url
*/
  function getContent(url) {
    globals.currentPage.done = false;
    function setDone() {
        globals.currentPage.done = true;  
        $(".page").off('ajaxComplete', setDone);
    }
    //create the url to which the content request will be sent
    var slug = getSlug(url),
      endPoint = globals.baseUrl + '/wp-json/wp/v2/pages/?slug=' + slug, 
      contentClass = 'to1pg-' + slug;
      globals.currentPage.pageClass = contentClass;
      
    //perform ajax request if request hasn't already been made before
    if($("." + contentClass).length === 0) {
        var promise = $.get(endPoint, function(page) {
            if(page[0] === undefined) {
                slug = "error";
                endPoint = globals.baseUrl + "/wp-json/wp/v2/pages/?slug=" + slug;
                if($(".to1pg-error").length === 0) {
                    $.get(endPoint, function(ePage) {
                        if(ePage[0] === undefined) {
                            $(".content").trigger("errorFail");
                            globals.currentPage.exists = false;
                        } else {
                            var content = ePage[0].content.rendered;
                            $(".page").append("<div class='to1pg-error single-pg'>" + content + "</div>");
                            $(".to1pg-error").css("position", "absolute");
                            globals.currentPage.pageClass = "to1pg-error";
                        }
                    });
                }
                globals.currentPage.exists = false;
            } else {
                var content = page[0].content.rendered;
                //on success, add the content to the page
                globals.container.append("<div class='" + contentClass + " single-pg'></div>");
                //css hides new content automatically. Animation code toggles currently-visible class for animation in
                $("." + contentClass).css({
                    position: "absolute"
                }).html(content);
            }
        });
    } else {
        $(".content").trigger("newPage");
    }
    $(".page").on("ajaxComplete", setDone);
  }
  
  $(".to1pg-btn").click(function(event) {
    event.preventDefault();
    var url = event.target.attributes.href.value;
    getContent(url);
  });
})(jQuery);

