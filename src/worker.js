var numSolutions=0;
//n is the number of the lowest level in the decision tree
var fn = function(ld, cols, rd, n, depth){

  // find a position that does not collide
  // with existing queens attack locations
  //
  // (ld | cols | rd) contains all positions under attack
  // ~(ld | cols | rd) contains all safe positions
  // &n limits the available positions by the size of the board
  var poss = ~(ld | cols | rd) & n;

  //while there is a safe position for a new queen
  while(poss > 0){
    //this will store the least significant
    //bit pattern for the safe location
    var bit = poss & -poss;

    //remove the stored safe position from
    //available safe positions
    poss -= bit;

    //recurse with new position occupied to find more
    //safe areas to place queens
    // console.log(bit , " " , 1<<(realN/2));

    fn( (ld|bit)<<1, cols|bit, (rd|bit)>>1, n, depth<<1);

  }

  //if we have reached the lowest level,
  //we have found a complete solution
  if(cols === n){
    numSolutions++;
  }
};
self.addEventListener('message', function(e) {
  var data = e.data;
  fn(data.ld,data.cols,data.rd,data.n,data.depth);
  self.postMessage(numSolutions);
}, false);
