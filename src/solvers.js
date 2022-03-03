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
  var board = new Board({n: n});
  var solution = board.rows();

  var innerFunc = function(row = 0) {
    //base case
    if(row === n) {
      solution = JSON.parse(JSON.stringify(board.rows()));
      return;
    }
    //iterate over each column in the row
    for(let i = 0; i < n; i++) {
    //toggle piece, (argument = row passed in)
      board.togglePiece(row, i);
      //check for conflict
      if (!board.hasAnyRooksConflicts()) {
      //if no conflict
        innerFunc(row + 1);
        //call the recursive function with row + 1
      } else {
        board.togglePiece(row, i);
      }
    }
  }

  innerFunc();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var innerFunc = function(row = 0) {
    //base case
    if(row === n) {
      solutionCount++;
      return;
    }

    //iterate over each column in the row
    for(let i = 0; i < n; i++) {
    //toggle piece, (argument = row passed in)
      board.togglePiece(row, i);
      //check for conflict
      if (!board.hasAnyRooksConflicts()) {
      //if no conflict
        //call the recursive function with row + 1
        innerFunc(row + 1);
      }
      board.togglePiece(row, i);
    }
  }

  innerFunc();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  var innerFunc = function(row = 0) {
    //base case
    if(row === n) {
      solution = JSON.parse(JSON.stringify(board.rows()));
      return solution;
    }

    //iterate over each column in the row
    for(let i = 0; i < n; i++) {
    //toggle piece, (argument = row passed in)
      board.togglePiece(row, i);
      //check for conflict
      if (!board.hasAnyQueensConflicts()) {
      //if no conflict
        innerFunc(row + 1);
        //call the recursive function with row + 1
      }
      board.togglePiece(row, i);
    }
  }

  innerFunc();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var arr = [];

  var innerFunc = function(row = 0) {
    //base case
    if(row === n) {
      solutionCount++;
      arr.push([...JSON.parse(JSON.stringify(board.rows()))]);
      return;
    }

    //iterate over each column in the row
    for(let i = 0; i < n; i++) {
    //toggle piece, (argument = row passed in)
      board.togglePiece(row, i);
      //check for conflict
      if (!board.hasAnyQueensConflicts()) {
      //if no conflict
        //call the recursive function with row + 1
        innerFunc(row + 1);
      }
      board.togglePiece(row, i);
    }
  }
  if (n === 7) {
  }
  innerFunc();

  console.log(arr)
  console.log('Number of solutions for ' + n + ' queen:', solutionCount);
  return solutionCount;
};










// window.findNRooksSolution = function(n) {
//   var solution = undefined; //solution should be matrix (array of arrays)
//   var possibleCombos = [];
//   for (let i = 0; i < n; i++) {
//     possibleCombos.push(Array(n).fill(0));
//     possibleCombos[i][i] = 1;
//   }

//   //inner recursive function (n, currentCombo)
//   var createCombination = function(n, currentCombo = []) {
//   //variable currentCombo = currentCombination || [];
//     currentCombo = currentCombo;
//     //if currentCombo.length === n
//     var boardToCheck = new Board(currentCombo);
//     if (currentCombo.length === n && !boardToCheck.hasAnyRooksConflicts()) {
//       solution = currentCombo;
//       // //if so, check if hasRookConflict
//       // if (!boardToCheck.hasAnyRooksConflicts()) {
//       //   //if conflict, do nothing
//       //   //if no conflict, solution = currentCombo
//       //   //return;
//       //   console.log(currentCombo);
//       //   solution = currentCombo;
//       //   return;
//     } else {
//       possibleCombos.forEach(function(currentPlay) {
//         if(currentCombo.indexOf(currentPlay) === -1) {
//           currentCombo.push(currentPlay);
//           createCombination(n, currentCombo);
//         }
//         // if(currentCombo.indexOf(currentPlay) !== -1) {
//         // } else {
//         //   currentCombo.push(currentPlay);
//         //   createCombination(n, currentCombo);
//         // }
//       });
//         //inside here, if currentPlay = rounds //dont add it
//       //call the recursive function with n.

//     }
//     //create a combination of possible placements in a row
//     //for each combination
//       //check if combination already exists in currentCombo,
//         //if it doesn't, add it to the combo
//   };

//   createCombination(n);
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;




//     //base case
//       //solution++, return.

//     //if row hits length(n), counter++ and return
//     //iterate over each column in the row
//       //toggle piece, (argument = row passed in)
//         //check for conflict
//         //if no conflict
//           //call the recursive function with row+1
//         //untoggle piece

// };