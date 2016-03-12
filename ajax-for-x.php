<?php
/*
Plugin Name: Ajax For X
Description: Adds AJAX functionality and page animations to X theme via Angular, JQuery, and GSAP to create the feel of a one page application
Author: April Carter
Version: 1.0
License: GPL2
*/

add_action('wp_enqueue_scripts', 'afx_resources_js');
function afx_resources_js() {
	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js');
	wp_enqueue_script('angular', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js');
	wp_enqueue_script('angular-route', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route.min.js');
	wp_enqueue_script('angular-sanitize', 'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-sanitize.min.js');
	wp_enqueue_script('main', plugins_url('main.js', __FILE__), array(), false, true);
	wp_enqueue_script('ajax-for-x-js', plugins_url('ajax-for-x.js', __FILE__), array(), false, true);
}

add_action('x_before_site_begin', 'init_main_page_angular');
add_action('x_after_site_end', 'close_main_page_angular');
function init_main_page_angular() {
	echo "<div ng-app='toOnePageApp' class='top-level' controller='mainCtrl'>";
}
function close_main_page_angular() {
	echo "</div>";
}

add_action('the_content', insert_content);
function insert_content($content) {
	return $content;
}

?>
