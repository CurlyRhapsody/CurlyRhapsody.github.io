// Initialize variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let challengeStarted = false;
let spaceInput = true;

// Event handler for 5s challenge
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32 && spaceInput) {
        if (!challengeStarted) {
            Start5s();
            challengeStarted = true;
            return;
        }
        if (challengeStarted) {
            Stop5s();
            challengeStarted = false;
            spaceInput = false;
            return;
        }
    }
})


// Function for start
function Refresh() {
    start();
    spaceInput = false;
    document.getElementById('StartButton').style.display = "none";
    document.getElementById('PauseButton').style.display = "";
    document.getElementById('ResetButton').style.display = "";
    document.getElementById('5SChallengeStart').style.display = "none";
    document.getElementById('5SChallengeStart').style.display = "none";
    document.getElementById('5SChallengeResult').innerHTML = "";
}

// Function for resume
function Resume() {
    start();
    document.getElementById('PauseButton').style.display = "";
    document.getElementById('UnpauseButton').style.display = "none";
}

// Function for starting 5s challenge
function Start5s() {
    start();
    document.getElementById("display").style.color = "black";
    document.getElementById('StartButton').style.display = "none";
    document.getElementById('5SChallengeStart').style.display = "none";
    document.getElementById('5SChallengeStop').style.display = "";
    document.getElementById('5SChallengeResult').innerHTML = "5 Second Challenge started...";
}

// Function for stopping 5s challenge
function Stop5s() {
    clearInterval(timerInterval);
    document.getElementById("display").style.color = "greenyellow";
    document.getElementById('5SChallengeStop').style.display = "none";
    Aftermath();
}

function Aftermath() {
    let timediff = elapsedTime - 5000;
    if (timediff > 10) {
        timediff = Math.abs(timediff)
        let seconds = timediff / 1000;
        document.getElementById('5SChallengeResult').innerHTML = "You were " + seconds.toString() + " seconds late.";
    }
    if (timediff < 10) {
        timediff = Math.abs(timediff)
        let seconds = timediff / 1000;
        document.getElementById('5SChallengeResult').innerHTML = "You were " + seconds.toString() + " seconds early.";
    }
    if (timediff == 0) {
        document.getElementById('5SChallengeResult').innerHTML = "You measured exactly 5 seconds! GG!";
    }
    timerInterval = setInterval(function() {
        reset();
    }, 5000)
}

// Function for converting time to string
function timeToString(time, isTitle) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    
    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    if (!isTitle) {
        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);
        let formattedMS = ms.toString().padStart(2, "0");
        return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
    }

    return `${formattedHH}:${formattedMM}:${formattedSS}`;   
}

// Function for updating timer text
function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Function for running, stopping and restetting timer
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime, false));
        if (!challengeStarted) {
            document.title = timeToString(elapsedTime, true);
        }
    }, 10);
}

function pause() {
    clearInterval(timerInterval);
    document.getElementById('PauseButton').style.display = "none";
    document.getElementById('UnpauseButton').style.display = "";
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00:00");
    elapsedTime = 0;
    spaceInput = true;
    document.getElementById('StartButton').style.display = "";
    document.getElementById('PauseButton').style.display = "none";
    document.getElementById('UnpauseButton').style.display = "none";
    document.getElementById('ResetButton').style.display = "none";
    document.getElementById('5SChallengeStart').style.display = "";
    document.getElementById('5SChallengeResult').innerHTML = "Alternatively, use space bar to start 5 Seconds Challenge.";
    document.title = "Online stopwatch + 5s Challenge";
}