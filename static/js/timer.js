/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
var $startTimer = document.querySelector('#createWorkout');
var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#totalTimer');
var $exerciseNameDiv = document.querySelector('#exerciseName');


// Put starting time on clock and start 1 second countdown
function setupTimer(e, r, t) {
  //setup first exercise time
  updateTimer($timerDiv, e[0].time);
  // Insert exercise name on screen
  $exerciseNameDiv.innerHTML = e[0].exercise;

  //setup total timeout
  updateTimer($totalTimerDiv, t);

  // Start running countdown in 1 second
  window.setTimeout(countdown, 1000, e, r, t);
}


// Stop timer if timer = 0, subtract 1 every second)
function countdown(e, r, t) {
  // a = full exercise listener
  // e = changeable exercise listener
  // r = Reps
  // t = total time for workout


  // For ever rep
  // For every exercise/rest in list

  console.log(e);
  console.log(r);
  console.log(t);


  // for (let n = 0; n < r; n++) {
  //   let exerciseDict = e;
  //
  //   // check to see if the time is more than one for that list item
  //   for (var i = 0; i < exerciseDict.length; i++) {
  //
  //     if (exerciseDict[i].time > 0) {
  //       let newTimes = timeChange(i, exerciseDict, t);
  //       break; // break for loop
  //
  //     } else if (exerciseDict.length-1 === 1) { // exception handler for final exercise
  //       // Update Exercise Timer
  //       updateTimer($timerDiv, exerciseDict[i]["time"]);
  //     }
  //
  //   }
  //
  // }
  // // if the total time is down to 0, stop timer
  // if (t <= 0) {
  //   console.log("Time's up!");
  //   return;
  // }
  //
  // window.setTimeout(countdown, 1000, e, r, t);
}

function timeChange(i, e, t) {
  let timeMinusOne = {
    et: e[i].time-1,
    t: t-=1
  }

  // Update Exercise Timer
  updateTimer($timerDiv, timeMinusOne.et);
  // Update Exercise Name
  $exerciseNameDiv.innerHTML = e[i].exercise;
  // Update total Timer
  updateTimer($totalTimerDiv, e.time);

  return timeMinusOne;
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
      window.setTimeout(setupTimer, 1000, w.exercises, w.reps, totalTime(w));
    } else { // otherwise continue checking
      window.setTimeout(endCd, 1000, w);
    }
}

// Add event listeners
$startTimer.addEventListener('submit', startCd);
