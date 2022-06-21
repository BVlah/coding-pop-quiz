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
        answers: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        correctAnswer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        correctAnswer: 3
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        correctAnswer: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ],
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


var clearQuiz = function() {
    // Remove Starting Screen
    var removeStart = document.getElementById('questions');
    while (removeStart.firstChild) {
        removeStart.removeChild(removeStart.firstChild);
    };
};

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
            
            answersEl.className = "answer-choice";
            answersEl.setAttribute("data-task-id", i);
            answersEl.innerHTML = "<button class='btn answer-button'>" + questions[questionIdCounter].answers[i] + "</button>";
            answerContainerEl.appendChild(answersEl);
        }
    };
};

var quizButtonHandler = function(event) {
    if (event.target.matches(".start-btn")) {
        timer();
        clearQuiz();
        addQuestion();
    }
    else if (event.target.matches(".answer-button")) {
        questionIdCounter++;
        clearQuiz();
        addQuestion();
    };
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
    startButtonEl.addEventListener("click", addQuestion);
    startButtonEl.addEventListener("click", timer);
};

questionsEl.addEventListener("click", quizButtonHandler);
startScreenEl();