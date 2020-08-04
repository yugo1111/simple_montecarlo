function times_define( x ) {
    return function( y ) {
        return x * y;
    }
}

var times = times_define( 2 );

console.log( times( 5 ) );