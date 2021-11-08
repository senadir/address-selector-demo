/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import slugify from 'slugify';
const savedAddresses = [
	{
		first_name: 'Nadir',
		last_name: 'Seghir',
		company: '',
		address_1: '60 29th Street #343',
		address_2: '',
		city: 'San Francisco',
		state: 'CA',
		postcode: '94110',
		country: 'US',
		phone: '+10656732940',
	},
	{
		first_name: 'Nadir',
		last_name: 'Seghir',
		company: '',
		address_1: 'Place Hoche Bt. 10 Apprt 3',
		address_2: '',
		city: 'Oran',
		state: 'DZ-31',
		postcode: '31000',
		country: 'DZ',
		phone: '+2130656732940',
	},
	{
		first_name: 'Nadir',
		last_name: 'Seghir',
		company: '',
		address_1: 'Hasnaoui ilot 45, Bloc E, Apt 5',
		address_2: '',
		city: 'Oran',
		state: 'DZ-31',
		postcode: '31085',
		country: 'DZ',
		phone: '0656732940',
	},
];

const savedAddressesOptions = [
	...savedAddresses.map( ( address ) => ( {
		value: slugify( address.postcode, {
			remove: /[*+~.()'"!:@#]/g,
			lower: true,
		} ),
		label: address.address_1,
	} ) ),
	{ value: '', label: 'New Address' },
];

const Block = ( { children } ) => {
	const [ selectedAddress, setAddress ] = useState(
		() => savedAddressesOptions[ 0 ].value
	);
	const selectAddress = ( value ) => {
		setAddress( value );
	};

	return (
		<fieldset
			className={
				'wc-block-checkout__shipping-fields wc-block-components-checkout-step wc-block-components-checkout-step--with-step-number'
			}
			id="shipping-fields-saved"
		>
			<h2>Shipping address</h2>
			<div className="wc-block-components-checkout-step__container">
				<p className="wc-block-components-checkout-step__description">
					Select an address or enter a new one.
				</p>

				<div className="wc-block-components-checkout-step__content">
					<div className="wc-block-checkout__payment-method">
						<RadioControl
							id={ 'wc-payment-method-saved-addressess' }
							selected={ selectedAddress }
							onChange={ selectAddress }
							options={ savedAddressesOptions }
						/>
					</div>
					{ ! selectedAddress && children }
				</div>
			</div>
		</fieldset>
	);
};

export default Block;
