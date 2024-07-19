let song = new Audio('audio/Mario.mp3');
let isLimit;
let speedcar1;
let speedcar2;
let isResetting = false;
let stopTime = 10 * 1000;

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
    bunny.anchor.set(-0.5);
    bunny2.anchor.set(-0.5);
    bunny2.tint = 0xB3F6BF;

    // Move the sprite to the starting position (left side of the screen)
    bunny2.x = 0;
    bunny2.y = app.screen.height / 2;
    bunny.x = 0;
    bunny.y = app.screen.height / 8;

    // Adjust size of the sprites
    bunny.width = 50;  // Set width of bunny
    bunny.height = 164050/6117; // Set height of bunny

    bunny2.width = 50;  // Set width of bunny2
    bunny2.height = 164050/6117; // Set height of bunny2
    
    app.stage.addChild(bunny);
    app.stage.addChild(bunny2);

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
    
    
            if (bunny.speed > 150 || bunny.speed < 0){
                document.querySelector('.result').innerHTML = "The speed range is from 0 - 150 px/sec. Please try a different numbers.";
                return;
            } else if (bunny2.speed > 150 || bunny2.speed < 0){
                document.querySelector('.result').innerHTML = "The speed range is from 0 - 150 px/sec. Please try a different numbers.";
                return;
            } else {
                isLimit = false;
        }}
    
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
            return;
        }
        bunny.x += speedcar1/55 * delta; // Move 1 pixels per frame
        bunny2.x += speedcar2/55 * delta;

        const maxposition = finishLinePosition - 70;
        // Stop bunnies at the finish line
        if (bunny.x > maxposition) {
            bunny.x = maxposition;
            
        }
        if (bunny2.x > maxposition) {
            bunny2.x = maxposition;
            
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
            bunny.x = 0;
            bunny2.x = 0;
    
            
            document.getElementById('startButton').disabled = false;
            document.getElementById('resetButton').disabled = true;
    
            isResetting = false;
            elapsedTime = 0;
            timerDisplay.textContent = "Elapsed Time: 0.0 seconds"
        });
    });
    
    document.getElementById('resetButton').disabled = true;
    
    
    function isFloat(x) { return !!(x % 1); }
    
    function updateGraphDynamically() {
        const time = (elapsedTime / 1000).toFixed(1);
        updateGraph('Car 1', time, car1.position);
        updateGraph('Car 2', time, car2.position);
    }
    
    window.onload = function() {
        initializeGraph();
    };
    
    
});





