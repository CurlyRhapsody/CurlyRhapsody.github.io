const throws = Object.freeze({ROCK: 0, PAPER: 1, SCISSORS: 2});
const outcomes = Object.freeze({WIN: 0, LOSE: 1, TIE: 2});
const difficulty = Object.freeze({EASY: 0, NORMAL: 1, HARD: 2, IMPOSSIBLE: 3});

let current_diffiiculty = difficulty.NORMAL;
let wins = 0;
let loses = 0;
let ties = 0;
// They are only used in hard mode
var CPUlastResult = undefined;
var CPUlastThrow = undefined;
var YourlastThrow = undefined;

// Change difficulty of the game
function ChangeDifficulty(difficultyCode) {
    current_diffiiculty = difficultyCode;
    // Remove the computer throw
    document.getElementById("ComputerThrow").src = "";
    document.getElementById("ComputerThrow").style.display = "none";

    // Reset Stat
    document.getElementById("Wins").innerHTML = "Wins: 0";
    document.getElementById("Loses").innerHTML = "Loses: 0";
    document.getElementById("Ties").innerHTML = "Ties: 0";
    wins = 0;
    loses = 0;
    ties = 0;

    // Reset hard mode records
    CPUlastResult = undefined;
    CPUlastThrow = undefined;
}

// Disable the picking
function DisablePicks(playerThrow) {
    if (playerThrow != throws.ROCK) {
        document.getElementById("Rock").src = "";
        document.getElementById("Rock").style.display = "none";
    }
    if (playerThrow != throws.PAPER) {
        document.getElementById("Paper").src = "";
        document.getElementById("Paper").style.display = "none";
    }
    if (playerThrow != throws.SCISSORS) {
        document.getElementById("Scissors").src = "";
        document.getElementById("Scissors").style.display = "none";
    }
    document.getElementById("Rock").onclick = function() {};
    document.getElementById("Rock").style.cursor = "default";
    document.getElementById("Paper").onclick = function() {};
    document.getElementById("Paper").style.cursor = "default";
    document.getElementById("Scissors").onclick = function() {};
    document.getElementById("Scissors").style.cursor = "default";
}

// Main function for computer to work
function ComputerPick(playerThrow) {
    document.getElementById("DifficultyForm").disabled = true;
    DisablePicks(playerThrow);
    switch (current_diffiiculty) {
        case difficulty.EASY:
            setTimeout(easyCPU, 2000, playerThrow); break;
        case difficulty.NORMAL:
            setTimeout(normalCPU, 2000, playerThrow); break;
        case difficulty.HARD:
            setTimeout(hardCPU, 2000, playerThrow); break;
        case difficulty.IMPOSSIBLE:
            setTimeout(impossibleCPU, 2000, playerThrow); break;
    }
}

// Implement the CPU for Easy Difficulty
function easyCPU(playerThrow) {
    let computerThrow;
    switch (playerThrow) {
        case throws.ROCK:
            computerThrows(throws.SCISSORS);
            computerThrow = throws.SCISSORS;
            break;
        case throws.PAPER:
            computerThrows(throws.ROCK);
            computerThrow = throws.ROCK;
            break;
        case throws.SCISSORS:
            computerThrows(throws.PAPER);
            computerThrow = throws.PAPER;
            break;
    }
    let results = processResults(playerThrow, computerThrow);
    RPSAftermath(results);
}

// Implement the CPU for Normal Difficulty
function normalCPU(playerThrow) {
    let rng = Math.floor(Math.random() * 3);
    computerThrows(rng);
    computerThrow = rng;
    let results = processResults(playerThrow, computerThrow);
    RPSAftermath(results);
}

// Implement the CPU for Hard Difficulty
function hardCPU(playerThrow) {
    let rng = Math.floor(Math.random() * 120);
    let computerThrow
    switch (CPUlastResult) {
        // Last round win: Your last throw = 60%, others 20%
        case outcomes.WIN: {
            if (rng < 72) {
                computerThrows(YourlastThrow);
                computerThrow = YourlastThrow;
                CPUlastThrow = YourlastThrow;
            } else {
                let PossibleThrows = [throws.ROCK, throws.PAPER, throws.SCISSORS];
                PossibleThrows.splice(YourlastThrow, 1);
                let final_decision = PossibleThrows[Math.floor(Math.random()*PossibleThrows.length)];
                computerThrows(final_decision);
                computerThrow = final_decision;
                CPUlastThrow = final_decision;
            }
            break;
        }
        // Last round lose: The thing that not thrown in last round = 60%, others 20%
        case outcomes.LOSE: {
            let PossibleThrows = [throws.ROCK, throws.PAPER, throws.SCISSORS];
            PossibleThrows.splice(YourlastThrow, 1);
            PossibleThrows.splice(CPUlastThrow, 1);
            let main_decision = PossibleThrows[0];
            if (rng < 72) {
                computerThrows(main_decision);
                computerThrow = main_decision;
                CPUlastThrow = main_decision;
            } else {
                PossibleThrows = [throws.ROCK, throws.PAPER, throws.SCISSORS];
                PossibleThrows.splice(main_decision, 1);
                let alt_decision = PossibleThrows[Math.floor(Math.random()*PossibleThrows.length)];
                computerThrows(alt_decision);
                computerThrow = alt_decision;
                CPUlastThrow = alt_decision;
            }
            break;
        }
        // Last round tie/First round: Rock = Paper = Scissors = 33.3%
        default: {
            switch (true) {
                case (rng < 40):
                    computerThrows(throws.ROCK);
                    computerThrow = throws.ROCK;
                    CPUlastThrow = throws.ROCK;
                    break;
                case (rng < 80):
                    computerThrows(throws.PAPER);
                    computerThrow = throws.PAPER;
                    CPUlastThrow = throws.PAPER;
                    break;
                case (rng < 120):
                    computerThrows(throws.SCISSORS);
                    computerThrow = throws.SCISSORS;
                    CPUlastThrow = throws.SCISSORS;
                    break;
            }
            break;
        }
    }
    let results = processResults(playerThrow, computerThrow);
    RPSAftermath(results);
}

