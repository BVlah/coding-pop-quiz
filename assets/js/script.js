// Questions
var questions = [
    {
        question: "What pirate is most likely to use 3rd party APIs?",
        answers: [
            "1. Jack Sparrow",
            "2. Bootstrap Bill Turner",
            "3. Blackbeard",
            "4. Long John Silver"
        ],
        correctAnswer: "1"
    },
    {
        question: "Jesus Christ it's ______ Bourne.",
        answers: [
            "1. James",
            "2. Jackson",
            "3. JSON",
            "4. Jason"
        ],
        correctAnswer: "3"
    },
    {
        question: "What is the second film in a series of movies called?",
        answers: [
            "1. Sequel",
            "2. Part 2: Electic Boogaloo",
            "3. A Box Office Bomb",
            "4. SQL"
        ],
        correctAnswer: "0"
    },
    {
        question: "Question",
        answers: [
            "1. 2",
            "2. 3",
            "3. 4",
            "4. 1"
        ],
        correctAnswer: "1"
    },
    {
        question: "What grade am I likely to get on this challenge?",
        answers: [
            "1. A+",
            "2. B",
            "3. C++",
            "4. F-"
        ],
        correctAnswer: "2"
    }
];

// Global Variables
var timerEl = document.getElementById('timer');
var questionsEl = document.getElementById('questions');
var headerEl = document.getElementById('question');
var instructionsEl = document.getElementById('instructions');
var correctEl = document.getElementById('correct');
var resultBoxEl = document.getElementById('result');
var formEl = document.getElementById('score-form');
var highScoresEl = document.getElementById('high-scores');

var questionIdCounter = 0;
var playerScore = "";
var timeLeft = 75;
var savedScores = [];


// Load Starting Screen
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

// Start Timer
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

// Button Handler
var buttonHandler = function(event) {
    event.preventDefault();
    // Start Button
    if (event.target.matches(".start-btn")) {

        // clean page
        questionsEl.removeChild(questionsEl.lastChild);
        instructionsEl.innerHTML = "";
        
        // Start Quiz
        timer();
        addQuestion();
    }

    // Answer Choices
    else if (event.target.matches(".answer-button")) {
        var answerId = event.target.getAttribute("data-task-id");
        
        // Determine if Correct or Incorrect answer choice
        if (answerId === questions[questionIdCounter].correctAnswer) {
            correctEl.innerHTML = "Correct!"
        }
        else {
            correctEl.innerHTML = "Wrong!"

            timeLeft -= 10;
        };

        // Move to Next Question
        questionIdCounter++;
        addQuestion();
    }

    // Score Submission Button
    else if (event.target.matches(".score-btn")) {
        saveScore();
    }
};

// Generate Questions
var addQuestion = function() {
    if (questionIdCounter < questions.length) {
        // Update Page Text
        headerEl.className = "question-heading";
        headerEl.innerHTML = questions[questionIdCounter].question;
        
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

// Submit Score Page Setup
var submitScore = function () {

    // Stop Timer and Set Score
    playerScore = timeLeft;
    timerEl.textContent = playerScore;
    clearInterval(timeInterval);

    // Remove Last Buttons and Correct/Incorrect Text
    for (var i=0; i < questions[questions.length-1].answers.length; i++) {
        var removeButtonEl = document.querySelector(".answer-choice[data-id='" + i + "']");
        removeButtonEl.innerHTML = "";
    };

    // Update Page Text
    headerEl.innerHTML = "All Done"
    instructionsEl.className = "instructions";
    instructionsEl.innerHTML = "Your final score is " + playerScore + "!";
    correctEl.innerHTML = ""

    // Create Form
    formTextEl = document.getElementById('form-text');
    formInitialsEl = document.getElementById('form-initials');
    formSubmitEl = document.getElementById('form-submit');

    formTextEl.innerHTML = "<p class='form-text'>Type Initials: </p>"
    formInitialsEl.innerHTML = "<input type='text' name='initials' placeholder='Enter Initials' />"
    formSubmitEl.innerHTML = "<button class='btn score-btn' id='submit-score' type='submit'>Submit</button>"
};

// Save Scores to Local Storage
var saveScore = function() {
    var initialsInput = document.querySelector("input[name='initials']").value;
    savedScore = {Initials: initialsInput, Score: playerScore};
    savedScores.push(savedScore);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));

    highScores();
};

// Prevent default browser action on High Scores Button click
var highScoreButton = function(event) {
    event.preventDefault();
    highScores();
}
// Pull scores into and create High Scores table
var highScores = function() {
    //Clean up Page
    formEl.innerHTML="";
    headerEl.className = "center question-heading";
    headerEl.innerHTML = "High Scores";
    instructionsEl.innerHTML = "";
    timeLeft = "";

    var scoreListEl = document.createElement("ol");
    questionsEl.appendChild(scoreListEl);

    // Pull Scores from Local Server
    var pulledScores = localStorage.getItem("savedScores");
    if (!pulledScores) {
        return false;
    }
    pulledScores = JSON.parse(pulledScores);

    // sort scores descending
    pulledScores.sort(function(a,b) {
        return b.Score - a.Score
    });


    //Parse Scores
    for (var i=0; i < pulledScores.length; i++) {
        var scoresEl = document.createElement("li");
        scoresEl.setAttribute("class","high-scores");
        scoresEl.innerHTML = pulledScores[i].Initials + " - " + pulledScores[i].Score;
        scoreListEl.appendChild(scoresEl);
    }

}

// Default Function Calls and Event Listeners
questionsEl.addEventListener("click", buttonHandler);
highScoresEl.addEventListener("click", highScoreButton);
startScreenEl();