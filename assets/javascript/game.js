// window.onload = function() {
//     var element = document.getElementById("theGame");
//     element.classList.add("hidden");
// }

// var showGame = function() {
//     var element = document.getElementById("theGame");
//     element.classList.remove("hidden");
//     element.classList.add("show");
// }

// keep counter of correct guesses entered, which increases every time a correct letter is guessed. 
// when this equals the number of letters in the word (ignoring space), then user wins. 
// Runs on the assumption that place names only have 1 space. Would have to modify code with regular 
// expressions for places with multiple spaces.

var choices = ["New York", "San Francisco", "Dubai"];
var wpChoices = ["newyork", "sanfrancisco", "dubai"];
var randomPos = 0;
var randomWord = "";
var randomWP = "";
var guessesCounter = 0;
var correctGuesses = 0;
var remainingGuesses = 7;
var guessedLetters = "";
var guessWord = "";
var wrongGuess = false;
var indexOfSpace = 0;


var replaceAt = function (str, index, char) {
    // substr returns the characters in a string beginning at the
    // specified location through the specificed number of characters

    // In this function's case, str.substr(0, index) returns the characters
    // in str from the beginning upto but not including the index specificed
    // wherein it concatenates the passed in character and then concatenates
    // it with the rest of the string beginning from the character's index as
    // returned by str.substr(index + 1). 
    // for example: in a string temp = "abcdef", temp.substr(1) will return
    // "bcdef".
    return str.substr(0, index) + char + str.substr(index + 1);
}

var isAlpha = function (str) {
    return /^[a-zA-Z]$/.test(str);
}

var resetBoard = function () {
    randomPos = Math.floor(Math.random() * choices.length);
    randomWord = choices[randomPos];
    randomWP = wpChoices[randomPos];
    guessesCounter = 0;
    correctGuesses = 0;
    remainingGuesses = 7;
    guessedLetters = "";
    guessWord = "";
    wrongGuess = false;
    indexOfSpace = randomWord.indexOf(" ");

    if (indexOfSpace != -1) {
        guessesCounter = randomWord.length - 1;
    }
    else {
        guessesCounter = randomWord.length;
    }

    var makeDashes = function (length) {
        var word = "";

        for (var i = 0; i < length; i++) {
            word += "-";
        }

        return word;
    }

    guessWord = makeDashes(randomWord.length);
    if (indexOfSpace != -1) {
        guessWord = replaceAt(guessWord, indexOfSpace, " ");
    }

    document.getElementById("bgimage").style.backgroundImage = "url(assets/images/" + randomWP + ".jpg)";
    document.getElementById("bgimage").classList.remove("sharp");
    document.getElementById("bgimage").classList.add("blurred");
    document.getElementById("guessWord").innerText = guessWord;
    document.getElementById("actualWord").innerText = randomWord;
    document.getElementById("guessWord").innerText = guessWord;
    document.getElementById("lettersGuessed").innerText = guessedLetters;
}

window.onload = function () {
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    resetBoard();

    document.addEventListener("keyup", playTheGame);
}

var playTheGame = function (event) {
    var userLetter = event.key;
    if (isAlpha(userLetter)) {
        if (wrongGuess === true) {
            console.log("came here");
            document.getElementById("guessedLetters").classList.remove("shakeIt");
            wrongGuess = false;
        }

        var prevGuessWord = guessWord;
        userLetter = userLetter.toLowerCase();
        console.log("User letter is: " + userLetter);

        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord.charAt(i) !== " ") {
                if (randomWord.charAt(i).toLowerCase() === userLetter.toLowerCase()) {
                    console.log("index: ", i);
                    console.log("guessWord at i = " + i + " = " + guessWord.charAt(i).toLowerCase());
                    console.log("randomWord at i = " + i + " = " + randomWord.charAt(i).toLowerCase());

                    guessWord = replaceAt(guessWord, i, userLetter);
                    if (guessedLetters.indexOf(userLetter) === -1) {
                        correctGuesses++;
                    }
                    console.log("guessword: " + guessWord);
                }
            }
            console.log("i status: ", i);
        }

        console.log("prevguessword: " + prevGuessWord);
        console.log("guessword: " + guessWord);

        // If wrong letter guessed
        if (guessWord === prevGuessWord) {
            if (guessedLetters.indexOf(userLetter) === -1) {
                remainingGuesses--;
            }
            document.getElementById("guessedLetters").classList.add("shakeIt");
            document.getElementById("guessRem").innerText = remainingGuesses;
            wrongGuess = true;
        }

        if (guessedLetters.indexOf(userLetter) === -1) {
            guessedLetters += userLetter;
            document.getElementById("lettersGuessed").innerText = guessedLetters;
        }
        console.log("guessword: " + guessWord);
        console.log("correctGuesses: " + correctGuesses);
        document.getElementById("guessWord").innerText = guessWord;
    }

    if (correctGuesses === guessesCounter) {
        document.getElementById("bgimage").classList.add("sharp");

        window.setTimeout(resetBoard, 3000);
    }
}

