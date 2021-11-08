<?php
/**
 * Plugin Name:     Address Selector
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     address-selector
 *
 * @package         create-block
 */

define ( 'AddressSelector_VERSION', '0.1.0' );

add_action('woocommerce_blocks_loaded', function() {
/**
 * Class for integrating with WooCommerce Blocks
 */
class AddressSelector_Blocks_Integration implements Automattic\WooCommerce\Blocks\Integrations\IntegrationInterface {

	/**
	 * The name of the integration.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'address-selector';
	}

	/**
	 * When called invokes any initialization/setup for the integration.
	 *
	 */
	public function initialize() {
		$script_path = '/build/index.js';
		$style_path  = '/build/style-index.css';

		$script_url = plugins_url( $script_path, __FILE__ );
		$style_url  = plugins_url( $style_path, __FILE__ );

		$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
		$script_asset      = file_exists( $script_asset_path )
			? require $script_asset_path
			: array(
				'dependencies' => array(),
				'version'      => $this->get_file_version( $script_path ),
			);

		wp_enqueue_style(
			'address-selector-blocks-integration',
			$style_url,
			[],
			$this->get_file_version( $style_path )
		);

		wp_register_script(
			'address-selector-blocks-integration',
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);
		wp_set_script_translations(
			'address-selector-blocks-integration',
			'address-selector',
			'address-selector',
			dirname( __FILE__ ) . '/languages'
		);
	}

	/**
	 * Returns an array of script handles to enqueue in the frontend context.
	 *
	 * @return string[]
	 */
	public function get_script_handles() {
		return array( 'address-selector-blocks-integration' );
	}

	/**
	 * Returns an array of script handles to enqueue in the editor context.
	 *
	 * @return string[]
	 */
	public function get_editor_script_handles() {
		return array( 'address-selector-blocks-integration' );
	}

	/**
	 * An array of key, value pairs of data made available to the block on the client side.
	 *
	 * @return array
	 */
	public function get_script_data() {
		$data = array(
			'address-selector-active' => true,
			'example-data' => 'This is some example data from the server',
		);

		return $data;

	}

	/**
	 * Get the file modified time as a cache buster if we're in dev mode.
	 *
	 * @param string $file Local path to the file.
	 * @return string The cache buster value to use for the given file.
	 */
	protected function get_file_version( $file ) {
		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG && file_exists( $file ) ) {
			return filemtime( $file );
		}
		return AddressSelector_VERSION;
	}
}

	add_action(
		'woocommerce_blocks_cart_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new AddressSelector_Blocks_Integration() );
		}
	);
	add_action(
		'woocommerce_blocks_checkout_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new AddressSelector_Blocks_Integration() );
		}
	);
});
