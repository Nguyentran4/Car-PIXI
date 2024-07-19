class Car {
    constructor(texture, x, y, speed, anchors) {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = x;
        this.sprite.y = y;

        this.sprite.anchor.set(anchors);
        this.speed = speed;
        this.position = 0;
        this.finishTime = null;

        (this.sprite).width = 50;  // Set width of car
        (this.sprite).height = 164050/6117;
    }

    setcolor(color){
        (this.sprite).tint = color;
        }

    setSpeed(speed) {
        this.speed = speed;
    }

    setX(x){
        this.sprite.x = x;
    }

    start(app) {
        const gridWidth = app.screen.width;
        const maxPosition = gridWidth  - this.sprite.width;

        app.ticker.add((delta) => {
            this.x += (this.speed) * delta;
            if (this.x > maxPosition) {
                     this.x = maxPosition;
            }
            // if (this.x >= maxPosition) {
            //     this.x = maxPosition;
            //     this.stop(app);
            //     this.finishTime = (elapsedTime / 1000).toFixed(1); // Record the finish time
            // }

            //this.sprite.x = this.position;

            // Update the graph every 10 frames (approximately every second)
            
        });
    }
    
    stop(app) {
        app.ticker.remove(this.move);
    }

    reset() {
        this.position = 0;
        this.sprite.x = 0;
        this.finishTime = null;
    }
}
