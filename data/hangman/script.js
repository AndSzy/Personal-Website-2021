const settingsBtn = document.getElementById('settings-btn');
const settingsContainer = document.getElementById('settings-container');
const difficultyCheckbox = document.getElementById('difficulty');
const playersCheckbox = document.getElementById('players');
const timeCheckbox = document.getElementById('time');
const secretWordElement = document.getElementById('secret-word');;
const categoryElement = document.getElementById('category');
const popupContainer = document.getElementById('popup-container');
const popupTitle = document.getElementById('popup-title');
const popupWinner = document.getElementById('winner');
const playAgainBtn = document.getElementById('play-again');
const notificationContainer = document.getElementById('notification-container');
const wrongLettersElement = document.getElementById('wrong-letters');
const hangmanOne = document.querySelectorAll('.figure-part-one');
const hangmanTwo = document.querySelectorAll('.figure-part-two');
const playerOneArea = document.getElementById('player-one');
const playerTwoArea = document.getElementById('player-two');
const timer = document.getElementById('timer');
const mobileInput = document.getElementById('mobile-input');
let myTimer = false;
let difficulty;
let numberOfPlayers;
let time;
let URL;
let easyURL = 'https://rocky-basin-55272.herokuapp.com/easy';
let hardURL = 'https://rocky-basin-55272.herokuapp.com/hard';
let wordsArray = [];
let secretWord;
let secretWordArray;
let category;
let playerOneMistakes = 0;
let playerTwoMistakes = 0;
let whoIsPlaying = 1;
let timeValue = 10;
let usedLetters = [];
let correctLetters = [];
let wrongLetters = [];

function refreshSettings() {
  difficulty = localStorage.getItem('difficulty') === null ? "easy" : localStorage.getItem('difficulty');
  numberOfPlayers = localStorage.getItem('numberOfPlayers') === null ? 'two' : localStorage.getItem('numberOfPlayers');
  time = localStorage.getItem('time') === null ? 'off' : localStorage.getItem('time');
  difficultyCheckbox.checked = difficulty == "easy" ? false : true;
  playersCheckbox.checked = numberOfPlayers == 'two' ? true : false;
  timeCheckbox.checked = time == 'off' ? true : false;
}

function getDataFromServer() {
  if (difficulty == 'easy') {
    URL = easyURL;
  } else {
    URL = hardURL;
  }
  fetch(URL)
  .then((resp) => resp.json())
  .then(function(data) {
    wordsArray = data;
    getSecretWord();
    })
}

function getSecretWord () {
  let randomNumber = Math.floor(Math.random() * wordsArray.length);
  secretWord = wordsArray[randomNumber].word.toLowerCase();
  secretWordArray = secretWord.split('')
  category = wordsArray[randomNumber].category;
  drawSecretWord();
}

function drawSecretWord() {
  hidePlayerTwoArea();
  categoryElement.innerText = category;
  secretWordElement.innerHTML = `
  ${secretWordArray
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')
  }
  `
  checkforWinner();
}

function hidePlayerTwoArea() {
  numberOfPlayers == "one" ? playerTwoArea.classList.add('one-player') : playerTwoArea.classList.remove('one-player');
}

function checkforWinner() {
  let guesedWord = secretWordElement.innerText.replace(/\n/g,'');
  if(guesedWord == secretWord) {
    popupTitle.innerText = "Congratulation!"
    if(whoIsPlaying == 1) {
      popupWinner.innerText = "Player One is the winner!"
    } else {
      popupWinner.innerText = "Player Two is the winner!"
    }
    endGame();
  }
}

function endGame() {
  clearInterval(myTimer);
  popupContainer.classList.add('active');
}

function wasUsed (letter) {
  if(usedLetters.includes(letter)) {
    showNotification();
  } else {
    if(myTimer) {
      clearInterval(myTimer)
    }
    activateTimer();
    updateStatus(letter);
  }
}

function showNotification() {
  notificationContainer.classList.add('active');
  setTimeout(() => notificationContainer.classList.remove('active'), 1200);
}

