class Mouse {
  constructor(canvas) {
    this.canvas = canvas;
  }

  getPosition(event) {
    const { left, top } = this.canvas.getBoundingClientRect();
    const mx = parseInt(event.clientX - left, 10);
    const my = parseInt(event.clientY - top, 10);
    return { mx, my };
  }

  getDelta(event) { // get displacement from start position
    const { mx, my } = this.getPosition(event);
    const [deltaX, deltaY] = [mx - this.mouseStartX, my - this.mouseStartY];
    this.storeStartPosition(mx, my);
    return { deltaX, deltaY };
  }

  storeStartPosition(mx, my) {
    [this.mouseStartX, this.mouseStartY] = [mx, my];
  }
}
