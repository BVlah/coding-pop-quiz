// Timer Stuff
    // 75 seconds to start
    // When incorrect subtract 15 seconds
    // Final Score is time remaining

var timerEl = document.getElementById('timer');
var questionsEl = document.getElementById('questions');
var headerEl = document.getElementById('question');
var instructionsEl = document.getElementById('instructions');
var correctEl = document.getElementById('correct');
var formEl = document.getElementById('score-form');

var questionIdCounter = 0;
var timeLeft = 75;

var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. integers"
        ],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        correctAnswer: "2"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ],
        correctAnswer: "3"
    }
];

var submitScore = function () {

    // Stop Timer and Set Score
    var score = timeLeft;
    timerEl.textContent = score;
    clearInterval(timeInterval);

    // Remove Last Buttons and Correct/Incorrect Text
    for (var i=0; i < questions[questions.length-1].answers.length; i++) {
        var removeButtonEl = document.querySelector(".answer-choice[data-id='" + i + "']");
        removeButtonEl.innerHTML = "";
    };

    // Update Page Text
    headerEl.innerHTML = "All Done"
    instructionsEl.className = "instructions";
    instructionsEl.innerHTML = "Your final score is " + score;

    // Create Form
    formEl.innerHTML ="<p class='instructions'>Enter Initials: </p><input type='text' name='player-initials' />"
    console.log(formEl);
};


// Timer
function timer() {    
    timeInterval = setInterval(function (){
        if (timeLeft >0) {
            timerEl.textContent = timeLeft
            timeLeft--;
        }
        else {
            timerEl.textContent = 0;
            clearInterval(timeInterval);

            submitScore();
        };
    }, 1000);
};

// Question Control
var addQuestion = function() {
    if (questionIdCounter < questions.length) {
        // Update Page Text
        headerEl.className = "question-heading";
        headerEl.innerHTML = questions[questionIdCounter].question;
        // questionsEl.appendChild(headerEl);

        instructionsEl.innerHTML = "";
        
        // Create Answer Choices
        for (var i=0; i < questions[questionIdCounter].answers.length; i++) {
            var answersEl = document.querySelector(".answer-choice[data-id='" + i + "']");
            answersEl.innerHTML = "<button class='btn answer-button' data-task-id=" + i +">" + questions[questionIdCounter].answers[i] + "</button>";
        };
    }
    else {
        submitScore();
    }
};

var quizButtonHandler = function(event) {
    if (event.target.matches(".start-btn")) {
        // remove start button
        questionsEl.removeChild(questionsEl.lastChild);
        
        // Start Quiz
        timer();
        addQuestion();
    }
    else if (event.target.matches(".answer-button")) {

        var answerId = event.target.getAttribute("data-task-id");
        
        // Determine if Correct or Incorrect answer choice
        if (answerId === questions[questionIdCounter].correctAnswer) {
            //
            correctEl.innerHTML = "Correct!"

            var myTimer = setInterval(function (){
                correctEl.innerHTML = ""
            }, 2000);
        }
        else {
            correctEl.innerHTML = "Wrong!"

            var myTimer = setInterval(function (){
                correctEl.innerHTML = ""
            }, 2000);

            timeLeft -= 10;
        };

        // Move to Next Question
        questionIdCounter++;
        addQuestion();
    };
};

var startScreenEl = function() {
    // Update header
    headerEl.className = "center question-heading";
    headerEl.innerHTML = "Coding Quiz Challenge";

    // Update Instructions
    instructionsEl.className = "center instructions";
    instructionsEl.innerHTML = "Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

    // Add start button
    var startButtonEl = document.createElement("button");

    startButtonEl.className = "btn start-btn";
    startButtonEl.setAttribute("id","start-button");
    startButtonEl.innerHTML = "Start Quiz";
    questionsEl.appendChild(startButtonEl);
};

questionsEl.addEventListener("click", quizButtonHandler);
// formEl.addEventListener("submit", recordHighScore);
startScreenEl();