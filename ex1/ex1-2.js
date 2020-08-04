window.addEventListener("load", function () {
  var btn = document.querySelector("#btn1");
  var bar = document.querySelector("p > span");

  btn.addEventListener("click", function () {
    bar.textContent = "重要かもしれない";
  });
});
