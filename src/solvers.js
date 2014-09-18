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
  var n = permutations.length;
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
var solveNQueens = function(n){
  var choices = _.range(0, n);
  var permutations = [];
  var conf = {};
  conf.depth =  n;
  conf.currentSolution =[];
  var stack = [];
  stack.push(conf);

  while(stack.length>0){
    var v = stack.pop();
    if(!window.permutationIsValid(v.currentSolution)){
      continue;
    }
    if( v.depth === 0 ){
      console.log('valid to stack');
      permutations.push( v.currentSolution );
      continue;
    }
    for( var i = 0; i < choices.length; i++ ){
      var currentPlay = choices[i];
      stack.push( {depth: v.depth-1, currentSolution: v.currentSolution.concat(currentPlay)});
    }
  }
  console.log(permutations);
  return permutations.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

//    procedure DFS-iterative(G,v):
// 2      let S be a stack
// 3      S.push(v)
// 4      while S is not empty
// 5            v ← S.pop()
// 6            if v is not labeled as discovered:
// 7                label v as discovered
// 8                for all edges from v to w in G.adjacentEdges(v) do
// 9                    S.push(w)





  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.permutationIsValid = function(permutation){
  var result = true;
  _.each(permutation, function(val, index, collection){
    _.each(permutation, function(val2, index2){
      if(index !== index2){
        if(Math.abs(val-val2) === Math.abs(index-index2) || val2-val === 0){
          result = false;
        }
      }
    });
  });
  return result;
};
