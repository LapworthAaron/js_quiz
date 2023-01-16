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
var gameCountDown = 0;
var previousDate = new Date(Date.now());

const audioCorrect = new Audio("./assets/sfx/correct.wav")
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav")

start.addEventListener("click", startGame);

//initialise function to reset all variables
function init() {
    runningScore = 0;
    result = "";
    gameTime = 62000;
    questionNumber = 0;
    gameCountDown = 0;
    previousDate = new Date(Date.now());

    timer = document.querySelector('#timer');

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
        console.log(event);
        console.log(event.target);
        console.log(event.target.tagName);
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
    divQ.appendChild(olQ);
    for (var i = 1; i < 5; i++) {
        var btn = document.createElement('button');
        olQ.appendChild(btn);
        btn.setAttribute('id', 'quest' + i);
    }
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
        gameOver();
    }
    return;
}

//check answer
function checkAnswer(elementObj) {
    if (elementObj.tagName === 'BUTTON') {
        var feedback = document.getElementById("feedback");
        if (elementObj.textContent === questionList[questionNumber].ans) {
            audioCorrect.play();
            questionNumber++;
            runningScore++;
            questionsPop();
            toggleReveal(feedback, "feedback");
            feedback.textContent = "Correct!";
            setTimeout(function(){
                feedback.textContent = "";
                toggleReveal(feedback, "feedback");
                }, 400);
        } else {
            audioIncorrect.play();
            questionNumber++;
            clearInterval(gameCountDown);
            gameTime = Math.round((gameTime - (Date.now() - previousDate.getTime()) - 1000)/1000)*1000;
            gameTimerFunc(gameTime, document.querySelector('#time'));
            toggleReveal(feedback, "feedback");
            feedback.textContent = "Wrong!";
            setTimeout(function(){
                feedback.textContent = "";
                toggleReveal(feedback, "feedback");
                }, 400);
            questionsPop();
        }
    }
    return;
}

//once game is over
function gameOver() {
    clearInterval(gameCountDown);
    timer.textContent = "0";
    //hide questions screen
    toggleReveal(qScreen, "questions");
    //show end screen
    toggleReveal(endScreen, "end-screen");
    var endScore = document.querySelector('#final-score');
    populateText(endScore, runningScore);  
}

//submit score 
submit.addEventListener("click", function() {
    var initialsInput = document.querySelector("#initials");
    if (initialsInput.value === null) {
        alert("please enter initials");
    } else {
        addHighScore(runningScore, initialsInput.value)
    }
    //hide end screen
    toggleReveal(endScreen, "end-screen");
    //show start screen
    toggleReveal(startScreen, "start");
    initialsInput.value = "";
});

//Game timer function
function gameTimerFunc(length, element) {
    timer = element;
    previousDate = new Date(Date.now());
    var countDownDate = new Date(Date.now() + length);
    timer.textContent = Math.floor((length-1000)/1000);
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
        if (timeLeft <= 0) {
            timer.textContent = "EXPIRED";
            gameOver();
        }
    }, 1000);
    return;
}

