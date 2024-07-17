let song = new Audio('audio/Mario.mp3');
const car1 = new Car('car1', parseInt(document.getElementById('speed1').value));
const car2 = new Car('car2', parseInt(document.getElementById('speed2').value));

document.getElementById('startButton').addEventListener('click', () => {
    song.play();

    car1.setSpeed(parseInt(document.getElementById('speed1').value));
    car2.setSpeed(parseInt(document.getElementById('speed2').value));

    car1.start();
    car2.start();

    startTimer();

    document.getElementById('startButton').disabled = true;
    document.getElementById('resetButton').disabled = true;

    setTimeout(() => {
        car1.stop();
        car2.stop();
        stopTimer();
        song.pause();
        document.getElementById('resetButton').disabled = false;
    }, 10000); // Race for 10 seconds
});

document.getElementById('resetButton').addEventListener('click', () => {
    car1.reset();
    car2.reset();
    resetTimer();
    document.getElementById('startButton').disabled = false;
    document.getElementById('resetButton').disabled = true;
});

document.getElementById('resetButton').disabled = true;
