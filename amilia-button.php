<?php
/*
Plugin Name: Amilia Button
Plugin URI: http://www.amilia.com/
Description: Add an Amilia button to a WordPress page or blog post.
Author: Martin Drapeeau <martin.drapeau@amilia.com>
Copyright: 2014 Amilia
Version: 0.1
Author URI: http://www.amilia.com/
License: Apache License 2.0
License URI: http://www.apache.org/licenses/LICENSE-2.0.html
*/

function amilia_add_mce_button() {
    if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) return;
    if (get_user_option('rich_editing') == 'true') {
        add_filter('mce_external_plugins', 'amilia_add_tinymce_plugin');
        add_filter('mce_buttons', 'amilia_register_mce_button');
    }
}
add_action('admin_head', 'amilia_add_mce_button');

function amilia_add_tinymce_plugin($plugin_array) {
    $plugin_array['amilia_button'] = plugins_url('amilia-button') . '/amilia-button.js';
    return $plugin_array;
}

function amilia_register_mce_button($buttons) {
    array_push($buttons, 'amilia_button');
    return $buttons;
}

?>