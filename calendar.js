const fabric = require('fabric').fabric;
import moment from 'moment';

const canvas = new fabric.StaticCanvas('calendar'),
    now = moment(),
    start = now.clone().subtract(3, 'years'),
    end = now.clone().add(3, 'years');

// Timeline Markers
let diff, current = start.clone();
while(current < end) {
    current = current.add(1, 'year').startOf('year');
    diff = (current.diff(start, 'days') / 2) + 90;

    canvas.add(new fabric.Rect({
        left: diff,
        top: 25,
        fill: 'black',
        width: 1,
        height: canvas.height
    }));
    canvas.add(new fabric.Text(current.format('D MMM YYYY'), {
        fontFamily: 'Helvetica',
        fontSize: 20,
        textAlign: 'center',
        left: diff - 50,
        top: 0
    }));
}

// Loop through each version, marking their timelines
let y = -10, rectStart, rectEnd;
console.log(window.versions);
for(let i = 0; i < window.versions.length; i++) {
    if (window.versions[i].releaseDate == null) {
        continue;
    }

    y = y + 40;

    canvas.add(new fabric.Text(window.versions[i].version, {
        fontFamily: 'Helvetica',
        fontSize: 20,
        textAlign: 'left',
        left: 0,
        top: y
    }));

    // Make the timeline
    // Active Support
    rectStart = window.versions[i].releaseDate.clone();

    if (rectStart.isBefore(start)) {
        rectStart = start.clone();
    }

    if (window.versions[i].isLTS) {
        rectEnd = window.versions[i].releaseDate.clone().add(2, 'years');
    } else {
        rectEnd = window.versions[i].releaseDate.clone().add(6, 'months');
    }

    canvas.add(new fabric.Rect({
        left: (rectStart.diff(start, 'days') / 2) + 90,
        width: (rectEnd.diff(rectStart, 'days') / 2),
        fill: '#27ae60',
        top: y,
        height: 20
    }));

    // Security Support
    rectStart = rectEnd.clone();

    if (rectStart.isBefore(start)) {
        rectStart = start.clone();
    }

    if (window.versions[i].isLTS) {
        rectEnd = window.versions[i].releaseDate.clone().add(3, 'years');
    } else {
        rectEnd = window.versions[i].releaseDate.clone().add(1, 'year');
    }

    canvas.add(new fabric.Rect({
        left: (rectStart.diff(start, 'days') / 2) + 90,
        width: (rectEnd.diff(rectStart, 'days') / 2),
        fill: '#e67e22',
        top: y,
        height: 20
    }));
}

// Mark Today
canvas.add(new fabric.Rect({
    left: (now.diff(start, 'days') / 2) + 90 - 1,
    top: 25,
    fill: '#c0392b',
    width: 2,
    height: canvas.height
}));
