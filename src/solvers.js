/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //solution should be matrix (array of arrays)
  var possibleCombos = [];
  for (let i = 0; i < n; i++) {
    possibleCombos.push(Array(n).fill(0));
    possibleCombos[i][i] = 1;
  }

  //inner recursive function (n, currentCombo)
  var createCombination = function(n, currentCombo = []) {
  //variable currentCombo = currentCombination || [];
    currentCombo = currentCombo;
    //if currentCombo.length === n
    var boardToCheck = new Board(currentCombo);
    if (currentCombo.length === n && !boardToCheck.hasAnyRooksConflicts()) {
      solution = currentCombo;
      // //if so, check if hasRookConflict
      // if (!boardToCheck.hasAnyRooksConflicts()) {
      //   //if conflict, do nothing
      //   //if no conflict, solution = currentCombo
      //   //return;
      //   console.log(currentCombo);
      //   solution = currentCombo;
      //   return;
    } else {
      possibleCombos.forEach(function(currentPlay) {

        if(currentCombo.indexOf(currentPlay) !== -1) {
        } else {
          currentCombo.push(currentPlay);
          createCombination(n, currentCombo);
        }
      });
        //inside here, if currentPlay = rounds //dont add it
      //call the recursive function with n.

    }
    //create a combination of possible placements in a row
    //for each combination
      //check if combination already exists in currentCombo,
        //if it doesn't, add it to the combo
  };

  createCombination(n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var possibleCombos = [];
  for (let i = 0; i < n; i++) {
    possibleCombos.push(Array(n).fill(0));
    possibleCombos[i][i] = 1;
  }

  //inner recursive function (n, currentCombo)
  var createCombination = function(n, currentCombo = []) {
    currentCombo = currentCombo;
    var boardToCheck = new Board(currentCombo);
    if (currentCombo.length === n && !boardToCheck.hasAnyRooksConflicts()) {
      solutionCount++;
      return solutionCount;
    } else {
      possibleCombos.forEach(function(currentPlay) {
        if(currentCombo.indexOf(currentPlay) !== -1) {
        } else {
          currentCombo.push(currentPlay);
          createCombination(n, currentCombo);
          return solutionCount;
        }
      });
    }
  };

  createCombination(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
