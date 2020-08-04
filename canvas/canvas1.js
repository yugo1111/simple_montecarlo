window.addEventListener("load", () => {
  var element = document.querySelector("#canvas1");
  var context = element.getContext("2d");

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(400, 400);
  context.stroke();
});
