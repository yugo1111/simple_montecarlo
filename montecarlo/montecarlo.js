"use strict";
window.addEventListener("load", () => {
  var mui = new Montecarlo_ui(
    document.querySelector("#start"),
    document.querySelector("#clear"),
    document.querySelector("#graph1"),
    document.querySelector("#graph1b")
  );
  mui.setNumber_ui(document.querySelectorAll("#panel2 > button"));
  mui.setResult_ui(document.querySelector("#answer"));
  mui.draw_axis();
});

class Montecarlo_ui {
  constructor(start, clear, canvas, background) {
    this.start = start;
    this.clear = clear;
    this.canvas = canvas;
    this.montecarlo = new Montecarlo(canvas);
    this.background = background;

    this.clear.addEventListener("click", () => {
      this.montecarlo.clearCanvas();
    });
    this.start.addEventListener("click", () => {
      let result = this.montecarlo.next();
      this.result.textContent =
        "計算結果：" +
        result[0] / result[1] * 4.0 +
        "(試行回数：" +
        result[1] +
        "回)";
    });
  }
  setNumber_ui(btnArray) {
    for (let btn of btnArray) {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("number"))
          this.montecarlo.setTimes(btn.getAttribute("number"));
      });
    }
  }
  setResult_ui(result_element) {
    this.result = result_element;
    this.result.textContent = "計算値：";
  }
  draw_axis() {
    console.log(this.background);
    let ctx2 = this.background.getContext('2d');
    ctx2.beginPath();
    ctx2.moveTo(0,this.canvas.height/2);
    ctx2.lineTo(this.canvas.width,this.canvas.height/2);
    ctx2.moveTo(this.canvas.width/2,0);
    ctx2.lineTo(this.canvas.width/2,this.canvas.height);
    ctx2.stroke();
  }
}
class Montecarlo {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.times = 10000; // startボタンが押された際の打点数
    this.all_number = 0;  // 全打点数（累積)
    this.inside_number = 0; // 円内に入った点数(累積)
  }
  next() {
    for (let i = 0; i < this.times; i++) {
      // Math.randomの返り値は0.0〜1.0
      // これを-1.0〜1.0に整える
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
      // -1.0〜1.0の座標を0〜横幅（または高さ）に整える
      let px = (x + 1.0) * this.canvas.width / 2.0;
      let py = (y + 1.0) * this.canvas.height / 2.0;
      this.ctx.moveTo(px, py);
      this.ctx.lineTo(px + 1, py + 1);
      this.ctx.stroke();
    }
    return [this.inside_number, this.all_number];
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.inside_number = 0;
    this.all_number = 0;
  }
  setTimes(value) {
    this.times = value;
  }
}
