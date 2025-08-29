const countries = [
    { name: "France", flag: "https://flagcdn.com/w320/fr.png" },
    { name: "Germany", flag: "https://flagcdn.com/w320/de.png" },
    { name: "Japan", flag: "https://flagcdn.com/w320/jp.png" },
    { name: "Brazil", flag: "https://flagcdn.com/w320/br.png" },
    { name: "India", flag: "https://flagcdn.com/w320/in.png" },
    { name: "Canada", flag: "https://flagcdn.com/w320/ca.png" },
    { name: "Australia", flag: "https://flagcdn.com/w320/au.png" },
    { name: "China", flag: "https://flagcdn.com/w320/cn.png" },
    { name: "Mexico", flag: "https://flagcdn.com/w320/mx.png" },
    { name: "Italy", flag: "https://flagcdn.com/w320/it.png" },
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledCountries = [];

const flagImage = document.getElementById('flag-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score-display');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    shuffledCountries = shuffleArray([...countries]);
    updateScore();
    displayQuestion();
    guessInput.focus();
}

function displayQuestion() {
    if (currentQuestionIndex < shuffledCountries.length) {
        const currentCountry = shuffledCountries[currentQuestionIndex];
        flagImage.src = currentCountry.flag;
        feedbackMessage.textContent = '';
        guessInput.value = '';
    } else {
        endGame();
    }
}

function checkAnswer() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctCountryName = shuffledCountries[currentQuestionIndex].name.toLowerCase();

    if (guess === correctCountryName) {
        score++;
        feedbackMessage.textContent = 'Correct!';
        feedbackMessage.className = 'correct';
    } else {
        feedbackMessage.textContent = `Incorrect! The correct answer was ${shuffledCountries[currentQuestionIndex].name}.`;
        feedbackMessage.className = 'incorrect';
    }

    updateScore();
    currentQuestionIndex++;

    setTimeout(displayQuestion, 1000);
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function endGame() {
    feedbackMessage.textContent = `Quiz finished! Your final score is ${score} out of ${shuffledCountries.length}.`;
    feedbackMessage.className = 'text-gray-700';
    flagImage.src = "";
    guessInput.disabled = true;
    submitButton.disabled = true;

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.className = 'mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all';
    playAgainButton.onclick = () => {
        guessInput.disabled = false;
        submitButton.disabled = false;
        startGame();
        playAgainButton.remove();
    };
    document.getElementById('quiz-container').appendChild(playAgainButton);
}

submitButton.addEventListener('click', checkAnswer);

guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

window.onload = startGame;
