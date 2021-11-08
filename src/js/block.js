/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import slugify from 'slugify'
const savedAddresses = [
	{
    "first_name": "Nadir",
    "last_name": "Seghir",
    "company": "",
    "address_1": "60 29th Street #343",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94110",
    "country": "US",
    "phone": "+10656732940"
},
{
	"first_name": "Nadir",
	"last_name": "Seghir",
	"company": "",
	"address_1": "Place Hoche Bt. 10 Apprt 3",
	"address_2": "",
	"city": "Oran",
	"state": "DZ-31",
	"postcode": "31000",
	"country": "DZ",
	"phone": "+2130656732940"
},
{
	"first_name": "Nadir",
	"last_name": "Seghir",
	"company": "",
	"address_1": "Hasnaoui ilot 45, Bloc E, Apt 5",
	"address_2": "",
	"city": "Oran",
	"state": "DZ-31",
	"postcode": "31085",
	"country": "DZ",
	"phone": "0656732940"
}
];

const savedAddressesOptions = [...savedAddresses.map(address => ({value: slugify(address.postcode, {remove: /[*+~.()'"!:@#]/g, lower: true}), label: address.address_1})), {value: '', label: "New Address"}]

const Block = ( {  components, children } ) => {
	const [ selectedAddress, setAddress ] = useState( () => savedAddressesOptions[0].value );
	const { RadioControl, FormStep } = components
	const selectAddress = (value) => {
		setAddress(value)
	}

	return (
		<FormStep
			id="shipping-fields-saved"
			className="wc-block-checkout__shipping-fields"
			title={ 'Shipping address' }
			description={ 'Select an address or enter a new one.' }
			showStepNumber={ true }
		>
			<div className="wc-block-checkout__payment-method">
			<RadioControl
				id={ 'wc-payment-method-saved-addressess' }
				selected={ selectedAddress }
				onChange={ selectAddress }
				options={ savedAddressesOptions }
			/>
		</div>
		{!selectedAddress && children}
		</FormStep>

	);
};

export default Block;