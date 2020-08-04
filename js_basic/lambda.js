// function3.jsをラムダ式で書いた例（カッコは可能な限り省略しています）
var times_define = (x) => (y) => x * y;

var times = times_define(2);

console.log(times(5));
// 10
