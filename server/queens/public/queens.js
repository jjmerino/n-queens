
var computationDone = function(solutions){
  console.log('TELL THE SERVER WE GOT '+solutions+' Solutions');
};
var partialQueen = function(paramsObj){
  console.log("IN QUEENS");
  var ld = paramsObj.ld;
  var cols = paramsObj.cols;
  var rd = paramsObj.rd;
  var startn = paramsObj.rd;
  var depth = paramsObj.depth;
  var actualN = paramsObj.actualN;

  var halfN = 1<<(actualN>>1);
  if(actualN%2 !== 0){
    halfN = 1<<actualN;
  }
  var numSolutions = 0;
  var setTime = Date.now();
  var workers = 0;
  var useWorkers = false;//n>12?true:false;

  var workerCallback = function(e) {
    numSolutions+=e.data;
    workers--;
    if(workers<=0){
      computationDone();
      console.log("Solved " + n + " Queens in" , Date.now()-setTime + 'ms. With workers');
      console.log('Solutions = '+numSolutions);

    }
  };
  //Can we make this iterative?

  //ld, rd, cols are bit patterns where
    //ld --> 1 === position attacked along left diagonal
    //rd --> 1 === position attacked along right diagonal
    //cols --> 1 === occupied column

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
      if(depth === 1&& bit >= halfN){
      }else if(depth===1&& useWorkers){
        console.log('depth of 1');
        var worker = new Worker('src/worker.js');
        worker.addEventListener('message', workerCallback, false);
        worker.postMessage({ld:(ld|bit)<<1, cols:cols|bit, rd: (rd|bit)>>1, n: n,depth: depth<<1});
        workers++;
      }else{
        fn( (ld|bit)<<1, cols|bit, (rd|bit)>>1, n, depth<<1);
      }
    }

    //if we have reached the lowest level,
    //we have found a complete solution
    if(cols === n){
      numSolutions++;
    }
  };
  //start
  console.log('call recursive function');
  fn(ld,cols,rd,startn, depth);

  if(!useWorkers){
    computationDone(numSolutions);
    console.log("Solved " + n + " Queens in" , Date.now()-setTime + 'ms. No workers');

    numSolutions *=2;
  }else{
    //console.log("Created " + n + " Workers to find our queens");

  }
  return "Calculating...";// numSolutions;
};
