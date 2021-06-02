function GetTimes() {
    var yourTime = new Date();
    var TimeOffset = Math.floor(yourTime.getTimezoneOffset()/-60);
    var h = (yourTime.getHours() - TimeOffset);
    if (h < 0) h += 24; 
    var m = yourTime.getMinutes();
    var s = yourTime.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    let count = -12;
    // Negative numbers
    for (;count < 0; count++) {
        tz_h = h + count;
        if (tz_h < 0) tz_h += 24;
        let name = 'm' + Math.abs(count);
        tz_h = checkTime(tz_h);
        document.getElementById(name).innerHTML = tz_h + ":" + m + ":" + s;
    }
    count = 0;
    // pm zero
    tz_h = h;
    tz_h = checkTime(tz_h);
    document.getElementById('pm0').innerHTML = tz_h + ":" + m + ":" + s;
    // Positive numbers
    for (count = 1;count < 13; count++) {
        tz_h = ((h + count) % 24);
        tz_h = checkTime(tz_h);
        let name = 'p' + count;
        document.getElementById(name).innerHTML = tz_h + ":" + m + ":" + s;
    }

    FindTimezone(yourTime.getTimezoneOffset());

    var t = setTimeout(GetTimes, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function FindTimezone(offset) {
    let result = Math.floor(offset / -60);
    let name=""
    switch (true) {
        case (result < 0):
            name = "tzm" + Math.abs(result);
            break;
        case (result > 0):
            name = "tzp" + Math.abs(result);
            break;
        default:
            name = "tzpm0"
            break;
    }
    document.getElementById(name).style.backgroundColor = 'White';
}