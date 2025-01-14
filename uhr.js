var duration = 0;
var duration_double = 0.0;
var started = false;

var settings = {
  lecture: "Praktische Informatik 2",
  lecture_short: "PI2",
  // assignments: '5',
  semester: "SS",
  default_duration: "90",
};

function init() {
  var now = new Date();
  var year = now.getFullYear();
  // set placeholders
  document.getElementById("lecture").innerHTML = settings.lecture_short;
  // document.getElementById("assignments").innerHTML = settings.assignments;
  document.getElementById("duration").value = settings.default_duration;
  document.title = settings.lecture;

  if (settings.semester == "SS") {
    document.getElementById("semester").innerHTML = "Sommersemester " + year;
  } else if (settings.semester == "WS") {
    document.getElementById("semester").innerHTML =
      "Wintersemester " + (year - 1) + "/" + year;
  }

  // Alle Sekunde getTime neu aufrufen
  window.setInterval("getTime()", 1000);
}

function startTimer() {
  duration = document.getElementById("duration").value;
  duration_double = duration * 2;
  document.getElementById("mins").innerHTML = duration;
  window.setInterval("getTimeLeft()", 60000);
  window.setInterval("getDoubleTimeLeft()", 30000);
  started = true;
  document.getElementById("settings").style.visibility = "hidden";
}

function getTimeLeft() {
  if (started) {
    duration--;
    document.getElementById("mins").innerHTML = duration;
    // Ab 10 Minuten Stress machen
    if (duration <= 10) {
      document.getElementById("mins").style.color = "red";
    }
    if (duration <= 1) {
      document.getElementById("mins").className += "blink";
      document.getElementById("text").innerHTML = "Minute";
    }
    // Klausur ist vorbei
    if (duration <= 0) {
      document.getElementById("timeleft").innerHTML =
        "Die Bearbeitungszeit ist vorbei!";
      var stop1 = window.setInterval("getTimeLeft()", 60000);
      var stop2 = window.setInterval("getDoubleTimeLeft()", 30000);
      clearInterval(stop1);
      clearInterval(stop2);
      started = false;
    }
  }
}

function getDoubleTimeLeft() {
  if (started) {
    duration_double--;
    // if(duration_double <= 1) {
    //   var jeopardy = document.getElementById("jeopardy");
    //   jeopardy.play();
    // }
  }
}

function getTime() {
  var Jetzt = new Date();
  var Jahr = Jetzt.getYear();
  var Stunden = Jetzt.getHours();
  var Minuten = Jetzt.getMinutes();
  var Sekunden = Jetzt.getSeconds();
  // die null in 05:01:02
  var Vorstd = Stunden < 10 ? "0" : "";
  var Vormin = Minuten < 10 ? ":0" : ":";
  var Vorsek = Sekunden < 10 ? ":0" : ":";
  document.getElementById("time").innerHTML =
    Vorstd + Stunden + Vormin + Minuten + Vorsek + Sekunden;
}

// works with Firefox 115.0.2 and Chrome 115.0.5790.102
// idk if it will work with other browsers or in the future
function setToFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }
  // document.getElementById("fullscreenbutton").style.visibility = "hidden";
}
