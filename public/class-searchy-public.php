<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       www.tooltipy.com
 * @since      1.0.0
 *
 * @package    Searchy
 * @subpackage Searchy/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Searchy
 * @subpackage Searchy/public
 * @author     Jamel Eddine Zarga <jamel.zarga@gmail.com>
 */
class Searchy_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		// Shortcode
		add_shortcode( 'searchy', array( $this, 'shortcode') );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Searchy_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Searchy_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, SEARCHY_PLUGIN_URL . 'public/css/searchy-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Searchy_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Searchy_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, SEARCHY_PLUGIN_URL . 'public/js/searchy-public.js', array( 'jquery' ), $this->version, false );
		
		// Pass Ajax Url to the searchy public script 'ajaxurl'
		wp_localize_script( $this->plugin_name, 'ajaxurl', admin_url( 'admin-ajax.php' ) );

	}

	/**
	 * Creates the short code in which goes the search template.
	 *
	 * @since    1.0.0
	 * @param    array    $atts       the shortcode attributes
	 */
	public function shortcode( $atts ){

        ob_start();
        
        require SEARCHY_BASE_DIR . '/public/partials/searchy-tpl.php';

        return ob_get_clean();  

	}

	/**
	 * The main function which serves the ajax calls for the serch
	 *
	 * @since    1.0.0
	 */
	public function searchy_search_ajx_call() {

		$param_text = $_POST['query_text'];

		global $wpdb;
		$results = $wpdb->get_results( "SELECT * FROM $wpdb->posts
										WHERE
											post_content LIKE '%$param_text%'
											AND
											post_status = 'publish'"
										, OBJECT );
		$nbr_posts = count($results);

		switch ($nbr_posts) {
			case 0:
				?>
				<div class="count">Sorry no results found.</div>
				<?php
				break;
			case 1:
				?>
				<div class="count">only <b><?php echo $nbr_posts; ?></b> result found.</div>
				<?php
				break;
			
			default:
				?>
				<div class="count"><b><?php echo $nbr_posts; ?></b> results found.</div>
				<?php
				break;
		}
		?>
		<ul>
			<?php
			foreach ($results as $key => $result) {

				echo("<pre>"); print_r($result); echo("</pre>");
			?>
				<div class="result">
					<h2 class="title"><?php echo $result->post_title; ?></h2>
					<div class="content"><?php echo $result->post_content; ?></div>
					<div class="type"><strong><?php echo $result->post_type; ?></strong></div>
				</div>
			<?php	
			}
			?>
		</ul>
		<?php

		die();
	}

}
