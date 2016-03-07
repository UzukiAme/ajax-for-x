<?php
/*
Plugin Name: Ajax For X
Description: Adds AJAX functionality and page animations to X theme via Angular, JQuery, and GSAP to create the feel of a one page application
Author: April Carter
Version: 1.0
License: GPL2
*/

function init_main_page_angular() {
	$content = "<div ng-app='to-one-page-app'></div>" . the_content() . "</div>";
	return $content;
}

add_filter('the_content', init_main_page_angular);
?>