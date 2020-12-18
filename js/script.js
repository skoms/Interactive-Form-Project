const form = document.querySelector( 'form' );
const nameField = document.getElementById( 'name' );
const emailField = document.getElementById( 'email' );
const jobRoles = document.getElementById( 'title' );
const otherJobRoleField = document.getElementById( 'other-job-role' );
const designsSelect = document.getElementById( 'design' );
const colorsDiv = document.getElementById( 'shirt-colors' );
const colorsSelect = document.getElementById( 'color' );
const jsPunsColors = document.querySelectorAll( "[data-theme='js puns']" );
const heartJsColors = document.querySelectorAll( "[data-theme='heart js']" );
const activityFieldset = document.getElementById( 'activities' );
const activitiesBox = document.getElementById( 'activities-box' );
const checkboxes = [ ...document.querySelectorAll( "[type='checkbox']" ) ];
const paymentsSelect = document.getElementById( 'payment' );
const creditCardDiv = document.getElementById( 'credit-card' );
const creditCardBox = document.querySelector( '.credit-card-box' );
const expMonthSelect = document.getElementById( 'exp-month' );
const expYearSelect = document.getElementById( 'exp-year' );
const cardNumberField = document.getElementById( 'cc-num' );
const zipField = document.getElementById( 'zip' );
const cvvField = document.getElementById( 'cvv' );
const paypalDiv = document.getElementById( 'paypal' );
const bitcoinDiv = document.getElementById( 'bitcoin' );
let totalCostDisplay = document.getElementById( 'activities-cost' );
let totalCost = 0;

/** Initializes the page on load/reload */
const initializePage = () => {
	nameField.focus();
	otherJobRoleField.style.display = 'none';
	colorsDiv.style.display = 'none';
	paymentsSelect[ 1 ].selected = true;
	creditCardDiv.style.display = 'block';
	paypalDiv.style.display = 'none';
	bitcoinDiv.style.display = 'none';
}
/**
 * Changes payment method block displayed
 * @param {string} value - the value of the selected option
 */
const changePayment = value => {
	const method = value;
	switch ( method ) {
		case 'credit-card':
			paypalDiv.style.display = 'none';
			bitcoinDiv.style.display = 'none';
			creditCardDiv.style.display = 'block';
			break;
		case 'paypal':
			paypalDiv.style.display = 'block';
			bitcoinDiv.style.display = 'none';
			creditCardDiv.style.display = 'none';
			break;
		case 'bitcoin':
			paypalDiv.style.display = 'none';
			bitcoinDiv.style.display = 'block';
			creditCardDiv.style.display = 'none';
			break;
	}
}
/** Validates the name field 
 * @returns {boolean}
*/
const nameIsValidated = () => {
	const isValid = /^\w+ ?(\w+)? ?(\w+)? ?(\w+)?$/.test( nameField.value );
	return isValid;
}
/** 
 * Checks email field for specific errors and changes error-messages accordingly
 * @returns {boolean} valid or not
 */
const emailIsValidated = () => {
	let isValid = /^$/.test( emailField.value );
	if ( isValid ) {
		emailField.parentElement.lastElementChild.innerHTML =
			`
        Please enter an email adress
        `;
		return false;
	} else {
		emailField.parentElement.lastElementChild.innerHTML =
			`
        Email address must be formatted correctly
        `;
	}
	isValid = /^[^@]{1,16}[^@][a-z]+\.[a-z]+$/.test( emailField.value );
	if ( isValid ) {
		emailField.parentElement.lastElementChild.innerHTML =
			`
        You seem to have forgotten '@'
        `;
		return false;
	} else {
		emailField.parentElement.lastElementChild.innerHTML =
			`
        Email address must be formatted correctly
        `;
	}
	isValid = /^[^@]{1,16}@[a-z]+\.[a-z]+$/.test( emailField.value );
	return isValid;
}
/** Checks if an activity is checked
 * @returns {boolean}
 */
