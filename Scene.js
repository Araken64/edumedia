class Scene {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.mouse = new Mouse(this.canvas); // mouse manager
    this.bindEvents(); // for drag & drop
    if (this.canvas.getContext) { // in case of canvas not supported by the browser
      this.ctx = this.canvas.getContext('2d');
      this.configurate();
      this.constructCircles(); // initial circles
      this.draw();
    } else {
      throw new Error('Canvas not supported on this browser');
    }
  }

  configurate() {
    this.ctx.lineWidth = OUTER_LINEWIDTH;
    this.ctx.font = TEXT_FONT;
    this.ctx.textAlign = 'center';
    this.dragging = false; // general dragging, to avoid testing all the circles
  }

  constructCircles() {
    const { width, height } = this.canvas;
    this.center = new Circle(width / 2, height / 2, 'black', CENTER_RADIUS); // static circle at center
    this.circles = [ // colored circles
      new Circle(width / 3, height / 3, 'red'),
      new Circle((2 * width) / 3, height / 3, 'yellow'),
      new Circle(width / 2, (2 * height) / 3, 'blue'),
    ];
  }

  bindEvents() {
    this.canvas.onmousedown = this.drag.bind(this);
    this.canvas.onmouseup = this.drop.bind(this);
    this.canvas.onmousemove = this.move.bind(this);
  }

  drag(event) {
    const { mx, my } = this.mouse.getPosition(event);

    const circle = this.circles.find( // consider square hitbox to simplify computing
      (c) => mx > c.x - c.radius && mx < c.x + c.radius 
        && my > c.y - c.radius && my < c.y + c.radius
    );

    if (circle !== undefined) {
      this.dragging = true;
      circle.enableDragging();
      this.mouse.storeStartPosition(mx, my); // for computing delta
    }
  }

  drop() {
    this.dragging = false;
    this.circles.forEach((circle) => circle.disableDragging());
  }

  move(event) {
    if (this.dragging) {
      const circle = this.circles.find((c) => c.isDragging);
      const { deltaX, deltaY } = this.mouse.getDelta(event);
      circle.x += deltaX; circle.y += deltaY; // move circle
      this.draw(); // update canvas
    }
  }

  draw() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height); // clear canvas

    this.center.draw(this.ctx);
    this.circles.forEach((circle) => circle.draw(this.ctx));
    this.computeCloser();
  }

  computeCloser() {
    let closerCircle = null;
    let closerDelta = Infinity;
    this.circles.forEach((circle) => {
      const delta = Math.hypot(this.center.x - circle.x, this.center.y - circle.y); // pythagore
      if (delta < closerDelta) {
        closerDelta = delta; closerCircle = circle;
      }
    });
    this.ctx.fillText(closerCircle.color, this.canvas.width / 2, this.canvas.height / 5);
  }
}

new Scene();
