(function($) {
  var visibile = $(".currently-visible");
  
  /**
  * @description Animation sequence for reveal of new content
  */
  function pageIn() {
    var page = globals.currentPage.pageClass;
    var enter = new TimelineMax();
    enter.set($("." + page + " .to1pg-btn"), {x: $(window).width()});
    $("." + page).toggleClass("currently-visible");
    enter.from($("." + page), 1.3, {opacity: 0}, "start")
    .staggerTo($("." + page + " .to1pg-btn"), 0.7, {x: 0, ease: Back.easeOut.config(2.5)}, 0.3, "start")
    .from($(".pg-title"), 1, {yPercent: -300, ease: Bounce.easeOut});
  }
  
  /**
  * @description Remove the visibility class.
  */
  function removeVisibility() {
      $(".currently-visible").removeClass("currently-visible");
      $(".content").trigger("outfin");
  }
      
  /**
  * @description Animation sequence for content exit. On completion, the in animation is executed.
  */ 
  function pageOut() {
    var exit = new TimelineMax({onComplete:removeVisibility});
    exit.staggerTo($(".currently-visible .to1pg-btn").reverse(), 0.7, {y: $(window).height(), ease: Back.easeIn.config(1.2) }, 0.2, "start")
    .to($(".pg-title"), 0.7, {y: -$(window).height(), ease:Back.easeIn.config(1)}, "start")
    .to($(".x-section"), 1, {opacity:0, ease:Circ.easeOut}, "-=0.5")
    .set($(".currently-visible"), {x: $(window).width(), clearProps: "opacity"})
    .set([$(".pg-title"), $(".currently-visible .to1pg-btn")], {clearProps:"all"});
  }
  
  $(".to1pg-btn").click(function(event) {
    pageOut();
  });
  
  /**
  * @description Animate in an error page or message that is dynamically appended to the page depending on whether or not the request for the error page failed
  */
  function errorIn() {
        if($(".to1pg-error").length === 0) {
            $(".page").append("<div class='to1pg-inline-error single-pg'>We're having a hard time connecting. Try refreshing the page.</div>");
            var inlineError = new TimelineMax();
            inlineError.set($(".to1pg-inline-error"), {left: 0, top: 0, opacity: 0, scale:.8});
            $(".to1pg-inline-error").addClass("currently-visible");
            inlineError.to($(".to1pg-inline-error"), .5, {opacity: 1, scale: 1});
        } else {
            var error = new TimelineMax();
            error.set($(".to1pg-error"), {left: 0, top: 90, scale:.9, opacity: 0});
            $(".to1pg-error").addClass("currently-visible");
            error.to($(".error-title"), .3, {opacity: 1})
            .to($(".to1pg-error"), .5, {opacity: 1, scale: 1, ease: Back.easeOut.config(1.5)});
        }  
    }
  
  /**
  * @description Animate in the error page if it exists, or append an error message div to the body and animate that in
  */
  function pageOrError() {
      var exists = globals.currentPage.exists,
        done = globals.currentPage.done,
        pClass = globals.currentPage.pageClass,
        slug = globals.currentPage.reqSlug;
    
    if(exists && done && pClass == ("to1pg-" + slug)) {
        pageIn();
    } else if(!done) {
        $("body").on("ajaxComplete", function() {
            //stop and hide loading animation before 
            if(globals.currentPage.exists) {
                pageIn();    
            } else {
                errorIn();
            }
        }); 
    } else if(done && !exists) {
        errorIn();
    }
  }
  
  $("body").on("outfin", function(event) {
    pageOrError();
  });
})(jQuery);



/*Set the containers to absolute
  they must be relative to the browser window so their visible positions will be 0,0*/
