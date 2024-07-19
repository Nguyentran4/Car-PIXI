let song = new Audio('audio/Mario.mp3');
let isLimit;
let speedcar1;
let speedcar2;

const app = new PIXI.Application({
    width: 700,
    height: 150,
    backgroundColor: 0xdff1f6,
  });
document.querySelector('.pixi-container').appendChild(app.view);
PIXI.Assets.load('https://static.vecteezy.com/system/resources/previews/009/379/324/non_2x/retro-pick-up-car-clipart-design-illustration-free-png.png').then((texture) => {
    const bunny = new PIXI.Sprite(texture);
    const bunny2 = new PIXI.Sprite(texture);
    // Center the sprite's anchor point
    bunny.anchor.set(0.5);
    bunny2.anchor.set(0.1);
    bunny2.tint = 0xB3F6BF;

    // Move the sprite to the starting position (left side of the screen)
    bunny2.x = 0;
    bunny2.y = app.screen.height / 2;
    bunny.x = 0;
    bunny.y = app.screen.height / 2;

    // Adjust size of the sprites
    bunny.width = 50;  // Set width of bunny
    bunny.height = 164050/6117; // Set height of bunny

    bunny2.width = 50;  // Set width of bunny2
    bunny2.height = 164050/6117; // Set height of bunny2
    
    app.stage.addChild(bunny);
    app.stage.addChild(bunny2);

    // Add a movement effect
    app.ticker.add((delta) => {
        bunny.x += 2 * delta; // Move 2 pixels per frame
        bunny2.x += 3 * delta;
        // Reset position if bunny moves off the screen
        if (bunny.x > app.screen.width - 50) {
            bunny.x = app.screen.width - 50;
        }
        if (bunny2.x > app.screen.width - 50) {
           bunny2.x = app.screen.width - 50;
        }
    });
});





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
    resetGraph(); // Reset the graph when the cars are reset
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