const activitiesIsValidated = () => {
	const isValid = totalCost > 0;
	!isValid && console.log( `Please select at least one activity.` );
	return isValid;
}
/** Checks card number field for specific errors and changes error-messages accordingly
 * @returns {boolean} valid or not
*/
const cardNumberIsValidated = () => {
	let isValid = /^$/.test( cardNumberField.value );
	if ( isValid ) {
		cardNumberField.parentElement.lastElementChild.innerHTML =
			`
        Please enter a card number
        `;
		return false;
	} else {
		cardNumberField.parentElement.lastElementChild.innerHTML =
			`
        Credit card number must be between 13 - 16 digits
        `;
	}
	isValid = /\D+/.test( cardNumberField.value );
	if ( isValid ) {
		cardNumberField.parentElement.lastElementChild.innerHTML =
			`
        Card number can only contain numbers
        `;
		return false;
	} else {
		cardNumberField.parentElement.lastElementChild.innerHTML =
			`
        Credit card number must be between 13 - 16 digits
        `;
	}
	isValid = /^\d{13,16}$/.test( cardNumberField.value );
	return isValid;
}
/** Checks zip code field for specific errors and changes error-messages accordingly
 * @returns {boolean} valid or not
*/
const zipCodeIsValidated = () => {
	let isValid = /^$/.test( zipField.value );
	if ( isValid ) {
		zipField.parentElement.lastElementChild.innerHTML =
			`
        Please enter a Zip Code
        `;
		return false;
	} else {
		zipField.parentElement.lastElementChild.innerHTML =
			`
        Zip Code must be 5 digits
        `;
	}
	isValid = /\D+/.test( zipField.value );
	if ( isValid ) {
		zipField.parentElement.lastElementChild.innerHTML =
			`
        A Zip Code can only contain numbers
        `;
		return false;
	} else {
		zipField.parentElement.lastElementChild.innerHTML =
			`
        Zip Code must be 5 digits
        `;
	}
	isValid = /^\d{5}$/.test( zipField.value );
	return isValid;
}
/** Checks CVV field for specific errors and changes error-messages accordingly
 * @returns {boolean} valid or not
*/
const cvvIsValidated = () => {
	let isValid = /^$/.test( cvvField.value );
	if ( isValid ) {
		cvvField.parentElement.lastElementChild.innerHTML =
			`
        Please enter CVV
        `;
		return false;
	} else {
		cvvField.parentElement.lastElementChild.innerHTML =
			`
        CVV must be 3 digits
        `;
	}
	isValid = /\D+/.test( cvvField.value );
	if ( isValid ) {
		cvvField.parentElement.lastElementChild.innerHTML =
			`
        A CVV can only contain numbers
        `;
		return false;
	} else {
		cvvField.parentElement.lastElementChild.innerHTML =
			`
        CVV must be 3 digits
        `;
	}
	isValid = /^\d{3}$/.test( cvvField.value );
	return isValid;
}
/**
 * Adds error messages/hints as well as highlighting said part
 * @param {input field} element user input field
 * @param {boolean} bool true or none, if you want to add error messages and highlight, false if no
 */
const addErrorsAndHints = ( element, bool = true ) => {
	if ( bool ) {
		element.parentElement.classList.add( 'not-valid' );
		element.parentElement.classList.remove( 'valid' );
		element.parentElement.lastElementChild.style.display = 'block';
	} else {
		element.parentElement.classList.add( 'valid' );
		element.parentElement.classList.remove( 'not-valid' );
		element.parentElement.lastElementChild.style.display = 'none';
	}
}
/** Listener that shows the textfield for users to write in 'other' job role */
jobRoles.addEventListener( 'change', e => {
	if ( e.target.value === 'other' ) {
		otherJobRoleField.style.display = 'block';
	} else {
		otherJobRoleField.style.display = 'none';
	}
} );
/** Listener to correctly display colors for each shirt design */
designsSelect.addEventListener( 'change', e => {
	colorsDiv.style.display = 'block';
	if ( e.target.value === 'js puns' ) {
		jsPunsColors.forEach( color => {
			color.style.display = 'block';
		} );
		heartJsColors.forEach( color => {
			color.style.display = 'none';
		} );
	} else {
		heartJsColors.forEach( color => {
			color.style.display = 'block';
		} );
		jsPunsColors.forEach( color => {
			color.style.display = 'none';
		} );
	}
	/** Makes a more appropriate message */
	colorsSelect[0].innerHTML = 'Please select a color'
	colorsSelect[0].style.display = 'block';
	colorsSelect[0].selected = 'true';
} );
/** Makes it so user cant select invalid option */
colorsSelect.addEventListener('focus', e => {
	colorsSelect[0].style.display = 'none';
});
/** Listener to update the total cost of the activities */
activityFieldset.addEventListener( 'change', e => {
	const activity = e.target;
	if ( activity.checked ) {
		totalCost += +activity.dataset.cost;
	} else if ( totalCost > 0 ) {
		totalCost -= +activity.dataset.cost;
	}
	totalCostDisplay.innerHTML = `Total: $${totalCost}`;
} );
/** Listener for showing the correct payment method based on user choice */
paymentsSelect.addEventListener( 'change', e => {
	changePayment( e.target.value );
} );
/** 'Register' button listener, validates each input and prevents 'default'
 *  or refresh if something is incorrect */
