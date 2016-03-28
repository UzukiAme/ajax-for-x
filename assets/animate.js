(function($) {
  var visibile = $(".currently-visible");
  
  /**
  * @description Remove visibility class
  */
  function makeInvisible() {
      $(".currently-visible.content").toggleClass("currently-visible");
  }
    
  function animateOut(url) {
    var pageOut = new TimelineMax({onComplete:makeInvisible});
    pageOut.staggerTo($(".currently-visible .to1pg-btn").reverse(), 0.7, {y: $(window).height(), ease: Back.easeIn.config(1.2) }, 0.2, "start")
    .to($(".pg-title"), 0.7, {y: -$(window).height(), ease:Back.easeIn.config(1.2)}, "start")
    .to($(".x-section"), 1, {opacity:0, ease:Circ.easeOut}, "-=0.5")
    .set($(".currently-visible"), {y: $(window).height(), x: $(window).width()})
    .set([$(".pg-title"), $(".currently-visible .to1pg-btn"), $(".x-section")], {clearProps:"all"});
  }
  $(".to1pg-btn").click(function(event) {
    var url = event.target.attributes.href.value;
    animateOut();
  });
  // /**
  // * @description Toggle "currently-visible" class
  // */
  // function visibility(removeFrom, addTo) {
  //   $(removeFrom, addTo).toggleClass();
  // }
  // $("body").on('outFin', function(event, targets) {
  //   visibility(targets.from, targets.to);
  // });
})(jQuery);



/*Set the containers to absolute
  they must be relative to the browser window so their visible positions will be 0,0*/
