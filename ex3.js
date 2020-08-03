class Drawing {
  constructor(element) {
    this.element = element;
    this.context = element.getContext("2d");
  }
  set_event() {
    this.element.addEventListener("click", (ev) => {
      var rect = ev.target.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      this.drawPoint(x, y);
    });
  }
  drawPoint(x, y) {
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x + 1, y + 1);
    this.context.stroke();
  }
}

window.addEventListener("load", () => {
  var element = document.getElementById("canvas1");
  var draw = new Drawing(element);
  draw.set_event();
});