form.addEventListener( 'submit', e => {
	if ( !nameIsValidated() ) {
		e.preventDefault();
		addErrorsAndHints( nameField );
	} else {
		addErrorsAndHints( nameField, false );
	}
	if ( !emailIsValidated() ) {
		e.preventDefault();
		addErrorsAndHints( emailField );
	} else {
		addErrorsAndHints( emailField, false );
	}
	if ( !activitiesIsValidated() ) {
		e.preventDefault();
		addErrorsAndHints( activitiesBox );
	} else {
		addErrorsAndHints( activitiesBox, false );
	}
	if ( paymentsSelect[ 1 ].selected ) {
		if ( expMonthSelect[ 0 ].selected ) {
			e.preventDefault();
			addErrorsAndHints( expMonthSelect );
		} else {
			addErrorsAndHints( expMonthSelect, false );
		}
		if ( expYearSelect[ 0 ].selected ) {
			e.preventDefault();
			addErrorsAndHints( expYearSelect );
		} else {
			addErrorsAndHints( expYearSelect, false );
		}
		if ( !cardNumberIsValidated() ) {
			e.preventDefault();
			addErrorsAndHints( cardNumberField );
		} else {
			addErrorsAndHints( cardNumberField, false );
		}
		if ( !zipCodeIsValidated() ) {
			e.preventDefault();
			addErrorsAndHints( zipField );
		} else {
			addErrorsAndHints( zipField, false );
		}
		if ( !cvvIsValidated() ) {
			e.preventDefault();
			addErrorsAndHints( cvvField );
		} else {
			addErrorsAndHints( cvvField, false );
		}
	}
} );
/** Real-time validator for credit-card text inputs */
creditCardBox.addEventListener( 'keyup', e => {
	if ( !cardNumberIsValidated() && e.target === cardNumberField ) {
		addErrorsAndHints( cardNumberField );
	} else if ( e.target === cardNumberField ) {
		addErrorsAndHints( cardNumberField, false );
	}
	if ( !zipCodeIsValidated() && e.target === zipField ) {
		addErrorsAndHints( zipField );
	} else if ( e.target === zipField ) {
		addErrorsAndHints( zipField, false );
	}
	if ( !cvvIsValidated() && e.target === cvvField ) {
		addErrorsAndHints( cvvField );
	} else if ( e.target === cvvField ) {
		addErrorsAndHints( cvvField, false );
	}
} );
/** forEach to add required listeners for checkboxes */
checkboxes.forEach( checkbox => {
    /** Listener for adding focus to checkbox's label */
	checkbox.addEventListener( 'focus', e => {
		checkbox.parentElement.classList.add( 'focus' );
    } );
    /** Listener for removing focus from checkbox's label */
	checkbox.addEventListener( 'blur', e => {
		checkbox.parentElement.classList.remove( 'focus' );
    } );
    /** Listener for disabling checkboxes with same timeframe
     *  to prevent user from choosing conflicting activities */
	checkbox.addEventListener( 'change', e => {
		if( e.target.className !== 'disabled' ) {
			if ( checkbox.checked ) {
				checkboxes.forEach( cb => {
					if ( cb.name !== checkbox.name && cb.dataset.dayAndTime === checkbox.dataset
						.dayAndTime ) {
						cb.parentElement.classList.add( 'disabled' );
						cb.classList.add( 'disabled' );
					}
				} );
			} else {
				checkboxes.forEach( cb => {
					if ( cb.name !== checkbox.name && cb.dataset.dayAndTime === checkbox.dataset
						.dayAndTime ) {
						cb.parentElement.classList.remove( 'disabled' );
						cb.classList.remove( 'disabled' );
					}
				} );
			}
		} else {
			e.target.checked = false;
		}
	} );
} );
/** Initializing the page */
initializePage();