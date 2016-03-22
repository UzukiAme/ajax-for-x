<?php
/*
Plugin Name: Ajax For X
Plugin Description: Give existing WP content the feel of a one page application
*/

add_action('wp_enqueue_scripts', 'ajax_for_x_scripts');

function ajax_for_x_scripts() {
  wp_enqueue_script('angular','https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js');
  wp_enqueue_script('angular-route', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.js');
  wp_enqueue_script('main-js', plugins_url() . "/ajax-for-x/main.js", array(), false, true);
  wp_enqueue_style('main-css', plugins_url() . "/ajax-for-x/assets/main.css");
  wp_enqueue_script('top-data-service', plugins_url() . "/ajax-for-x/top-data-service.js");
  wp_enqueue_script('angular-main-ctrl', plugins_url() . '/ajax-for-x/ajax-for-x.js');
}

add_action('x_before_site_begin', 'angular_app');
add_action('x_after_site_end', 'angular_app_close');

function angular_app() {
  echo "<div ng-controller='mainCtrl' class='to-one-page'>";
}
function angular_app_close() {
  echo "</div>";
}

?>
