var canvas = new fabric.StaticCanvas('calendar'),
    now = moment(),
    start = now.clone().subtract(3, 'years'),
    end = now.clone().add(3, 'years'),
    current = start.clone(),
    gutterWidth = 45,
    diff;

// Loop through each version, marking their timelines
var y = -10;
for (var i = 0; i < window.versions.length; i++) {
    if (window.versions[i].releaseDate == null) {
        continue;
    }

    y = y + 40;

    // Active Support
    var releaseDate = window.versions[i].releaseDate.clone(),
        activeEnd;

    if (window.versions[i].isLTS) {
        activeEnd = releaseDate.clone().add(2, 'years');
    } else {
        activeEnd = releaseDate.clone().add(6, 'months');
    }

    canvas.add(new fabric.Rect({
        left: (releaseDate.diff(start, 'days') / 2) + gutterWidth,
        width: (activeEnd.diff(releaseDate, 'days') / 2),
        fill: '#27ae60',
        top: y,
        height: 20
    }));

    // Security support
    var securityStart = activeEnd.clone(),
        securityEnd;

    if (window.versions[i].isLTS) {
        securityEnd = securityStart.clone().add(1, 'years');
    } else {
        securityEnd = securityStart.clone().add(6, 'months');
    }

    canvas.add(new fabric.Rect({
        left: (securityStart.diff(start, 'days') / 2) + gutterWidth,
        width: (securityEnd.diff(securityStart, 'days') / 2),
        fill: '#e67e22',
        top: y,
        height: 20
    }));
}

// White rectangle background for gutter to hide bars clipping through
canvas.add(new fabric.Rect({
    left: -1,
    width: gutterWidth + 1,
    height: canvas.height,
    fill: 'white'
}));

// Mark each version
var y = -10;
for (var i = 0; i < window.versions.length; i++) {
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
}
canvas.add(new fabric.Line([
    gutterWidth,
    30,
    gutterWidth,
    y + 40
], {
    fill: 'black',
    stroke: 'black'
}));

// Timeline Markers
while(current < end) {
    current = current.add(1, 'year').startOf('year');
    diff = (current.diff(start, 'days') / 2) + gutterWidth;

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

// Mark Now
canvas.add(new fabric.Rect({
    left: (now.diff(start, 'days') / 2) + 90 - 1,
    top: 25,
    fill: '#c0392b',
    width: 2,
    height: canvas.height
}));
