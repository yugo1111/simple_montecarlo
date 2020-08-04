window.addEventListener("load", () => {
  var mui = new Montecarlo_ui(
    document.querySelector("#start"),
    document.querySelector("#clear"),
    document.querySelector("#graph1"),
    document.querySelector("#graph1b")
  );
  mui.setNumber(document.querySelectorAll("#panel2 > button"));
  mui.setResult(document.querySelector("#result"));
});

class Montecarlo_ui {
  constructor(start, clear, canvas, background) {
    this.start = start;
    this.clear = clear;
    this.montecarlo = new Montecarlo(canvas);
    this.clear.addEventListener("click", () => {
      this.montecarlo.clearCanvas();
    });
    this.start.addEventListener("click", () => {
      let result = this.montecarlo.next();
      this.result.textContent =
        "計算結果：" +
        result[0] / result[1] +
        "(試行回数：" +
        result[1] +
        "回)";
    });
  }
  setNumber(btnArray) {
    for (let btn of btnArray) {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("number"))
          this.montecarlo.setTimes(btn.getAttribute("number"));
      });
    }
  }
  setResult(result_element) {
    this.result = result_element;
    this.result.textContent = "計算結果：";
  }
}
class Montecarlo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.times = 10000;
    this.all_number = 0;
    this.inside_number = 0;
  }
  next() {
    for (let i = 0; i < this.times; i++) {
      let x = Math.random() * 2.0 - 1.0;
      let y = Math.random() * 2.0 - 1.0;

      let length = Math.sqrt(x * x + y * y);
      if (length <= 1.0) {
        this.ctx.strokeStyle = "rgb(40, 40, 200)";
        this.inside_number++;
      } else {
        this.ctx.strokeStyle = "rgb(220, 40, 40)";
      }
      this.all_number++;

      this.ctx.beginPath();
      let px = (x + 1.0) * 200.0;
      let py = (y + 1.0) * 200.0;
      this.ctx.moveTo(px, py);
      this.ctx.lineTo(px + 1, py + 1);
      this.ctx.stroke();
    }
    return [this.inside_number, this.all_number];
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 400);
    this.inside_number = 0;
    this.all_number = 0;
  }
  setTimes(value) {
    this.times = value;
  }
}
