let song = new Audio('audio/Mario.mp3');
let isLimit;
let speedcar1;
let speedcar2;
let isResetting = false;
let stopTime = 10 * 1000;

const app = new PIXI.Application({
    width: 770,
    height: 500,
    backgroundColor: 0xdff1f6,
});
document.querySelector('.pixi-container').appendChild(app.view);

PIXI.Assets.load('https://static.vecteezy.com/system/resources/previews/009/379/324/non_2x/retro-pick-up-car-clipart-design-illustration-free-png.png').then((texture) => {
    const car = new PIXI.Sprite(texture);
    const car2 = new PIXI.Sprite(texture);

    // Center the sprite's anchor point
    car.anchor.set(-0.5);
    car2.anchor.set(-0.5);
    car2.tint = 0xB3F6BF;

    // Move the sprite to the starting position (left side of the screen)
    car2.x = 0;
    car2.y = app.screen.height / 2;
    car.x = 0;
    car.y = app.screen.height / 8;

    // Adjust size of the sprites
    car.width = 50;  // Set width of car
    car.height = 164050 / 6117; // Set height of car

    car2.width = 50;  // Set width of car2
    car2.height = 164050 / 6117; // Set height of car2

    app.stage.addChild(car);
    app.stage.addChild(car2);

    // Draw the finish line
    const finishLine = new PIXI.Graphics();
    const finishLinePosition = app.screen.width - 50; // Adjust the finish line position as needed
    finishLine.lineStyle(2, 0xff0000, 1);
    finishLine.moveTo(finishLinePosition, 0);
    finishLine.lineTo(finishLinePosition, app.screen.height);
    app.stage.addChild(finishLine);

    let elapsedTime = 0;
    const timerDisplay = document.getElementById('timerDisplay');

    document.getElementById('startButton').addEventListener('click', () => {

        let car1FinishTime = null;
        let car2FinishTime = null;

        // Error Check for invalid speed values
        speedcar1 = parseInt(document.getElementById('speed1').value, 10);
        speedcar2 = parseInt(document.getElementById('speed2').value, 10);

        if (isNaN(speedcar1) || isNaN(speedcar2)) {
            document.querySelector('.result').innerHTML = "Please enter valid numbers for speed.";
            return;
        }

        if (speedcar1 < 0 || speedcar1 > 150 || speedcar2 < 0 || speedcar2 > 150) {
            document.querySelector('.result').innerHTML = "The speed range is from 0 to 150 px/sec. Please try different numbers.";
            return;
        }

        song.play();
        elapsedTime = 0;
        timerDisplay.textContent = "Elapsed Time: 0.0 seconds";

        let startTime = Date.now(); // Store the start time
        const duration = 10000; // Duration in milliseconds (10 seconds)
        let isRunning = true; // Flag to control the running state

        const tickerFunction = (delta) => {
            if (isRunning && !isResetting) {
                // Calculate elapsed time
                const currentTime = Date.now();
                elapsedTime = currentTime - startTime;

                // Stop execution after 10 seconds
                if (elapsedTime > duration) {
                    song.pause();
                    elapsedTime = duration;
                    isRunning = false;
                    document.getElementById('resetButton').disabled = false;
                    displayResult();
                    return;
                }
                car.x += speedcar1 / 55 * delta; // Move 1 pixels per frame
                car2.x += speedcar2 / 55 * delta;

                const maxPosition = finishLinePosition - 70;
                // Stop cars at the finish line and record finish time
                if (car.x >= maxPosition && !car1FinishTime) {
                    car.x = maxPosition;
                    car1FinishTime = (elapsedTime / 1000).toFixed(1);
                }
                if (car2.x >= maxPosition && !car2FinishTime) {
                    car2.x = maxPosition;
                    car2FinishTime = (elapsedTime / 1000).toFixed(1);
                }

                timerDisplay.textContent = `Elapsed Time: ${(elapsedTime / 1000).toFixed(1)} seconds`;
            }
        };
        app.ticker.add(tickerFunction);

        document.getElementById('startButton').disabled = true;
        document.getElementById('resetButton').disabled = false;

        // Reset timer display
        document.getElementById('timerDisplay').textContent = "Elapsed Time: 0.0 seconds";

        document.getElementById('resetButton').addEventListener('click', () => {
            song.pause();
            isRunning = false;
            isResetting = true;

            app.ticker.remove(tickerFunction);
            car.x = 0;
            car2.x = 0;

            document.getElementById('startButton').disabled = false;
            document.getElementById('resetButton').disabled = true;

            isResetting = false;
            elapsedTime = 0;
            timerDisplay.textContent = "Elapsed Time: 0.0 seconds";
            document.querySelector('.result').innerHTML = "";
        });

        function displayResult() {
            const result = document.querySelector('.result');
            if (car1FinishTime && car2FinishTime) {
                if (car1FinishTime < car2FinishTime) {
                    result.innerHTML = `Car one reached the finish line first in ${car1FinishTime} seconds. Car one wins.<br> Car two reached the finish line in ${car2FinishTime} seconds.`;
                } else if (car1FinishTime > car2FinishTime) {
                    result.innerHTML = `Car two reached the finish line first in ${car2FinishTime} seconds. Car two wins.<br> Car one reached the finish line in ${car1FinishTime} seconds.`;
                } else {
                    result.innerHTML = `Tie. <br> Both cars reached the finish line at the same time in ${car1FinishTime} seconds.`;
                }
            } else if (car1FinishTime) {
                result.innerHTML = `Car one reached the finish line first in ${car1FinishTime} seconds. Car one wins.<br> Car two couldn't make it to the finish line within 10 seconds.`;
            } else if (car2FinishTime) {
                result.innerHTML = `Car two reached the finish line first in ${car2FinishTime} seconds. Car two wins.<br> Car one couldn't make it to the finish line within 10 seconds.`;
            } else {
                result.innerHTML = `Neither car could make it to the finish line within 10 seconds.`;
            }
        }
    });

    document.getElementById('resetButton').disabled = true;

    function isFloat(x) { return !!(x % 1); }

    function updateGraphDynamically() {
        const time = (elapsedTime / 1000).toFixed(1);
        updateGraph('Car 1', time, car.x);
        updateGraph('Car 2', time, car2.x);
    }

    window.onload = function () {
        initializeGraph();
    };

});
