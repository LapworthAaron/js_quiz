//store questions in an array of objects [{question, ans1, ans2, ans3, ans4}]
//Start button
//answers are buttons
//clicked answer will change colour and play relevant music
//incorrect answer subtracts time from the clock
//delay then show the next questions
//quiz ends after all questions answered or time runs out
//after end display score and option to add name for highscore table

//global variables
var runningScore = 0; //running value of the score
var result = "";
var gameTime = 0; //how much time we want the game to run for
var questionNumber = 0; //which question to display

//global variable objects from HTML
var timer; //onscreen time element
var seconds = 0;
var startScreen = document.querySelector('#start-screen');
var qScreen = document.querySelector('#questions');
var endScreen = document.querySelector('#end-screen');

start.addEventListener("click", startGame);

//initialise function to reset all variables
function init() {
    runningScore = 0;
    result = "";
    gameTime = 62000;
    questionNumber = 0;

    timer = document.querySelector('#timer');
    startScreen = document.querySelector('#start-screen');
    qScreen = document.querySelector('#questions');

    //initialise html elements for questions
    questionsInit();
    //set game timer
    gameTimerFunc(gameTime, document.querySelector('#time')); //set timer up
    //hide start screen
    toggleReveal(startScreen, "start");
    //show questions screen
    toggleReveal(qScreen, "questions");
    return;
}

//start the game funtion
function startGame() {
    init(); //reset variables
    runGame();
    return;
}

//the game engine
function runGame() {
    questionsPop();
    choices.addEventListener("click", function(event) {
        checkAnswer(event.target);
    });
    return;
}

//toggle hidden/reveal - if hidden then show, if show then hide
function toggleReveal(classObj, className) {
    if (classObj.classList.contains('hide')) {
        //if the element is hidden, do this
        classObj.classList.remove('hide');
        classObj.classList.add(className);
    } else if (classObj.classList.contains(className)) {
        //if the element is shown, do this
        classObj.classList.remove(className);
        classObj.classList.add('hide');
    }
    return;
}

//function to populate textContent of an element
function populateText(objFill, textFill) {
    objFill.textContent = textFill;
    return;
}

//setup questions - initialise then re-use
function questionsInit() {
    //create the list and buttons
    var divQ = document.querySelector('.choices');
    var olQ = document.createElement('ol');
    var b1 = document.createElement('button');
    var b2 = document.createElement('button');
    var b3 = document.createElement('button');
    var b4 = document.createElement('button');
    divQ.appendChild(olQ);
    olQ.appendChild(b1);
    olQ.appendChild(b2);
    olQ.appendChild(b3);
    olQ.appendChild(b4);
    b1.setAttribute('id', 'quest1');
    b2.setAttribute('id', 'quest2');
    b3.setAttribute('id', 'quest3');
    b4.setAttribute('id', 'quest4');
    return;
}

function questionsPop() {
    //populate the buttons and question field with the appropriate text
    if (questionNumber < questionList.length) {
        var qTitle = document.querySelector('#question-title');
        var q1= document.querySelector('#quest1');
        var q2 = document.querySelector('#quest2');
        var q3 = document.querySelector('#quest3');
        var q4 = document.querySelector('#quest4');
        populateText(qTitle, questionList[questionNumber].question);
        populateText(q1, questionList[questionNumber].opt1);
        populateText(q2, questionList[questionNumber].opt2);
        populateText(q3, questionList[questionNumber].opt3);
        populateText(q4, questionList[questionNumber].opt4);
    } else {
        //hide questions screen
        toggleReveal(qScreen, "questions");
        //show end screen
        toggleReveal(endScreen, "end-screen");

        gameOver();
    }
    
    return;
}

//check answer
function checkAnswer(elementObj) {
    if (elementObj.textContent === questionList[questionNumber].ans) {
        questionNumber++;
        runningScore++;
        questionsPop();
    } else {
        questionNumber++;
        questionsPop();
    }
    return;
}

//once game is over
function gameOver() {
    var endScore = document.querySelector('#final-score');
    console.log(runningScore);
    populateText(endScore, runningScore);
}

//Game timer function
function gameTimerFunc(length, element) {
    timer = element;
    var countDownDate = new Date(Date.now() + length);

    gameCountDown = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var timeLeft = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var seconds = Math.floor(timeLeft/1000);
        // Output the result in an element
        timer.textContent = seconds;
        // If the count down is over, end the game
        if (timeLeft < 0) {
            clearInterval(gameCountDown);
            timer.textContent = "EXPIRED";
            // alert("You have lost!");
            // totalLosses++;
            // screenLosses.textContent = totalLosses;
        }
    }, 1000);

    return;
}

