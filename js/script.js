const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const jobRoles = document.getElementById('title');
const otherJobRoleField = document.getElementById('other-job-role');
const colorsSelect = document.getElementById('color');
const designsSelect = document.getElementById('design');
const jsPunsColors = document.querySelectorAll("[data-theme='js puns']");
const heartJsColors = document.querySelectorAll("[data-theme='heart js']");
const activityFieldset = document.getElementById('activities');
let totalCostDisplay = document.getElementById('activities-cost');
let totalCost = 0;
const paymentsSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const expMonthSelect = document.getElementById('exp-month');
const expYearSelect = document.getElementById('exp-year');
const cardNumberField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const form = document.querySelector('form');

const changePayment = value => {
    const method = value;
    switch(method) {
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

const nameIsValidated = () => {
    const isValid = /^\w+ ?(\w+)? ?(\w+)? ?(\w+)?$/.test( nameField.value );
    !isValid && console.log(`Please enter a name.`);
    return isValid;
}

const emailIsValidated = () => {
    const isValid = /^[^@]{1,16}@[a-z]+\.[a-z]+$/.test( emailField.value );
    !isValid && console.log(`Please enter a valid email. e.g. example@email.com`);
    return isValid;
}

const activitiesIsValidated = () => {
    const isValid = totalCost > 0;
    !isValid && console.log(`Please select at least one activity.`);
    return isValid;
}

const cardNumberIsValidated = () => {
    const isValid = /^\d{13,16}$/.test( cardNumberField.value );
    !isValid && console.log(`Please enter a valid Card Number with 13-16 digits.`);
    return isValid;
}

const zipCodeIsValidated = () => {
    const isValid = /^\d{5}$/.test(zipField.value);
    !isValid && console.log(`Please enter a valid Zip Code with 5 digits.`);
    return isValid;
}

const cvvIsValidated = () => {
    const isValid = /^\d{3}$/.test(cvvField.value);
    !isValid && console.log(`Please enter a valid CVV with 3 digits.`);
    return isValid;
}

const initializePage = () => {
    nameField.focus();
    otherJobRoleField.style.display = 'none';
    colorsSelect.style.display = 'none';
    paymentsSelect[1].selected = true;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    creditCardDiv.style.display = 'block';
}

jobRoles.addEventListener('change', e => {
    if( e.target.value === 'other' ){
        otherJobRoleField.style.display = 'block';
    } else {
        otherJobRoleField.style.display = 'none';
    }
});

designsSelect.addEventListener('change', e => {
    colorsSelect.style.display = 'block';
    if( e.target.value === 'js puns' ){
        jsPunsColors.forEach(color => {
            color.style.display = 'block';
        });
        heartJsColors.forEach(color => {
            color.style.display = 'none';
        });
    } else {
        heartJsColors.forEach(color => {
            color.style.display = 'block';
        });
        jsPunsColors.forEach(color => {
            color.style.display = 'none';
        });
    }
});

activityFieldset.addEventListener('change', e => {
    const activity = e.target;
    if( activity.checked ) {
        totalCost += +activity.dataset.cost;
    } else if( totalCost > 0) {
        totalCost -= +activity.dataset.cost;
    }
    totalCostDisplay.innerHTML = `Total: $${totalCost}`;
});

paymentsSelect.addEventListener('change', e => {
    changePayment( e.target.value );
});

form.addEventListener('submit', e => {
    if( !nameIsValidated() ){
        e.preventDefault();
    }
    if( !emailIsValidated() ){
        e.preventDefault();
    }
    if( !activitiesIsValidated() ){
        e.preventDefault();
    }
    if( paymentsSelect[1].selected ) {
        if( expMonthSelect[0].selected ){
            e.preventDefault();
            console.log(`Please enter a valid expiration month.`);
        }
        if( expYearSelect[0].selected ){
            e.preventDefault();
            console.log(`Please enter a valid expiration year.`);
        }
        if( !cardNumberIsValidated() ){
            e.preventDefault();
        }
        if( !zipCodeIsValidated() ){
            e.preventDefault();
        }
        if( !cvvIsValidated() ){
            e.preventDefault();
        }
    }
});

// Initializing the page
initializePage();