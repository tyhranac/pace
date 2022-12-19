// hamrburger menu
const navPages = document.querySelector('#nav-pages');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
    if (navPages.getAttribute('data-visible') == 'false') {
        navPages.setAttribute('data-visible', 'true');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
    } else {
        navPages.setAttribute('data-visible', 'false');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
});

// form
const valueEntered = (values) => {
    for (i=0; i<values.lenght; i++) {
        if (values[i]) {
            return true;
        } else {
            return false;
        }
    }
}

const calculatePace = (time, distance) => {
    return time/distance;
}

const calculateTime = (pace, distance) => {
    return pace * distance;
}

const calculateDistance = (pace, time) => {
    return time/pace;
}

const form = document.querySelector('form');
const distance = document.querySelector('#dist');
const distanceUnits = document.querySelector('#units-dist');
const timeHours = document.querySelector('#time-hours');
const timeMinutes = document.querySelector('#time-minutes');
const timeSeconds = document.querySelector('#time-seconds');
const paceHours = document.querySelector('#pace-hours');
const paceMinutes = document.querySelector('#pace-minutes');
const paceSeconds = document.querySelector('#pace-seconds');
const paceUnits = document.querySelector('#units-pace');
const submit = document.querySelector('#form-submit');

form.addEventListener('submit', (event) => {

    // get values from form elements
    const distanceValues = [distance.value];
    const timeValues = [timeHours.value, timeMinutes.value, timeSeconds.value];
    const paceValues = [paceHours.value, paceMinutes.value, paceSeconds.value];

    const distanceUnitsValue = distanceUnits.value;
    const paceUnitsValue = paceUnits.value;

    
})