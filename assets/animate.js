(function($) {
  $.fn.reverse = [].reverse;

  var visibile = $(".currently-visible");
  var jBtns = $("to1pg-btn");
  var btnsObj = document.getElementsByClassName("to1pg-btn");

  function animateOut(url) {
    var pageOut = new TimelineMax();
    pageOut.staggerTo($(".to1pg-btn").reverse(), 1.3, {y: $(window).height(), ease: Back.easeIn.config(1.2) }, 0.2)
    .to();
  }
  $(".to1pg-btn").click(function(event) {
    var url = event.target.attributes.href.value;
    animateOut(url);
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
})(jQuery)

/*Set the containers to absolute
  they must be relative to the browser window so their visible positions will be 0,0
