<?php
/*
* Plugin Name: To One Page
* Description: Turn any site into a one page app.
*/

function to_one_page_scripts() {
  wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js');
  wp_enqueue_script('top-js', plugins_url() . "/to-one-page/to-one-page.js", array(), false, true);
  wp_enqueue_script('animate-js', plugins_url() . "/to-one-page/assets/animate.js", array(), false, true);
  wp_enqueue_style('main-css', plugins_url() . "/to-one-page/assets/main.css");
}
add_action('wp_enqueue_scripts', 'to_one_page_scripts');
?>
