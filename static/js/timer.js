

var seconds = 200
//
var measuredTime = new Date(null);
measuredTime.setSeconds(seconds); // specify value of SECONDS
var MHSTime = measuredTime.toISOString().substr(11, 8);
console.log(MHSTime)

var x = setInterval(function() {

})
