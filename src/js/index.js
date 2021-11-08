/**
 * External dependencies
 */
import { registerCheckoutBlock } from '@woocommerce/blocks-checkout';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {Save, Edit} from './edit'
import metadata from './block.json';
import FrontendBlock from './block';

import './style.scss';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
} );

registerCheckoutBlock( {
	metadata,
	component: FrontendBlock
})