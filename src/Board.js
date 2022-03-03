// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    //returns the column index on the first row
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var rowToCheck = this.rows()[rowIndex];
      var count = 0;
      for (let i = 0; i < rowToCheck.length; i++) {
        if (rowToCheck[i] === 1) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for (let i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //colIndex is the index we need to check on EACH array
      var board = this.rows();
      var count = 0;
      //iterate through the board
      //note: this.attributes.n = n. the size of the board (n x n).
      for (var i = 0; i < board.length; i++) {
        var currentRow = board[i];
        if (currentRow[colIndex] === 1) {
          count++;
          if (count > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //what is n / size of board?
      var boardSize = this.rows().length;
      //for each number in the board
      for (var i = 0; i < boardSize; i++) {
        //check if each column has conflict or not.
        if (this.hasColConflictAt(i)) {
          //if there is a conflict, return true;
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //given major (a index for the column, at the starting point where the collision beings)
      //check each value at row +1 and column +1 values
      var board = this.rows();
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        var currentRow = board[i];
        if (currentRow[majorDiagonalColumnIndexAtFirstRow] === 1) {
          count++;
        }
        majorDiagonalColumnIndexAtFirstRow++;
      }
      return count > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //passes in each major index (starting from 2 - n) into hasMajorconflict function
      var board = this.rows();
      for (let i = (2 - board.length); i < board.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;

      // //stays in the same row, but checks every column
      // for(var i = 0; i < board.length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i++, 0)) {
      //     return true;
      //   }
      // }
      // //stay in the same column, check every row
      // for(i = 1; i < board.length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(0, i++)) {
      //     return true;
      //   }
      // }

      // return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //given major (a index for the column, at the starting point where the collision beings)
      //check each value at row +1 and column +1 values
      var board = this.rows();
      var count = 0;

      for (var i = 0; i < board.length; i++) {
        var currentRow = board[i];
        if (currentRow[minorDiagonalColumnIndexAtFirstRow] === 1) {
          count++;
        }
        minorDiagonalColumnIndexAtFirstRow--;
      }
      return count > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //passes in each major index (starting from 2 - n) into hasMajorconflict function
      var board = this.rows();
      for (let i = (board.length + 1); i > 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
