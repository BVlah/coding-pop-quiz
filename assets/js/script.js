// 5 questions
// 75 seconds to start
// When incorrect subtract 15 seconds
// Final Score is time remaining

var timerEl = document.getElementById('timer');

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
        }
    }, 1000);
}


timer();