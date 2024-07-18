let song = new Audio('audio/Mario.mp3');
let isLimit;
let speedcar1;
let speedcar2;

const car1 = new Car('car1', parseInt(document.getElementById('speed1').value));
const car2 = new Car('car2', parseInt(document.getElementById('speed2').value));

document.getElementById('startButton').addEventListener('click', () => {
    isLimit = true;


    //Error Check for negative speed, over 150 px/sec, float numbers
    while(isLimit){
        document.querySelector('.result').innerHTML = "";
        speedcar1 = document.getElementById('speed1').value;
        speedcar2 = document.getElementById('speed2').value;


        if(isFloat(speedcar1) === true){
            document.querySelector('.result').innerHTML = "The speed only works in whole number. Please try a different numbers.";
            return;
        } else if (isFloat(speedcar2) === true){
            document.querySelector('.result').innerHTML = "The speed only works in whole number. Please try a different numbers.";
            return;
        }

        car1.setSpeed(parseInt(speedcar1));
        car2.setSpeed(parseInt(speedcar2));

        if (car1.speed > 150 || car1.speed < 0){
            document.querySelector('.result').innerHTML = "The speed range is from 0 - 150 px/sec. Please try a different numbers.";
            return;
        } else if (car2.speed > 150 || car2.speed < 0){
            document.querySelector('.result').innerHTML = "The speed range is from 0 - 150 px/sec. Please try a different numbers.";
            return;
        } else {
            isLimit = false;
    }}

    song.play();

    car1.start();
    car2.start();

    startTimer();

    document.getElementById('startButton').disabled = true;
    document.getElementById('resetButton').disabled = false;

    

    const time = setTimeout(() => {
        car1.stop();
        car2.stop();
        stopTimer();
        song.pause();
        displayResult();
        document.getElementById('resetButton').disabled = false;
    }, 10000); // Race for 10 seconds

    document.getElementById('resetButton').addEventListener('click', () => {
        clearTimeout(time);
        song.pause();
        return;
    });
});

document.getElementById('resetButton').addEventListener('click', () => {
    car1.reset();
    car2.reset();
    resetTimer();
    document.getElementById('startButton').disabled = false;
    document.getElementById('resetButton').disabled = true;
    document.querySelector('.result').innerHTML = '';
    isLimit = true
});

document.getElementById('resetButton').disabled = true;

//Display the result
function displayResult() {
    const result = document.getElementById('result');
    if (car1.finishTime && car2.finishTime) {
        if (car1.finishTime < car2.finishTime) {
            result.innerHTML = `Car one reached the finish line first in ${car1.finishTime} seconds. Car one wins.<br> Car two reached the finish line in ${car2.finishTime} seconds.`;
        } else if (car1.finishTime > car2.finishTime) {
            result.innerHTML = `Car two reached the finish line first in ${car2.finishTime} seconds. Car two wins.<br> Car one reached the finish line in ${car1.finishTime} seconds.`;
        } else {
            result.innerHTML = `Tie. <br> Both cars reached the finish line at the same time in ${car1.finishTime} seconds.`;
        }
        //Car1 or Car2 can't make it to the end
    } else if (car1.finishTime) {
        result.innerHTML = `Car one reached the finish line first in ${car1.finishTime} seconds. Car one wins. 
        <br> Car two couldn't make it to the finish line within 10 seconds.`;
    } else if (car2.finishTime) {
        result.innerHTML = `Car two reached the finish line first in ${car2.finishTime} seconds. Car two wins. 
        <br> Car one couldn't make it to the finish line within 10 seconds.`;
    } else {
        result.innerHTML = `Neither car could make it to the finish line within 10 seconds.`;
    }
}

function isFloat(x) { return !!(x % 1); }

function updateGraphDynamically() {
    const time = (elapsedTime / 1000).toFixed(1);
    updateGraph('Car 1', time, car1.position);
    updateGraph('Car 2', time, car2.position);
}

window.onload = function() {
    initializeGraph();
};
