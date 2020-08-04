class foo {
  constructor(x) {
    this.x = x;
  }

  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x;
  }
  incX() {
    this.x++;
  }
}

var f = new foo( 5 );
console.log( f.getX() );
f.incX();
console.log( f.getX() );