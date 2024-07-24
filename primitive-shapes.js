
class Shape extends PIXI.Graphics {
    constructor() {
        super();
        this._fillColor = 0xFFFFFF;
        this._strokeColor = 0x000000;
        this._strokeThickness = 0;
    }

    setFillColor(color) {
        this._fillColor = color;
        this.redraw();
    }

    setStrokeColor(color) {
        this._strokeColor = color;
        this.redraw();
    }

    setStrokeThickness(thickness) {
        this._strokeThickness = thickness;
        this.redraw();
    }

    redraw() {
        // This method should be overridden in child classes
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height, cornerRadius = 0) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.cornerRadius = cornerRadius;
        this.redraw();
    }

    redraw() {
        this.clear();
        if (this._strokeThickness > 0) {
            this.lineStyle(this._strokeThickness, this._strokeColor);
        }
        this.beginFill(this._fillColor);
        this.drawRoundedRect(this.x, this.y, this.width, this.height, this.cornerRadius);
        this.endFill();
    }

    setCornerRadius(radius) {
        this.cornerRadius = radius;
        this.redraw();
    }
}

class Circle extends Shape {
    constructor(x, y, radius) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.redraw();
    }

    redraw() {
        this.clear();
        if (this._strokeThickness > 0) {
            this.lineStyle(this._strokeThickness, this._strokeColor);
        }
        this.beginFill(this._fillColor);
        this.drawCircle(0, 0, this.radius);
        this.endFill();
    }

    setRadius(radius) {
        this.radius = radius;
        this.redraw();
    }
}

// Example usage:
function createShapes(app) {
    const rectangle = new Rectangle(50, 50, 100, 80, 10);
    rectangle.setFillColor(0xFF0000);
    rectangle.setStrokeColor(0x00FF00);
    rectangle.setStrokeThickness(2);

    const circle = new Circle(400, 100, 40);
    circle.setFillColor(0x0000FF);
    circle.setStrokeColor(0xFFFF00);
    circle.setStrokeThickness(3);

    app.stage.addChild(rectangle);
    app.stage.addChild(circle);
}

createShapes(app);

