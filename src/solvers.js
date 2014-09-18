/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.permutationToMatrix = function(permutations){
  var solution =[];
  var n;
  if(Array.isArray(permutations)){
    n = permutations.length;
  }else{
    n = permutations;
  }

  for(var i=0; i<n; i++){
    var row = [];
    for(var j=0; j<n; j++){
      if(j===permutations[i]){
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }

  return solution;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var permutations = _.shuffle(_.range(0, n));
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return permutationToMatrix(permutations);
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var choices = _.range(0, n);
  var permutations = [];

  var permute = function(roundsToGo, playedSoFar) {
    if(_.uniq(playedSoFar).length !== playedSoFar.length){
      return true;
    }
    if( roundsToGo === 0 ){
      permutations.push( playedSoFar );
      return;
    }
    for( var i = 0; i < choices.length; i++ ){
      var currentPlay = choices[i];
      permute( roundsToGo-1, playedSoFar.concat(currentPlay));
    }
  };
  permute( n, []);
  return permutations.length;
};
var solveNQueens = function(n,stop){
  var time = Date.now();
  var choices = _.range(0, n);
  var permutations = [];
  var conf = {};
  conf.depth =  n;
  conf.currentSolution =[];
  var stack = [];
  stack.push(conf);

  while(stack.length>0){
    var v = stack.pop();
    if(!window.lastTwoPermutationsValid(v.currentSolution)){
      //Prune branches with conflicts
      continue;
    }
    if( v.depth === 0 ){
      // console.log('valid to stack');
      // console.log('Permutation N', permutations.length);
      // console.log(v.currentSolution.slice());

      permutations.push( v.currentSolution );
      if(stop){
        return permutations;
      }
      continue;
    }
    for( var i = 0; i < choices.length; i++ ){
      if(v.depth === n && i>=choices.length/2&&n%2===0){
        break;
      }
      var currentPlay = choices[i];

      stack.push( {depth: v.depth-1, currentSolution: v.currentSolution.concat(currentPlay)});

    }
  }

  console.log("Found ",permutations.length,"permutations in: ",Date.now()-time,"ms");
  return permutations;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var rawSolution = solveNQueens(n, true)[0];
  if(!rawSolution){
    return permutationToMatrix(n);
  }
  return permutationToMatrix(rawSolution);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //Bit Shifting Solution
  return q(n);

  //Interative Solution
  // var numPermutations = solveNQueens(n).length;
  // if(n>=4&&n%2===0){return  numPermutations*2}
  // return numPermutations;
};
// This special case is only valid if we are doing recursively
window.lastTwoPermutationsValid = function(permutation){
  //assume prefix is correct, verify only most recent placement
  var i = permutation.length-1;
  if(i<0){i=0;}
  for (var j = permutation.length - 1; j >= 0; j--) {
    if(j<0){break;}
    var val= permutation[i];
    var val2= permutation[j];
    if(j !== i){
      if(Math.abs(val-val2) === Math.abs(i-j) || val2-val === 0){
        return false;
      }
    }
  }
  return true;
};

window.permutationIsValid = function(permutation){
  for (var i = permutation.length - 1; i >= 0; i--) {
    for (var j = permutation.length - 1; j >= 0; j--) {
      var val= permutation[i];
      var val2= permutation[j];
      if(j !== i){
        if(Math.abs(val-val2) === Math.abs(i-j) || val2-val === 0){
          console.log("p-Length: " + permutation.length + " i: " + i + " j: " + j);
          return false;
        }
      }
    }
  }
  return true;
};
