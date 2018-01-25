
var showGame = function () {
    var element = document.getElementById("theGame");
    element.classList.remove("hidden");
    element.classList.add("show");
    document.getElementById("startGame").classList.add("hidden");
    resetBoard();
}

// keep counter of correct guesses entered, which increases every time a correct letter is guessed. 
// when this equals the number of letters in the word (ignoring space), then user wins. 
// Runs on the assumption that place names only have 1 space. Would have to modify code with regular 
// expressions for places with multiple spaces.

/* GLOBAL VARIABLES */
var choices = ["Abu Dhabi", "Agra", "Athens", "Barcelona", "Belgium", "Bangkok", "Chicago", "Dubai", "Giza", "Hong Kong",
    "Istanbul", "Jerusalem", "Kuala Lumpur", "Kuwait", "Kyoto", "Los Angeles", "London", "Lisbon", "Lyon", 
    "Mumbai", "Monteriggioni", "New York", "Oslo", "Paris", "Rome", "San Francisco", "Shanghai", "Singapore", "Stockholm", 
    "Sydney", "Tokyo"];
var wpChoices = ["ad", "ag", "at", "bc", "bg", "bk", "ch", "db", "gz", "hk", 
    "is", "js", "kl", "ku", "ky", "la", "ld", "li", "ly", 
    "mm", "mg", "ny", "os", "pa", "rm", "sf", "sh", "sp", "st", "sy", "tk"];
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
var winCounter = 0;

/* REPLACE CHAR IN STRING FUNCTION */
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

/* CHECK IF USER INPUT IS AN ALPHABET */
var isAlpha = function (str) {
    return /^[a-zA-Z]$/.test(str);
}

/* RESET BOARD TO DEFAULT STATE */
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

    // If space exists, we're only looking for the (string.length -1) 
    // number of correct guesses, as the user won't be trying to guess
    // the space.
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
    document.getElementById("wrongGuess").classList.add("hidden");
    document.getElementById("guessWord").innerText = guessWord;
    // document.getElementById("actualWord").innerText = randomWord;
    document.getElementById("guessWord").style.color = "#66c887";
    document.getElementById("guessWord").innerText = guessWord;
    document.getElementById("guessRem").style.color = "#000a17";
    document.getElementById("guessRem").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = guessedLetters;
    document.getElementById("winCounter").innerText = winCounter;

    document.addEventListener("keyup", playTheGame);
}

window.onload = function () {
    var element = document.getElementById("theGame");
    element.classList.add("hidden");
}

/* ACTUAL GAME LOGIC */
var playTheGame = function (event) {

    var userLetter = event.key;
    if (isAlpha(userLetter)) {
        var prevGuessWord = guessWord;
        userLetter = userLetter.toLowerCase();
        // console.log("User letter is: " + userLetter);

        for (var i = 0; i < randomWord.length; i++) {
            if (randomWord.charAt(i) !== " ") {
                if (randomWord.charAt(i).toLowerCase() === userLetter.toLowerCase()) {
                    // console.log("index: ", i);
                    // console.log("guessWord at i = " + i + " = " + guessWord.charAt(i).toLowerCase());
                    // console.log("randomWord at i = " + i + " = " + randomWord.charAt(i).toLowerCase());

                    guessWord = replaceAt(guessWord, i, userLetter);
                    if (guessedLetters.indexOf(userLetter) === -1) {
                        correctGuesses++;
                    }
                    // console.log("guessword: " + guessWord);
                }
            }
        }

        // console.log("prevguessword: " + prevGuessWord);
        // console.log("guessword: " + guessWord);

        // If wrong letter guessed
        if (guessWord === prevGuessWord) {
            if (guessedLetters.indexOf(userLetter) === -1) {
                remainingGuesses--;

                if (remainingGuesses < 4) {
                    document.getElementById("guessRem").style.color = "red";
                }

                document.getElementById("guessedLetters").classList.add("shakeIt");
                setTimeout(function() {
                    document.getElementById("guessedLetters").classList.remove("shakeIt");
                }, 1000);
            }
            document.getElementById("guessRem").innerText = remainingGuesses;
            wrongGuess = true;
        }

        if (guessedLetters.indexOf(userLetter) === -1) {
            guessedLetters += userLetter;
            document.getElementById("lettersGuessed").innerText = guessedLetters;
        }
        // console.log("guessword: " + guessWord);
        // console.log("correctGuesses: " + correctGuesses);
        document.getElementById("guessWord").innerText = guessWord;
    }

    /* WON GAME */
    if (correctGuesses === guessesCounter) {
        document.removeEventListener("keyup", playTheGame);
        document.getElementById("bgimage").classList.add("sharp");
        winCounter++;
        window.setTimeout(resetBoard, 4000);
    }

    // console.log("remainingGuesses: " + remainingGuesses);

    /* LOST GAME */
    if (remainingGuesses === 0) {
        document.removeEventListener("keyup", playTheGame);
        document.getElementById("wrongGuess").classList.remove("hidden");
        document.getElementById("bgimage").classList.add("sharp");
        document.getElementById("guessWord").style.color = "red";
        document.getElementById("guessWord").innerText = randomWord;
        winCounter = 0;
        window.setTimeout(resetBoard, 4000);
    }
}

