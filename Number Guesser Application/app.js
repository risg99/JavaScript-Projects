// Rules:
// Players must guess a number between a min and max 
// Player gets a certain amount of guesses
// Notify the player of remaining number of guesses
// Notify the player of the correct answer if looses
// Let player choose to play again

// Game values
let min = 1,
    max = 20,
    winningNumber = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Vars
const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for play-again
gameWrapper.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('play-again')) {
        window.location.reload();
    }
});

// Listen for guess-btn
guessBtn.addEventListener('click', function () {
    let guessVal = parseInt(guessInput.value);

    // Validate
    if (isNaN(guessVal) || guessVal < min || guessVal > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    if (guessVal === winningNumber) {
        // Game over : won
        gameOver(true, `${winningNumber} is correct. Congrats, you win!`);
    } else {
        // Subtract one from guesses, since wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over : lost
            gameOver(false, `Game Over. Oops, you lost. The correct number was ${winningNumber}`);

        } else {
            // Game continues : answer wrong
            // Change border color
            guessInput.style.borderColor = 'red';

            // Display winning message
            setMessage(`${guessVal} is not correct. You have ${guessesLeft} guesses left.`, 'red');
        }

    }
});

// Game over
function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable the input
    guessInput.disabled = true;

    // Change border color
    guessInput.style.borderColor = color;

    // Display winning message
    setMessage(msg, color);

    // Play again
    guessBtn.value = 'Click to play again';
    guessBtn.className += 'play-again';

}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Get random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}