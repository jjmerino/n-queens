exports.brain = 'this is my brain';

var workerQueue = [];
var pendingWorkers = [];
var algorithm = function(n){
  var realN = n;
  var halfN = 1<<(n>>1);
  if(n%2 !== 0){
    halfN = 1<<n;
  }
  var numSolutions = 0;
  var setTime = Date.now();
  var workers = 0;
  var useWorkers = n>4?true:false;

  var workerCallback = function(e) {
    numSolutions+=e.data;
    workers--;
    if(workers<=0){
      if(n%2===0){
        numSolutions *= 2;
      }
      //console.log(Date.now()-setTime + 'ms');
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
        workerQueue.push({ld:(ld|bit)<<1, cols:cols|bit, rd: (rd|bit)>>1, n: n,depth: depth<<1});
        workers++;
        console.log('pushing a new worker');
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
  fn(0,0,0, (1<<n)-1, 1);

  if(n%2 === 0 && !useWorkers){
    console.log("Solved " + n + " Queens in" , Date.now()-setTime + 'ms. No workers');

    numSolutions *=2;
  }else{
    //console.log("Created " + n + " Workers to find our queens");

  }
  return "Calculating...";// numSolutions;
};

var nToBin = function(n,limit){
  var str = _.reduce(_.range(0,32-n.toString(2).length+1),
      function(prev,val){
        return prev+'0';
      }
    ,'')+n.toString(2);
  return str.substr(str.length-limit);
};
exports.startWorking = function(n){
  // maybe do something else

  // run the algorithm
  algorithm(n);
};
exports.getAJob = function(){
  if(workerQueue.length > 0){
    var poped = workerQueue.pop();
    pendingWorkers.push(poped);
    return {'params':poped};
  }else{
    return {'msg':'no more jobs for now'};
  }
};
