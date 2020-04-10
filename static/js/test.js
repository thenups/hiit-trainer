/* http://forum.codecall.net/topic/51639-how-to-create-a-countdown-timer-in-javascript/ */
window.setTimeout(Tick, 1000); //

var timerDiv = document.querySelector('#timer');
console.log("timer: ");
console.log(timerDiv);

var TotalSeconds = 30;
UpdateTimer();

function CreateTimer() {
  UpdateTimer()
  window.setTimeout(Tick, 1000);
}

function Tick() {
  console.log("this is 1 second")

  if (TotalSeconds <= 0) {
    alert("Time's up!")
    return;
  }

  TotalSeconds -= 1;
  UpdateTimer()

  window.setTimeout(Tick, 1000);
}

function UpdateTimer() {
  var Seconds = TotalSeconds;
  console.log(Seconds);

  var Days = Math.floor(Seconds / 86400);
  Seconds -= Days * 86400;

  var Hours = Math.floor(Seconds / 3600);
  Seconds -= Hours * (3600);

  var Minutes = Math.floor(Seconds / 60);
  Seconds -= Minutes * (60);


  var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds)


  timerDiv.innerHTML = TimeStr;
}


function LeadingZero(Time) {

  return (Time < 10) ? "0" + Time : + Time;

}
