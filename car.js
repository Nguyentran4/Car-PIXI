class Car {
  constructor(elementId, speed) {
      this.element = document.getElementById(elementId);
      this.speed = speed;
      this.position = 0;
      this.interval = null;
  }

  setSpeed(speed) {
      this.speed = speed;
  }

  start() {
      const gridWidth = document.querySelector('.grid').clientWidth;
      const maxPosition = gridWidth - 50; // Assuming car width is 50px
      const totalTime = 10 * 1000; // 10 seconds in milliseconds
      const totalFrames = totalTime / (1000 / 60); // Total frames in 10 seconds

      this.interval = setInterval(() => {
          this.position += (this.speed / 60);
          if (this.position >= maxPosition) {
              this.position = maxPosition;
              this.stop();
          }
          
          this.element.style.left = `${this.position}px`;
      }, 1000 / 60);
  }

  stop() {
      clearInterval(this.interval);
      this.interval = null;
  }

  reset() {
      this.stop();
      this.position = 0;
      this.element.style.left = '0px';
  }
}
