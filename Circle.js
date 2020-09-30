class Circle {
  constructor(x, y, color, radius = COLOREDCIRCLE_RADIUS) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.disableDragging();
  }

  draw(ctx) {
    const circle = new Path2D();
    circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color; ctx.fill(circle);
    ctx.fillStyle = 'black'; ctx.stroke(circle);
  }

  disableDragging() {
    this.isDragging = false;
  }

  enableDragging() {
    this.isDragging = true;
  }
}
