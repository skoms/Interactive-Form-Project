const nameField = document.getElementById('name');
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

// Initializing the page
initializePage();