// Implement the CPU for Impossible Difficulty
function impossibleCPU(playerThrow) {
    let computerThrow;
    switch (playerThrow) {
        case throws.ROCK:
            computerThrows(throws.PAPER);
            computerThrow = throws.PAPER;
            break;
        case throws.PAPER:
            computerThrows(throws.SCISSORS);
            computerThrow = throws.SCISSORS;
            break;
        case throws.SCISSORS:
            computerThrows(throws.ROCK);
            computerThrow = throws.ROCK;
            break;
    }
    let results = processResults(playerThrow, computerThrow);
    RPSAftermath(results);
}


// Helper function to handle the computer's throw
function computerThrows(CPUThrow) {
    switch (CPUThrow) {
        case throws.ROCK:
            document.getElementById("ComputerThrow").style.display = "inline";
            document.getElementById("ComputerThrow").src = "../Graphics/Rock.png";
            break;
        case throws.PAPER:
            document.getElementById("ComputerThrow").style.display = "inline";
            document.getElementById("ComputerThrow").src = "../Graphics/Paper.png";
            break;
        case throws.SCISSORS:
            document.getElementById("ComputerThrow").style.display = "inline";
            document.getElementById("ComputerThrow").src = "../Graphics/Scissors.png";
            break;
    }
}

// Helper function to implment the result processing
function processResults(playerThrow, computerThrow) {
    // Store your last throw for hard CPU
    YourlastThrow = playerThrow;
    if (playerThrow == computerThrow) {
        return outcomes.TIE;
    }
    // ROCK: 1, PAPER: 2, SCISSORS: 3
    if (playerThrow - computerThrow == 1 || playerThrow - computerThrow == -2) {
        return outcomes.WIN;
    }
    if (playerThrow - computerThrow == -1 || playerThrow - computerThrow == 2) {
        return outcomes.LOSE;
    }
}

// show the results
function RPSAftermath(results) {
    switch (results) {
        case outcomes.WIN:
            document.getElementById("Results").innerHTML = "You win!";
            CPUlastResult = outcomes.LOSE;
            wins += 1;
            document.getElementById("Wins").innerHTML = "Wins: " + wins;
            break;
        case outcomes.LOSE:
            document.getElementById("Results").innerHTML = "You lose!";
            CPUlastResult = outcomes.WIN;
            loses += 1;
            document.getElementById("Loses").innerHTML = "Loses: " + loses;
            break;
        case outcomes.TIE:
            document.getElementById("Results").innerHTML = "It's a tie!";
            CPUlastResult = outcomes.TIE;
            ties += 1;
            document.getElementById("Ties").innerHTML = "Ties: " + ties;
            break;
    }
    setTimeout(ResetRPS, 2000);
}

// Resets the game
function ResetRPS() {
    // Reset yours and computer's choices
    document.getElementById("ComputerThrow").style.display = "none";
    document.getElementById("ComputerThrow").src = "";

    document.getElementById("Rock").src = "../Graphics/Rock.png";
    document.getElementById("Rock").style.display = "inline";
    document.getElementById("Rock").onclick = function() {ComputerPick(throws.ROCK)};
    document.getElementById("Rock").style.cursor = "pointer";

    document.getElementById("Paper").src = "../Graphics/Paper.png";
    document.getElementById("Paper").style.display = "inline";
    document.getElementById("Paper").onclick = function() {ComputerPick(throws.PAPER)};
    document.getElementById("Paper").style.cursor = "pointer";

    document.getElementById("Scissors").src = "../Graphics/Scissors.png";
    document.getElementById("Scissors").style.display = "inline";
    document.getElementById("Scissors").onclick = function() {ComputerPick(throws.SCISSORS)};
    document.getElementById("Scissors").style.cursor = "pointer";

    // Clear results below
    document.getElementById("Results").innerHTML = " ";

    // Allow selection of difficulty again
    document.getElementById("DifficultyForm").disabled = false;
}