function updateStatus(letter) {
    usedLetters.push(letter);
    if(secretWordArray.includes(letter)) {
      correctLetters.push(letter);
      drawSecretWord()
    } else {
      redFlash();
      wrongLetters.push(letter);
      printWrongLetter();
      drawHangman();
    }
}

function redFlash() {
  document.body.classList.add('red-flash');
  setTimeout(() => document.body.classList.remove('red-flash'), 200);
}

function printWrongLetter() {
  wrongLettersElement.innerHTML = `${
    wrongLetters
      .map(letter => `
          <span>${letter}</span>
        `)
      .join('')
  }`
}

function drawHangman() {
  if(whoIsPlaying == 1) {
    hangmanOne[playerOneMistakes].classList.add('active');
    playerOneMistakes ++;
  } else if (whoIsPlaying == 2) {
      hangmanTwo[playerTwoMistakes].classList.add('active');
      playerTwoMistakes ++;
  }
  checkforLooser();
  changePlayer();
}

function changePlayer () {
  if(numberOfPlayers == "two") {
    whoIsPlaying = whoIsPlaying == 1 ? 2: 1;
    playerOneArea.classList.toggle('non-active');
    playerTwoArea.classList.toggle('non-active');
  }
}

function checkforLooser() {
  const playerOneLost = "Player One lost."
  const playerTwoLost = "Player Two lost."
  if (playerOneMistakes == 6 || playerTwoMistakes == 6) {
    popupTitle.innerText = "Sorry !"
    popupWinner.innerText = whoIsPlaying == 1 ? playerOneLost : playerTwoLost;
    endGame()
  }
}

function restartGame() {
  usedLetters.splice(0);
  correctLetters.splice(0);
  wrongLetters.splice(0);
  hangmanOne.forEach(part => part.classList.remove('active'));
  hangmanTwo.forEach(part => part.classList.remove('active'));
  playerOneMistakes = 0;
  playerTwoMistakes = 0;
  whoIsPlaying = 1;
  playerOneArea.classList.remove('non-active');
  playerTwoArea.classList.add('non-active');
  if(myTimer) {
    clearInterval(myTimer);
    timer.innerText = '';
  }
  printWrongLetter();
}

function toggleSettingsContainer() {
  settingsContainer.classList.toggle('hide');
}

function activateTimer() {
  if(time == "on") {
    let currentTime = timeValue;
    myTimer = setInterval(() => showTime(currentTime--), 1000);
  }
}

function showTime(time) {
  if(time <=0) {
    redFlash();
    clearInterval(myTimer);
    activateTimer();
    drawHangman();
  }
  timer.innerText = time;
}

mobileInput.addEventListener('input', (e) => {
  getMobileInput(e.target.value.toLowerCase())
})

function getMobileInput(letter) {
  wasUsed(letter);
  mobileInput.value = '';
}

// Start

refreshSettings();
getDataFromServer();

settingsBtn.addEventListener('click', toggleSettingsContainer);

difficultyCheckbox.addEventListener('click', (e) => {
  if(e.target.checked) {
    localStorage.setItem('difficulty', 'hard');
  } else {
    localStorage.setItem('difficulty', 'easy');
  }
  refreshSettings();
  restartGame();
  getDataFromServer();
});

playersCheckbox.addEventListener('click', (e) => {
  if(e.target.checked) {
    localStorage.setItem('numberOfPlayers', 'two');
  } else {
    localStorage.setItem('numberOfPlayers', 'one');
  }
  refreshSettings();
  restartGame();
  getSecretWord();
});

timeCheckbox.addEventListener('click', (e) => {
  if(e.target.checked) {
    localStorage.setItem('time', 'off');
  } else {
    localStorage.setItem('time', 'on');
  }
  refreshSettings();
  restartGame();
  getSecretWord();
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    wasUsed(e.key);
  }
});

playAgainBtn.addEventListener('click', () => {
  restartGame();
  getSecretWord();
  popupContainer.classList.remove('active');
});
