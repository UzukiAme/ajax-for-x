<?php
/*
* Plugin Name: To One Page
* Description: Turn any site into a one page app.
*/

function to_one_page_scripts() {
  wp_enqueue_script('top-js', plugins_url() + "/to-one-page/to-one-page.js", array(), false, true);
}

add_action('wp_enqueue_scripts', 'to_one_page_scripts');

?>
