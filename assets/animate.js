(function($) {
  var buttons = $(".to-one-pg-btn");
  var visibile = $(".currently-visible");
  function animateOut(url) {
    var pageOut = new TimelineMax();
    pageOut.to();
  }
  buttons.click(function(event) {
    var url = event.target.attributes.href.value;
    animateOut(url);
  });
  $("body").on('newpage', function(event, data) {

  });

  /**
  * @description Toggle "currently-visible" class
  */
})(jQuery)
