/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
var $startTimer = document.querySelector('#createWorkout');
var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#totalTimer');
var $exerciseNameDiv = document.querySelector('#exerciseName');


// Put starting time on clock and start 1 second countdown
function setupTimer(e, r, t) {
  updateTimer($timerDiv, e[0].time); //setup first exercise

  updateTimer($totalTimerDiv, t); //setup total timeout

  // Insert exercise name on screen
  $exerciseNameDiv.innerHTML = e[0].exercise;
  window.setTimeout(countdown, 1000, e, r, t); //run countdown every 1 second
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
  console.log(e[i]["time"]);
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

  var repTime = 0;

  for (let i = 0; i < w.exercises.length; i++) {
    repTime += w.exercises[i].time; // add number to totalTime
  }

  var time = repTime * w.reps;

  return time;
}

//Take in dictionary from form and put out easily readable dictionary by exezrcise
function cleanFormData(d) {
  var w = {};
  var e = [];

  // break down exercises
  for (let i = 0; i < d.length -1 ; i+=2) {
    let dict = {
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

// Start countdown to workout
function startCd(e){

  // Get all form data
  const workout = cleanFormData($('form').serializeArray());

  // Calculate the total workout time and filli n appropriate field
  updateTimer($totalTimerDiv, totalTime(workout)); //setup total timeout

  // 10 second countdown
  tenSeconds(workout, $timerDiv);

  e.preventDefault();
}

// 10 second countdown once the user hits start
function tenSeconds(w, div) {
  var workoutCd = 5; // countdown amount
  // count from countdown amount down to 1
  for(let i = 0; i < workoutCd; i++){
    cdDelay(workoutCd, i, div);
  }

  // Setup the actual workout timer
  endCd(w);
}

// Update timer ever 1 second of the countdown
function cdDelay(l, i, div){
  setTimeout(function(){
      updateTimer(div, l-i);
  }, 1000*i+1);
}

// See if the countdown has ended!
function endCd(w){
  // Setup timer if counter is down to 1 second
  if ($timerDiv.innerHTML === '00:00:01') {
      console.log('time to start timer!');
      window.setTimeout(setupTimer, 1000, w.exercises, w.reps, totalTime(w));
    } else {
      window.setTimeout(endCd, 1000, w);
    }
}

// Add event listeners
$startTimer.addEventListener('submit', startCd);
