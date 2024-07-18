class Car {
    constructor(elementId, speed) {
        this.element = document.getElementById(elementId);
        this.speed = speed;
        this.position = 0;
        this.interval = null;
        this.finishTime = null;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    start() {
        const gridWidth = document.querySelector('.grid').clientWidth;
        const maxPosition = gridWidth - 50 - 31; // Assuming car width is 50px
        const totalTime = 10 * 1000; // 10 seconds in milliseconds
        const totalFrames = totalTime / (1000 / 60); // Total frames in 10 seconds

        let frameCount = 0;

        this.interval = setInterval(() => {
            this.position += (this.speed / 60);
            if (this.position >= maxPosition) {
                this.position = maxPosition;
                this.stop();
                this.finishTime = (elapsedTime / 1000).toFixed(1); // Record the finish time
            }

            this.element.style.left = `${this.position}px`;

            // Update the graph every 10 frames (approximately every second)
            if (frameCount % 10 === 0) {
                updateGraphDynamically(); // Update the graph as the car moves
            }
            frameCount++;
        }, 1000 / 60); // Update position every frame (60 FPS)
    }
    
    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.stop();
        this.position = 0;
        this.element.style.left = '0px';
        this.finishTime = null;
    }
}
