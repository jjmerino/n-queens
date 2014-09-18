qi = function(n){
  var stack = [];
  var numSolutions = 0;
  var setTime = Date.now();

  //Can we make this iterative?

  //ld, rd, cols are bit patterns where
    //ld --> 1 === position attacked along left diagonal
    //rd --> 1 === position attacked along right diagonal
    //cols --> 1 === occupied column

  //n is the number of the lowest level in the decision tree
  //var fn = function(ld, cols, rd, n){

  stack[stack.length]=[0,0,0, (1<<n)-1];
  // console.log("1");
  while(stack.length > 0){
    var stackCount = stack.length-1;
    var params = stack[stackCount];
    stack.length=stackCount;
    // console.log("2");
    // console.log("params ", params);
    var ld = params[0];
    var cols = params[1];
    var rd = params[2];
    var n = params[3];

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
      //fn( (ld|bit)<<1, cols|bit, (rd|bit)>>1, n);
      console.log(stackCount + " " + stack.length);
      stack[stack.length]=[(ld|bit)<<1, cols|bit, (rd|bit)>>1, n];
      // console.log("3");
    }

    //if we have reached the lowest level,
    //we have found a complete solution
    if(cols === n){
      numSolutions++;
    }
  }
  //};
  //start
  //fn(0,0,0, (1<<n)-1);

  console.log("Solved " + n + " Queens in" , Date.now()-setTime + 'ms');
  return numSolutions;
};
