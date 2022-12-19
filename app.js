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

// helper functions
const valueEntered = (values) => {
    if (Array.isArray(values)) {
        for (i=0; i<values.length; i++) {
            if (values[i]) {
                return true;
            }
        }
        return false;
    } else {
        for (let k in values) {
            if (values[k]) {
                return true;
            }
        }
        return false;
    }
}

const timeToSeconds = (timeValues) => {
    let timeInSeconds = 0;

    for (let k in timeValues) {
        if (timeValues[k]) {
            switch (k) {
                case 'hours':
                    timeInSeconds += parseInt(timeValues[k]) * 3600;
                    break;
                case 'minutes':
                    timeInSeconds += parseInt(timeValues[k]) * 60;
                    break;
                default:
                    timeInSeconds += parseInt(timeValues[k]);
            }
        }
    }
    return timeInSeconds;
}

const calculatePace = (time, distance) => {
    return time / distance;
}

const calculateTime = (pace, distance) => {
    return pace * distance;
}

const calculateDistance = (pace, time) => {
    return time / pace;
}

// elements
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

// submit listener
form.addEventListener('submit', (event) => {

    // get values from form elements
    const distanceValues = [distance.value];
    const timeValues = {'hours': timeHours.value,
                        'minutes': timeMinutes.value,
                        'seconds': timeSeconds.value};
    const paceValues = [paceHours.value, paceMinutes.value, paceSeconds.value];

    const distanceUnitsValue = distanceUnits.value;
    const paceUnitsValue = paceUnits.value;

    // solve for pace
    if (valueEntered(distanceValues) && valueEntered(timeValues) && !valueEntered(paceValues)) {
        let distance = parseInt(distanceValues[0]);
        console.log(distance);
        let time = timeToSeconds(timeValues);
        console.log(time);

        let pace = calculatePace(time, distance);

        console.log(pace);

        // parse pace in seconds to hours, minutes, seconds
        if ((pace / 3600) > 1) {
            pace = pace / 3600;
            paceHours.value = Math.floor(pace);
            pace = (pace % 1) * 3600;
        }
        if ((pace  / 60 ) > 1) {
            pace = pace / 60;
            paceMinutes.value = Math.floor(pace);
            pace = (pace % 1) * 60;
        }
        if (pace > 0) {
            paceSeconds.value = Math.round(pace);
        }
    }

    // prevent reload
    event.preventDefault();
});