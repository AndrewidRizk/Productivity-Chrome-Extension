const hour = document.getElementById("hour");
const min = document.getElementById("min");
const startButton = document.getElementById("startButton");

startButton.onclick = function(){
    localStorage.setItem('hour', String(hour.value)); //storing time input into chrome browser local storage
    localStorage.setItem('min', String(min.value));
    chrome.runtime.sendMessage({ event: 'onStart', 'hour': hour.value, 'min':min.value}) //send duration to background.js
    window.location.href = "popup2.html"; //opening new window
}

///TO-DO: ADD AUTHENTICATION TO SEE IF FIELD IS EMPTY


