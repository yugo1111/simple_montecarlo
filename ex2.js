class foo {
    constructor( x ) {
      this.x = x;
      var btn = document.getElementById( 'btn1' );
      btn.addEventListener( 'click', function( event ) { this.incX(); } );
    }
    getX() {
      return this.x;
    }
    setX( x ) {
      this.x = x;
    }
    incX() {
      this.x++;
    }
  }

window.addEventListener('load', function() {
    var f = new foo();
})

