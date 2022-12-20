// form

// helper functions

// return true if form section has any values entered
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

// convert hours, minutes, seconds to seconds
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

const kilometersToMiles = (kilometers) => {
    return kilometers * 0.621371
}

const milesToKilometers = (miles) => {
    return miles * 1.60934
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

// parse pace in seconds to hours, minutes, seconds
const parseSeconds = (t) => {
    hms = {}
    if ((t / 3600) > 1) {
        t = t / 3600;
        hms['hours'] = Math.floor(t);
        t = (t % 1) * 3600;
    }
    if ((t  / 60 ) > 1) {
        t = t / 60;
        hms['minutes'] = Math.floor(t);
        t = (t % 1) * 60;
    }
    if (t > 0) {
        hms['seconds'] = Math.round(t);
    }
    return hms;
}

// select elements
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
    const paceValues = {'hours': paceHours.value, 
                        'minutes': paceMinutes.value, 
                        'seconds': paceSeconds.value};

    const distanceUnitsValue = distanceUnits.value;
    const paceUnitsValue = paceUnits.value;

    // solve for pace
    if (valueEntered(distanceValues) && valueEntered(timeValues) && !valueEntered(paceValues)) {
        // get time values
        let time = timeToSeconds(timeValues);
        
        // set pace units to match distance units
        paceUnits.value = distanceUnits.value;

        // solve for pace
        let pace = calculatePace(time, parseFloat(distanceValues[0]));

        // parse pace in seconds to hours, minutes, seconds
        const hms = parseSeconds(pace);

        // populate form inputs
        if ('hours' in hms) {
            paceHours.value = hms.hours;
        }
        if ('minutes' in hms) {
            paceMinutes.value = hms.minutes;
        }
        if ('seconds' in hms) {
            paceSeconds.value = hms.seconds;
        }
    } else if (valueEntered(timeValues) && valueEntered(paceValues) && !valueEntered(distanceValues)) { // solve for distance
        // get time and pace values
        let time = timeToSeconds(timeValues);
        let pace = timeToSeconds(paceValues);

        // set distance units to match pace units
        distanceUnits.value = paceUnits.value;

        // solve for distance
        distance.value = calculateDistance(pace, time).toFixed(2);
    } else if (valueEntered(distanceValues) && valueEntered(paceValues) && !valueEntered(timeValues)) { // solve for time
        // get pace values
        let pace = timeToSeconds(paceValues);
        let time = 0;
        
        switch (distanceUnitsValue == paceUnitsValue) {
            case true:
                time = calculateTime(pace, parseFloat(distanceValues[0]));
                break;
            case false:
                if (distanceUnitsValue == 'miles') {
                    time = calculateTime(pace, milesToKilometers(parseFloat(distanceValues[0])));
                } else {
                    time = calculateTime(pace, kilometersToMiles(parseFloat(distanceValues[0])));
                }
                break;
            default:
                console.log('Error: Missing units for distance and/or pace');
        }
        console.log(time);
        // parse time in seconds to hours, minutes, seconds
        const hms = parseSeconds(time);

        // populate form inputs
        if ('hours' in hms) {
            timeHours.value = hms.hours;
        }
        if ('minutes' in hms) {
            timeMinutes.value = hms.minutes;
        }
        if ('seconds' in hms) {
            timeSeconds.value = hms.seconds;
        }
    } else {
        console.log('Make sure form fields are filled out properly');
    }

    // prevent reload
    event.preventDefault();
});