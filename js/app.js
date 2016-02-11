/* **** Create Game Object to Store Values **** */
$(document).ready(function() {
	var gameObj = {};
		gameObj.storedGuesses = [];
		gameObj.guessesRemaining = 5;
		gameObj.playersGuess;
		gameObj.winningNumber;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100 + 1);
}

gameObj.winningNumber = generateWinningNumber();

// Fetch the Players Guess
function playersGuessSubmission(event){
	gameObj.playersGuess = +document.getElementById('guess').value;
	document.getElementById('guess').value = "";
	console.log("The Players Guess: " + gameObj.playersGuess);
};


// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var str = "";
	if ( gameObj.winningNumber > gameObj.playersGuess ) {
		str += "lower";
	} else {
		str += "higher";
	}
	return str;
}

// Provide feedback with direction and distance
function guessMessage(){
	var message = "";
	var distance = (Math.ceil((Math.abs(gameObj.playersGuess - gameObj.winningNumber))/10)) * 10;
	message += "<h5>Your guess is " + lowerOrHigher() + " and within " + distance + " digits of the winning number</h5>";
	console.log(message);
	return(message);
}

// Check if the Player's Guess is the winning number // add game over 
function checkGuess(){
	if ( gameObj.winningNumber ===  gameObj.playersGuess) {
		$( ".output" ).html( "<h4>You Win!</h4>" );
		$(".guesses-remaining").html("<h5>Want to play again?</h5>");
		$( "#hint-message" ).html("");
	} else {
		if ( gameObj.storedGuesses.indexOf(gameObj.playersGuess) === -1 ) {
			$(".output").html("<h4>Guess Again</h4>" + guessMessage());
			gameObj.storedGuesses.push(gameObj.playersGuess);
			gameObj.guessesRemaining--;
			if ( gameObj.guessesRemaining > 1 ) {
				$(".guesses-remaining").html("<h5>You have " + gameObj.guessesRemaining + " guesses left!</h5>");
			} else if ( gameObj.guessesRemaining === 1 ) {
				$(".guesses-remaining").html("<h5>You only have " + gameObj.guessesRemaining + " guess left!</h5>");
			} else if ( gameObj.guessesRemaining === 0 ) {
				$(".output").html("<h4>Game Over!</h4>");
				$(".guesses-remaining").html("<h5>You're all out of guesses! Want to play again?</h5>");
			}
		} else {
			$( ".output" ).html( "<h5>Submitted A Duplicate Guess</h5>" );
		}
	}
console.log("Array of Guesses: " + gameObj.storedGuesses);
console.log("Number of Guesses Remaining: " + gameObj.guessesRemaining);
}


// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	//generate hints based on number of guesses remaining
	var arrOfHints = [gameObj.winningNumber];
	while ( arrOfHints.length < gameObj.guessesRemaining*2 ) {
		var num = (Math.floor(Math.random() * 100 + 1));
		if ( arrOfHints.indexOf(num) === -1 ) {
			arrOfHints.push(num);
		}
	}
	var hintsMessage = "<h5>One of these values is the winning number: <br>" + arrOfHints.join(", ") + "</h5>";
	console.log("Hints message: " + hintsMessage);
	$( "#hint-message" ).html( hintsMessage );
}

// Allow the "Player" to Play Again

function playAgain(){
	gameObj.guessesRemaining = 5;
	gameObj.winningNumber = generateWinningNumber();
	$(".guesses-remaining").html("<h5>You have " + gameObj.guessesRemaining + " guesses to get the right number!</h5>");
	$( ".output" ).html("");
	$( "#hint-message" ).html("");

}

/* **** Event Listeners/Handlers ****  */
//Submit guess
$('#submit').on('click', 'button', function() {
	playersGuessSubmission();
	checkGuess();
	lowerOrHigher();
	$( "#hint-message" ).html("");
});
//Provide Hint
$('#hint').on('click', 'button', function(){
	provideHint();
	$("#hint-message").slideDown();
});
//Play Again
$('#play-again').on('click', 'button', playAgain);

});