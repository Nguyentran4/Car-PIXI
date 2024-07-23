let song = new Audio('audio/Mario.mp3');
let speedcar1;
let speedcar2;
let isResetting = false;
const duration = 10000; // Duration in milliseconds (10 seconds)

const app = new PIXI.Application({
    width: 770,
    height: 500,
    backgroundColor: 0xdff1f6,
});
document.querySelector('.pixi-container').appendChild(app.view);

const app2 = new PIXI.Application({
    width: 300,
    height: 500,
    backgroundColor: 0xdff1f6,
});
document.querySelector('.pixi-container2').appendChild(app2.view);


const carSprites = [];
const timerDisplay = document.getElementById('timerDisplay');

function loadAssets() {
    return PIXI.Assets.load('https://static.vecteezy.com/system/resources/previews/009/379/324/non_2x/retro-pick-up-car-clipart-design-illustration-free-png.png');
}

function createCar(texture, tint, yPos) {
    const car = new PIXI.Sprite(texture);
    car.anchor.set(-0.5);
    car.tint = tint;
    car.width = 50;
    car.height = 164050 / 6117;
    car.x = 0;
    car.y = yPos;
    app.stage.addChild(car);
    return car;
}

function drawFinishLine() {
    const finishLine = new PIXI.Graphics();
    const finishLinePosition = app.screen.width - 50; // Adjust the finish line position as needed
    finishLine.lineStyle(2, 0xff0000, 1);
    finishLine.moveTo(finishLinePosition, 0);
    finishLine.lineTo(finishLinePosition, app.screen.height);
    app.stage.addChild(finishLine);
}

function initializeCars(texture) {
    const car1 = createCar(texture, 0xffffff, app.screen.height / 8);
    const car2 = createCar(texture, 0xB3F6BF, app.screen.height / 2);
    carSprites.push(car1, car2);
}

function setupEventListeners() {
    document.getElementById('startButton').addEventListener('click', startRace);
    document.getElementById('resetButton').addEventListener('click', resetRace);
    document.getElementById('resetButton').disabled = true;
}

function validateSpeeds(speed1, speed2) {
    if (isFloat(speed1) || isFloat(speed2)) {
        showError("Please enter valid numbers for speed.");
        return false;
    }
    if (speed1 < 0 || speed1 > 150 || speed2 < 0 || speed2 > 150) {
        showError("The speed range is <br> from 0 to 150 px/sec. <br> Please try different numbers.");
        return false;
    }
    return true;
}

function showError(message) {
    document.querySelector('.result').innerHTML = message;
}

function clearError() {
    document.querySelector('.result').innerHTML = "";
}

function startRace() {
    speedcar1 = parseInt(document.getElementById('speed1').value, 10);
    speedcar2 = parseInt(document.getElementById('speed2').value, 10);
    if (!validateSpeeds(speedcar1, speedcar2)) return;
    clearError();

    song.play();
    let elapsedTime = 0;
    timerDisplay.textContent = "Elapsed Time: 0.0 seconds";

    let startTime = Date.now(); // Store the start time
    let isRunning = true;
    let car1FinishTime = null;
    let car2FinishTime = null;

    let nextUpdateTime = 0; // Time when the next graph update is scheduled

    const tickerFunction = (delta) => {
        if (isRunning && !isResetting) {
            elapsedTime = Date.now() - startTime;

            if (elapsedTime > duration) {
                endRace(elapsedTime, car1FinishTime, car2FinishTime);
                updateGraphDynamically(elapsedTime);  // Ensure a final update is done at the end
                return;
            }

            moveCars(delta);

            // Update the graph at 500 milliseconds intervals
            if (elapsedTime >= nextUpdateTime) {
                updateGraphDynamically(elapsedTime);  // Update positions on the graph
                nextUpdateTime += 500; // Schedule next update
            }

            const maxPosition = app.screen.width - 120;
            if (carSprites[0].x >= maxPosition && !car1FinishTime) {
                carSprites[0].x = maxPosition;
                speedcar1 = 0;
                car1FinishTime = (elapsedTime / 1000).toFixed(1);
            }
            if (carSprites[1].x >= maxPosition && !car2FinishTime) {
                carSprites[1].x = maxPosition;
                speedcar2 = 0;
                car2FinishTime = (elapsedTime / 1000).toFixed(1);
            }

            timerDisplay.textContent = `Elapsed Time: ${(elapsedTime / 1000).toFixed(1)} seconds`;
        }
    };


    

    app.ticker.add(tickerFunction);
    document.getElementById('resetButton').addEventListener('click', () => {
        resetRace(tickerFunction);
    });

    document.getElementById('startButton').disabled = true;
    document.getElementById('resetButton').disabled = false;

    function endRace(elapsedTime, car1FinishTime, car2FinishTime) {
        song.pause();
        elapsedTime = duration;
        isRunning = false;
        document.getElementById('resetButton').disabled = false;
        displayResult(car1FinishTime, car2FinishTime);
    }
}

