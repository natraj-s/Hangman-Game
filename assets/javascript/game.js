// window.onload = function() {
//     var element = document.getElementById("theGame");
//     element.classList.add("hidden");
// }

// var showGame = function() {
//     var element = document.getElementById("theGame");
//     element.classList.remove("hidden");
//     element.classList.add("show");
// }

var computerChoices = ["New York", "San Francisco", "Dubai"];
var wpChoices = ["newyork", "sanfrancisco", "dubai"];
var randomPos = Math.floor(Math.random() * computerChoices.length);
var randomWord = computerChoices[randomPos];
var randomWP = wpChoices[randomPos];

window.onload = function () {
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var makeDashes = function (length) {
        var word = "";

        for (var i = 0; i < length; i++) {
            word += "-";
        }

        return word;
    }    
    
    var guessWord = makeDashes(randomWord.length);
    document.getElementById("bgimage").style.backgroundImage = "url(assets/images/" + randomWP + ".jpg)";
    document.getElementById("guessWord").innerText = guessWord;
    document.getElementById("actualWord").innerText = randomWord;

    document.addEventListener("keyup", playTheGame);
}

var playTheGame = function(event) {
    var userLetter = event.key;

    console.log("The userLetter is: " + userLetter + " that div contains: " + document.getElementById("guessWord").innerText);
}

