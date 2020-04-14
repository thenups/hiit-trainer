/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */

var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#totalTimer');
var $exerciseNameDiv = document.querySelector('#exerciseName');

// userInput's about how much time they need
var workout = [
  {
    exercise : 'something1',
    time : 8
  },
  {
    exercise : 'something2',
    time : 6
  },
  {
    exercise : 'rest',
    time : 3
  }
]

setupTimer(workout);


// Go through exercise dict and deterime total time for workout
function totalTime(exercises) {
  var totalTime = 0;

  for (var i = 0; i < exercises.length; i++) {
    totalTime += exercises[i]["time"]; // add number to totalTime
  }

  return totalTime;
}

// Put starting time on clock and start 1 second countdown
function setupTimer(w) {
  updateTimer($timerDiv, w[0]["time"]); //setup first exercise
  updateTimer($totalTimerDiv, totalTime(w)); //setup total timeout

  // Insert exercise name on screen
  $exerciseNameDiv.innerHTML = w[0]["exercise"];
  window.setTimeout(countdown, 1000, w); //run countdown every 1 second
}

// Stop timer if timer = 0, subtract 1 every second)
function countdown(w) {

  // Subtract 1 from most recent exercise
  for (var i = 0; i < w.length; i++) {
    console.log('-------------');

    if (w[i]["time"] > 0) { // check to see if the time is more than one for that list item
      w[i]["time"] = w[i]["time"]-1;

      // Update Exercise Timer
      updateTimer($timerDiv, w[i]["time"]);
      // Update Exercise Name
      $exerciseNameDiv.innerHTML = w[i]["exercise"];


      break;
    }

  }

  // Update total timer
  updateTimer($totalTimerDiv, totalTime(w));

  console.log(totalTime(w));

  if (totalTime(w) <= 0) {
    console.log("Time's up!");
    return;
  }

  window.setTimeout(countdown, 1000, w);
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