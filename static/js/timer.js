/* Timer based on: http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
var $startTimer = document.querySelector('#createWorkout');
var $timerDiv = document.querySelector('#timer');
var $totalTimerDiv = document.querySelector('#totalTimer');
var $exerciseNameDiv = document.querySelector('#exerciseName');


// Countdown 10 seconds before beginning actual workout
function startCountdown(e) {
  // Get all form data
  const workout = cleanFormData($('form').serializeArray());

  // Do 10 second countdown before exercise
  let cntdwn = {
    total: {
      time: 3,
      div: $timerDiv,
      totalTime: totalTime(workout)
    }
  }

  // Start countdown
  countdown(cntdwn, workout.reps, workout.exercises);

  e.preventDefault();
}

// Setup Timer with actual workout
function setupTimer(cd, r, e) {
  // first exercise in array
  let n = 0;

  // Create dict for first exercise
  let firstExercise = {
    total: {
      time: cd.total.totalTime,
      div: $totalTimerDiv
    },
    exercise: {
      time: e[n].time,
      name: e[n].exercise,
      div: $timerDiv
    }
  }

  // Start countdown for first exercise
  countdown(firstExercise, r, e, n);
}

// Countdown given a time
function countdown(etDict, r, e, n) {

  // Look at dict and countdown 1 second per item
  for (let [key, value] of Object.entries(etDict)) {
    updateTimer(value.div, value.time);
    value.time--;
  }

  // If workout is over
  if (r==0) {
    workoutComplete();

  // What to do with initial countdown to workout
  } else if (!('exercise' in etDict)) {
    if (etDict.total.time > 0) {
        window.setTimeout(countdown, 1000, etDict, r, e);
    } else {
      window.setTimeout(setupTimer, 1000, etDict, r, e);
    }

  // What to do if the exercise hasn't finished
  } else if (etDict.exercise.time > 0) {
    // Write the correct exercise name
    $exerciseNameDiv.innerHTML = etDict.exercise.name;
    // continue countdown
    window.setTimeout(countdown, 1000, etDict, r, e, n);

  // What to do if exercise is over
  } else {
    console.log('r = ' + r);
    window.setTimeout(nextExercise, 1000, etDict, r, e, n);
  }

}

// Move to the next exercise for the countdown
function nextExercise(etDict, r, e, n) {
  // increase exercise number
  n++;

  // if n is in e, then return the next exercise
  if (n < e.length) {
    etDict = updateTimeDict(etDict, n, e);

  // handle end of workout
  }else {
    n = 0;
    etDict = updateTimeDict(etDict, n, e);
    r--;
  }

  // Start countdown for next exercise
  countdown(etDict, r, e, n);
}

// Update time and name for next exercise
function updateTimeDict(etDict, n, e) {
  etDict.exercise.time = e[n].time;
  etDict.exercise.name = e[n].exercise;

  return etDict;
}

// What to do when workout completes
function workoutComplete() {
  console.log('workout DONE');
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


// Add event listeners
$startTimer.addEventListener('submit', startCountdown);
