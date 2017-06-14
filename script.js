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
				$(this).addClass('box-filled-1');
			} else {
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
					$('.screen-win').addClass('screen-win-one');
				} else if ( game.winner === 2 ) {
					$('.screen-win p').html('Winner');
					$('.screen-win').addClass('screen-win-two');
				} else {
					$('.screen-win p').html('It\'s a tie!');
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
