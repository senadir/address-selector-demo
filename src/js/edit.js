/**
* External dependencies
*/
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


const template = [
	[ 'woocommerce/checkout-shipping-address-block', {title: '',
	description: '',
	showStepNumber: false,
}, [] ],
];

const allowedBlocks = ['woocommerce/checkout-shipping-address-block']
export const Edit = () => {
 return (
	 <>
		 Address Selector
		 <InnerBlocks
		 		template={template}
				allowedBlocks={ allowedBlocks }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
	 </>
 );
};

export const Save = () => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};