// Timer Stuff
    // 75 seconds to start
    // When incorrect subtract 15 seconds
    // Final Score is time remaining

var timerEl = document.getElementById('timer');
var questionsEl = document.getElementById('questions');
var correctEl = document.getElementById('correct');
var questionIdCounter = 0;
var timeLeft = "";
var questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. integers"
        ],
        correctAnswer: 2
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: {
            0: "1. quotes",
            1: "2. curly brackets",
            2: "3. parenthesis",
            3: "4. square brackets"
        },
        correctAnswer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: {
            0: "1. numbers and strings",
            1: "2. other arrays",
            2: "3. booleans",
            3: "4. all of the above"
        },
        correctAnswer: 3
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: {
            0: "1. commas",
            1: "2. curly brackets",
            2: "3. quotes",
            3: "4. parenthesis"
        },
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            0: "1. JavaScript",
            1: "2. terminal/bash",
            2: "3. for loops",
            3: "4. console.log"
        },
        correctAnswer: 3
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

var addQuestion = function() {
    if (questionIdCounter < questions.length) {
        var questionEl = document.createElement("h2");

        questionEl.className = "question-heading";
        questionEl.innerHTML = questions[questionIdCounter].question;
        questionsEl.appendChild(questionEl);

        // Create Answer Choices
        var answerContainerEl = document.createElement("ul");

        answerContainerEl.className = "answer-container";
        questionsEl.appendChild(answerContainerEl);

        for (var i=0; i < questions[questionIdCounter].answers.length; i++) {
            var answersEl = document.createElement("li");
            console.log(answersEl);

            answersEl.className = "answer-choice";
            answersEl.setAttribute("data-task-id", i);
            answersEl.innerHTML = "<button class='btn answer-button'>" + questions[questionIdCounter].answers[i] + "</button>";
            answerContainerEl.appendChild(answersEl);
        }
    }
}

var clearQuiz = function() {
    // Remove Starting Screen
    var removeStart = document.getElementById('questions');
    while (removeStart.firstChild) {
        removeStart.removeChild(removeStart.firstChild);
    };

    // Add Question
    addQuestion();
};

var startScreenEl = function() {
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
    startButtonEl.setAttribute("id","start-button");
    startButtonEl.innerHTML = "Start Quiz";
    questionsEl.appendChild(startButtonEl);

    // Start the Quiz
    var startButtonEl = document.getElementById('start-button');
    startButtonEl.addEventListener("click", clearQuiz);
    startButtonEl.addEventListener("click", timer);
};

startScreenEl();