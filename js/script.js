const nameField = document.getElementById('name');
const jobRoles = document.getElementById('title');
const otherJobRoleField = document.getElementById('other-job-role');
const colorsSelect = document.getElementById('color');
const designsSelect = document.getElementById('design');
const jsPunsColors = document.querySelectorAll("[data-theme='js puns']");
const heartJsColors = document.querySelectorAll("[data-theme='heart js']");
const activityFieldset = document.getElementById('activities');

const initializePage = () => {
    nameField.focus();
    otherJobRoleField.style.display = 'none';
    colorsSelect.style.display = 'none';
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
    
});

// Initializing the page
initializePage();