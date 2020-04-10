/* http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
window.setTimeout(countdown, 1000); //

var timerDiv = document.querySelector('#timer');

var userInput = 30;
updateTimer();

function createTimer() {
  updateTimer()
  window.setTimeout(countdown, 1000);
}

function countdown() {

  if (userInput <= 0) {
    console.log("Time's up!")
    return;
  }

  userInput -= 1;
  updateTimer()

  window.setTimeout(countdown, 1000);
}

function updateTimer() {
  var seconds = userInput;
  console.log(seconds);

  var hours = Math.floor(seconds / 3600);
  seconds -= hours * (3600);

  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * (60);


  var timeStr = leadingZero(hours) + ":" + leadingZero(minutes) + ":" + leadingZero(seconds)


  timerDiv.innerHTML = timeStr;
}


function leadingZero(time) {

  return (time < 10) ? "0" + time : + time;

}
