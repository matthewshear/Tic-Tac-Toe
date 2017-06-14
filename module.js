!function() {

	function Game() {

		// initialize core object properties 
		this.moves = 0;
		this.turn = 1;
		this.winner = 0;
		this.player1Boxes = [];
		this.player2Boxes = [];
		this.board = [0,0,0,0,0,0,0,0,0];
		this.playerName = '';

		// resets the game and displays the start game screen
		this.resetGame = function() {

			// reset game variables
			this.moves = 0;
			this.turn = 1;
			this.winner = 0;
			this.player1Boxes = [];
			this.player2Boxes = [];
			this.board = [0,0,0,0,0,0,0,0,0];			

			// remove all box checked classes and images
			$('.box').removeClass('box-filled-1');
			$('.box').removeClass('box-filled-2');
			$('.box').css('background-image', 'none');

			// show the start screen
			$('.board').hide();
			$('.screen-win').hide();
			$('.screen-start').show();

			// update the current players turn box
			this.displayTurn();

		};

		// displays the game board
		this.startGame = function() {
			$('.board').show();
			$('.screen-win').hide();
			$('.screen-start').hide();
		};

		// updates the current players turn box
		this.displayTurn = function() {
			if ( this.turn === 1 ) {
				$("#player2").removeClass('active');
				$("#player1").addClass('active');
			} else {
				$("#player1").removeClass('active');
				$("#player2").addClass('active');
			}
		};

		// change the player turn and call the displayTurn method to show the change
		this.changeTurn = function() {
			if ( this.turn === 1 ) {
				this.turn = 2;
			} else {
				this.turn = 1;
			}
			this.displayTurn();
		};

	    // check a variation for a win (used in checkBoard method)
	    this.checkCells = function(c1, c2, c3) {
	        return ((this.board[c1] === this.board[c2]) && (this.board[c2] === this.board[c3]) && (this.board[c1] > 0));
	    };

		// check every variation for a win
 		this.checkBoard = function() {
	
	        var win = 0;

	        // top horizontal check
	        if (this.checkCells(0, 1, 2)) {
	          win = this.board[1];
	        // middle horizontal check
	        } else if (this.checkCells(3, 4, 5)) {
	          win = this.board[3];
	        // bottom horizontal check
	        } else if (this.checkCells(6, 7, 8)) {
	          win = this.board[6];
	        // left vertical check
	        } else if (this.checkCells(0, 3, 6)) {
	          win = this.board[0];
	        // middle vertical check
	        } else if (this.checkCells(1, 4, 7)) {
	          win = this.board[1];
	        // bottom vertical check
	        } else if (this.checkCells(2, 5, 8)) {
	          win = this.board[2];
	        // left to right diagonal check
	        } else if (this.checkCells(0, 4, 8)) {
	          win = this.board[0];
	        // right to left diagonal check
	        } else if (this.checkCells(2, 4, 6)) {
	          win = this.board[2];
	        }

	        // return if any winners or not
	        return win;	        

	      };

	}

// ----------------------------------------------------------------- //

	// create instance of Game object
	var game = new Game();

	// start game
	game.resetGame();

	$(".screen-start .button").click( function() {
		game.startGame();
		game.displayTurn();
	});

	$(".screen-win .button").click( function() {
		game.resetGame();
		game.startGame();
	});

	$(".box").click( function(box) {

		// get box index
		var boxIndex = $(".box").index(this);

		// if box not used
		if ( game.board[boxIndex] === 0 ) {

			game.moves++;

			// set background to X or O
			if ( game.turn === 1 ) {
				$(this).removeClass('box-filled-2');
				$(this).addClass('box-filled-1');
			} else if ( game.turn === 2) {
				$(this).removeClass('box-filled-1');
				$(this).addClass('box-filled-2');
			}

			// record box as used and by which player
			game.board[boxIndex] = game.turn;

			//if game won or out of moves
			if ( game.checkBoard() !== 0 || game.moves === 9 ) {

				// if out of moves then set the winner to nobody
				if ( game.checkBoard() === 0 && game.moves === 9 ) {
					game.winner = 0;
				// else set the winner to the current player
				} else {
					// set the winner of the game to the current player
					game.winner = game.turn;
				}

				// set the background color to that of the winner
				if ( game.winner === 1 ) {
					$('.screen-win p').html('Winner');
					$('.screen-win').removeClass('screen-win-two');
					$('.screen-win').removeClass('screen-win-tie');
					$('.screen-win').addClass('screen-win-one');
				} else if ( game.winner === 2 ) {
					$('.screen-win p').html('Winner');
					$('.screen-win').removeClass('screen-win-one');
					$('.screen-win').removeClass('screen-win-tie');
					$('.screen-win').addClass('screen-win-two');
				} else {
					$('.screen-win p').html('It\'s a tie!');
					$('.screen-win').removeClass('screen-win-one');
					$('.screen-win').removeClass('screen-win-two');
					$('.screen-win').addClass('screen-win-tie');
				}

				// display winner screen
				$('.board').hide();
				$('.screen-start').hide();
				$('.screen-win').show();

			} else {
				// change turns
				game.changeTurn();				
			}
	
		}
		
	});


	$(".box").hover( 

		function(box) {

			// get box index
			var boxIndex = $(".box").index(this);
						
			// if box not used
			if ( game.board[boxIndex] === 0 ) {

				// set background to X or O
				if ( game.turn === 1 ) {
					$(this).css('background-image', 'url(img/o.svg)');
				} else {
					$(this).css('background-image', 'url(img/x.svg)');
				}

			}

		}, function(box) {

			// get box index
			var boxIndex = $(".box").index(this);

			// if box not used
			if ( game.board[boxIndex] === 0 ) {

				// set background to X or O
				if ( game.turn === 1 ) {
					$(this).css('background-image', 'none');
				} else {
					$(this).css('background-image', 'none');
				}

			}

		}

	);

}();