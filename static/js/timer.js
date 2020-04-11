/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */

var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#timer'); //selected div to put the timer in

// userInput's about how much time they need
var details = [
  {
    exercise : 'something1',
    time : 10
  },
  {
    exercise : 'something2',
    time : 25
  },
  {
    exercise : 'rest',
    time : 5
  }
]

loadTimers(details);

function loadTimers(workout) {
  var $timerDiv = document.querySelector('#timer');
  var $totalTimerDiv = document.querySelector('#totalTimer');
  var $exerciseNameDiv = document.querySelector('#exerciseName');

  nextExercise(workout, $timerDiv);

  setupTimer($totalTimerDiv, findWorkoutTime(workout));

}

function nextExercise(workout, div){
  setupTimer($timerDiv, workout[0]["time"]);

  for (var i = 1; i < workout.length; i++) {
    console.log(i);
    var exerciseTime = workout[i]["time"];
    setInterval(function(){setupTimer($timerDiv, exerciseTime);}, 999*exerciseTime);
  }
}

// Go through exercise dict and deterime total time for workout
function findWorkoutTime(exercises) {
  var totalTime = 0;

  for (var i = 0; i < exercises.length; i++) {
    totalTime += exercises[i]["time"]; // add number to totalTime
  }

  return totalTime;
}

// Put starting time on clock and start 1 second countdown
function setupTimer(div, t) {
  updateTimer(div, t);
  window.setTimeout(countdown, 1000, div, t); //run countdown every 1 second
}

// Stop timer if timer = 0, subtract 1 every second)
function countdown(div, t) {

  if (t <= 1) {
    console.log("Time's up!")
    return;
  }

  t -= 1;
  updateTimer(div, t)

  window.setTimeout(countdown, 1000, div, t);
}

// Figure out minutes and seconds to write out clock
function updateTimer(div, t) {
  var seconds = t;
  var hours = Math.floor(seconds / 3600);
  seconds -= hours * (3600);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * (60);

  var timeStr = leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds)

  div.innerHTML = timeStr;
}

// Add leading zero to mm:ss if missing digit
function leadingZero(time) {
  return (time < 10) ? "0" + time : + time;
}
