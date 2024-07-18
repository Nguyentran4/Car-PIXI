let timerInterval = null;
let elapsedTime = 0;

function startTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerInterval = setInterval(() => {
        elapsedTime += 100;
        timerDisplay.textContent = (elapsedTime / 1000).toFixed(1);
    }, 100);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    document.getElementById('timerDisplay').textContent = elapsedTime.toFixed(1);
}