function moveCars(delta) {
    carSprites[0].x += speedcar1 / 55 * delta;
    carSprites[1].x += speedcar2 / 55 * delta;
}


function displayResult(car1FinishTime, car2FinishTime) {
    const resultOverlay = document.querySelector('.result-overlay');
    const pixiContainer = document.querySelector('.pixi-container');
    let resultText = '';

    if (car1FinishTime && car2FinishTime) {
        if (car1FinishTime < car2FinishTime) {
            resultText = `Car one reached the finish line first in ${car1FinishTime} seconds. Car one wins.<br> Car two reached the finish line in ${car2FinishTime} seconds.`;
        } else if (car1FinishTime > car2FinishTime) {
            resultText = `Car two reached the finish line first in ${car2FinishTime} seconds. Car two wins.<br> Car one reached the finish line in ${car1FinishTime} seconds.`;
        } else {
            resultText = `Tie. <br> Both cars reached the finish line at the same time in ${car1FinishTime} seconds.`;
        }
    } else if (car1FinishTime) {
        resultText = `Car one reached the finish line first in ${car1FinishTime} seconds. Car one wins.<br> Car two couldn't make it to the finish line within 10 seconds.`;
    } else if (car2FinishTime) {
        resultText = `Car two reached the finish line first in ${car2FinishTime} seconds. Car two wins.<br> Car one couldn't make it to the finish line within 10 seconds.`;
    } else {
        resultText = `Neither car could make it to the finish line within 10 seconds.`;
    }

    resultOverlay.innerHTML = resultText;
    pixiContainer.classList.add('blur');
    resultOverlay.classList.add('show-result');
}

function resetRace() {
    song.pause();
    isResetting = true;
    resetGraph();

    app.ticker.remove();
    carSprites.forEach(car => car.x = 0);

    document.getElementById('startButton').disabled = false;
    document.getElementById('resetButton').disabled = true;

    isResetting = false;
    timerDisplay.textContent = "Elapsed Time: 0.0 seconds";
    clearError();

    // Remove blur and hide result overlay
    const pixiContainer = document.querySelector('.pixi-container');
    const resultOverlay = document.querySelector('.result-overlay');
    pixiContainer.classList.remove('blur');
    resultOverlay.classList.remove('show-result');

    
}

function resetRace(tickerFunction) {
    song.pause();
    isResetting = true;
    resetGraph();

    app.ticker.remove(tickerFunction);
    carSprites.forEach(car => car.x = 0);

    document.getElementById('startButton').disabled = false;
    document.getElementById('resetButton').disabled = true;

    isResetting = false;
    timerDisplay.textContent = "Elapsed Time: 0.0 seconds";
    clearError();

    const pixiContainer = document.querySelector('.pixi-container');
    const resultOverlay = document.querySelector('.result-overlay');
    pixiContainer.classList.remove('blur');
    resultOverlay.classList.remove('show-result');
    
}

function updateGraphDynamically(elapsedTime) {
    const timeInSeconds = (elapsedTime / 1000).toFixed(1); // Format time to one decimal place
    console.log(`Updating graph at time: ${timeInSeconds}, Car1: ${carSprites[0].x}, Car2: ${carSprites[1].x}`); // Log for debugging purposes

    // Directly call updateGraph for each car
    updateGraph('Car 1', timeInSeconds, carSprites[0].x);
    updateGraph('Car 2', timeInSeconds, carSprites[1].x);
}

function isFloat(x) { return !!(x % 1); }


window.onload = function () {
    initializeGraph();
    loadAssets().then(texture => {
        initializeCars(texture);
        drawFinishLine();
        setupEventListeners();
    });
};
