// Timer Stuff
    // 75 seconds to start
    // When incorrect subtract 15 seconds
    // Final Score is time remaining

var timerEl = document.getElementById('timer');
var questionsEl = document.getElementById('questions');
var answerEl = document.getElementById('answer');
var questionIdCounter = 0;
var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: {
            1: "1. strings",
            2: "2. booleans",
            3: "3. alerts",
            4: "4. integers"
        },
        correctAnswer: "3"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: {
            1: "1. quotes",
            2: "2. curly brackets",
            3: "3. parenthesis",
            4: "4. square brackets"
        },
        correctAnswer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: {
            1: "1. numbers and strings",
            2: "2. other arrays",
            3: "3. booleans",
            4: "4. all of the above"
        },
        correctAnswer: "4"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: {
            1: "1. commas",
            2: "2. curly brackets",
            3: "3. quotes",
            4: "4. parenthesis"
        },
        correctAnswer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "1. JavaScript",
            2: "2. terminal/bash",
            3: "3. for loops",
            4: "4. console.log"
        },
        correctAnswer: "4"
    }
];

function timer() {
    var timeLeft = 75;
    
    var timeInterval = setInterval(function (){
        if (timeLeft >1) {
            timerEl.textContent = timeLeft
            timeLeft--;
        }
        else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);
            // submitScore();
        };
    }, 1000);
};

// Quiz Stuff
    // 5 Questions
    // On click move to next question
    // End of questions or when timer runs out give prompt to submit info 

var startScreenEl = function () {
    // Add header
    var headerEl = document.createElement("h2");

    headerEl.className = "instructions question-heading";
    headerEl.innerHTML = "Coding Quiz Challenge";
    questionsEl.appendChild(headerEl);

    // Add instructions text
    var instructionsEl = document.createElement("p");

    instructionsEl.className = "instructions";
    instructionsEl.innerHTML = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    questionsEl.appendChild(instructionsEl);

    // Add start button
    var startButtonEl = document.createElement("button");

    startButtonEl.className = "btn start-btn";
    startButtonEl.innerHTML = "Start Quiz";
    questionsEl.appendChild(startButtonEl);
};

timer();
startScreenEl();