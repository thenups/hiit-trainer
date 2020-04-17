/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
var $startTimer = document.querySelector('#createWorkout');
var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#totalTimer');
var $exerciseNameDiv = document.querySelector('#exerciseName');

// userInput's about how much time they need
var workout = [
  {
    exercise : 'jumping jacks',
    time : 8
  },
  {
    exercise : 'rest',
    time : 6
  },
  {
    exercise : 'pushups',
    time : 3
  }
]

// RUN TIMER
// setupTimer(workout);

// Put starting time on clock and start 1 second countdown
function setupTimer(w) {
  updateTimer($timerDiv, w.exercises[0].time); //setup first exercise

  var fullTime = totalTime(w);
  updateTimer($totalTimerDiv, fullTime); //setup total timeout

  // Insert exercise name on screen
  $exerciseNameDiv.innerHTML = w.exercises[0].time;
  window.setTimeout(countdown, 1000, w.exercises, w.reps, fullTime); //run countdown every 1 second
}


// Stop timer if timer = 0, subtract 1 every second)
function countdown(e, r, t) {

  // Subtract 1 from most recent exercise
  for (var i = 0; i < e.length; i++) {

    // check to see if the time is more than one for that list item
    if (e[i]["time"] > 0) {

      // Update Exercise Timer
      updateTimer($timerDiv, e[i]["time"]);
      // Update Exercise Name
      $exerciseNameDiv.innerHTML = e[i]["exercise"];

      break; // break for loop

    } else if (e.length-1 == i ) { // exception handler for final exercise
      // Update Exercise Timer
      updateTimer($timerDiv, e[i]["time"]);
    }

  }

  // Update total timer
  updateTimer($totalTimerDiv, t);

  // if the total time is down to 0, stop timer
  if (t <= 0) {
    console.log("Time's up!");
    return;
  }

  // Reduce time by 1
  e[i]["time"] = e[i]["time"]-1;

  window.setTimeout(countdown, 1000, e, r, t);
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

// Go through exercise dict and deterime total time for workout
function totalTime(w) {
  console.log(w);

  var repTime = 0;

  for (var i = 0; i < w.exercises.length; i++) {
    repTime += w.exercises[i].time; // add number to totalTime
  }

  var time = repTime * w.reps;

  console.log(time);

  return time;
}

//Take in dictionary from form and put out easily readable dictionary by exezrcise
function cleanFormData(d) {
  var w = {};
  var e = [];

  // break down exercises
  for (var i = 0; i < d.length -1 ; i+=2) {
    var dict = {
      exercise : d[i].value,
      time: Number(d[i+1].value)
    }

    // add exercises to dict
    e.push(dict)
  }

  // add exercises to dictionary
  w["exercises"] = e;
  // add reps to dictionary
  w["reps"] = d[d.length-1].value;

  return w;
}

//
function startTime(e){

  var workout = cleanFormData($('form').serializeArray());

  console.log(workout);
  fullTime = totalTime(workout);
  updateTimer($totalTimerDiv, fullTime); //setup total timeout

  // 10 second countdown
  tenSeconds(workout, $timerDiv);

   //
   console.log('clicked!');
   e.preventDefault();
}

// 10 second countdown once the user hits start
function tenSeconds(w, div) {

  // count from 10 down to 1
  for(var i = 0; i < 10; i++){
    (function(i){
        setTimeout(function(){
            updateTimer(div, 10-i);
        }, 1000*i+1); // wait 1 second in between
    })(i);
  }

  window.setTimeout(setupTimer, 1000, w);
}

// Add event listeners
$startTimer.addEventListener('submit', startTime);
