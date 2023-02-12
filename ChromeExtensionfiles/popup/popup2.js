const stopButton = document.getElementById("stopButton");
const goalHour = document.getElementById("goalHour");
const goalMin = document.getElementById("goalMin");
goalHour.innerHTML = localStorage.getItem('hour');
goalMin.innerHTML = localStorage.getItem('min');
// console.log(localStorage.getItem('hour')) ///TO ACCESS HOURS INPUTTED IN PREVIOUS PAGE
// console.log(localStorage.getItem('min'))  ///SAME HERE BUT WITH MINUTES

/*
TO-DO:
Add timer based on 'duration' input
Call the google doc API at set interval and compare
If no progress, show popup/ alert sound (twilio api if we have time)
Once finished, go to final page
*/

const doneButton = document. getElementById("doneButton");
doneButton.onclick = function(){
    chrome.runtime.sendMessage({ event: 'onStop', 'hour': 'NA', 'min': 'NA'}) //stopping process of fetching googledoc data from background.js
    window.location.href = "popup3.html"; //opening new window
}

stopButton.onclick = function(){
    chrome.runtime.sendMessage({ event: 'onStop', 'hour': 'NA', 'min': 'NA'}) //stopping process of fetching googledoc data from background.js
}

var totalSeconds = 0;
var minutesElement = document.getElementById("minutes");
var secondsElement = document.getElementById("seconds");

setInterval(function() {
  totalSeconds++;

  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  minutesElement.textContent = (minutes < 10 ? "0" : "") + minutes;
  secondsElement.textContent = (seconds < 10 ? "0" : "") + seconds;
}, 1000);
