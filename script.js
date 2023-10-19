const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerEndMessage = document.getElementById('timer-end-message');
const endMessage = document.getElementById('end-message');
const alertOkButton = document.getElementById('alert-ok-button');

let countdown;
let totalSeconds = 0;

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;
  const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  timerDisplay.textContent = display;
}

function showEndMessage(minutes) {
  timerEndMessage.style.display = 'block';
  endMessage.textContent = `Timer Ended! ${minutes} minutes elapsed.`;

  if (minutes >= 5) {
    alertOkButton.classList.remove('hidden');
  }
}

function startTimer() {
  clearInterval(countdown);
  totalSeconds = hoursInput.value * 3600 + minutesInput.value * 60 + secondsInput.value;
  displayTimeLeft(totalSeconds);
  const endTime = Date.now() + totalSeconds * 1000;
  countdown = setInterval(() => {
    totalSeconds = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    displayTimeLeft(totalSeconds);
    if (totalSeconds === 0) {
      clearInterval(countdown);
      showEndMessage((totalSeconds / 60).toFixed(2));
    }
  }, 1000);
}

startButton.addEventListener('click', () => {
  startTimer();
});

stopButton.addEventListener('click', () => {
  clearInterval(countdown);
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  totalSeconds = 0;
  displayTimeLeft(0);
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  timerEndMessage.style.display = 'none';
  alertOkButton.classList.add('hidden');
});

alertOkButton.addEventListener('click', () => {
  timerEndMessage.style.display = 'none';
  alertOkButton.classList.add('hidden');
});
