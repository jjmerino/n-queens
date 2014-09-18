q = function(n){

  var numSolutions = 0;
  var setTime = Date.now();

  //ld = left diagonal
  //rd = right diagonal
  //cols = cols
  //n is used to see when we reach the end of the cols
  var fn = function(ld, cols, rd, n){

    //column position
    var poss = ~(ld | cols | rd) & n;

    //while the column is within our board
    while(poss > 0){
      var bit = poss & -poss;
      poss -= bit;

      //recurse with new position
      fn( (ld|bit)<<1, cols|bit, (rd|bit)>>1, n);
    }

    //if we have reached the end of the line,
    //it means we have found a solution
    if(cols === n){
      numSolutions++;
    }
  };

  //start within
  fn(0,0,0, (1<<n)-1);

  console.log("Solved " + n + " Queens in" , Date.now()-setTime + 'ms');
  return numSolutions;
};
