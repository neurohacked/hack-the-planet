$(document).ready(function() {
	var userChoice, charSelected, defSelected, playerWin;

	var chars = {
			luke: {
				name: "Luke Skywalker",
				hp: 175,
				atk: function(enemy) {
					enemy.hp = enemy.hp - 10;
				},
				catk: 5
			},
			obi: {
				name: "Obi-Wan Kenobi",
				hp: 150,
				atk: function(enemy) {
					enemy.hp = enemy.hp - 10;
				},
				catk: 5
			},
			vader: {
				name: "Darth Vader",
				hp: 200,
				atk: function(enemy) {
					enemy.hp = enemy.hp - 10;
				},
				catk: 5
			},
			boba: {
				name: "Boba Fett",
				hp: 125,
				atk: function(enemy) {
					enemy.hp = enemy.hp - 10;
				},
				catk: 5
			},
		}
		//Play the game
		function play() {
			charSelected = false;
			defSelected = false;
			playerWin = false;
			$('.choice').html('Select Your Character: ')
			$('#luke, #obi-wan, #vader, #boba').appendTo('.characters');

			console.log('Is Character Selected: ' + charSelected);
			console.log('Is Defender Selected: ' + defSelected);
		}
	$('.char').click(function() {
		$('.choice').html('Your Character: ');
		if (game.play.charSelected === true) {
			return;
		} else if ($(this).attr('id') == "luke") {
			$('#obi-wan, #vader, #boba').toggleClass('char enemy').appendTo('.enemies');
		} else if ($(this).attr('id') == "obi-wan") {
			$('#luke, #vader, #boba').toggleClass('char enemy').appendTo('.enemies');
		} else if ($(this).attr('id') == "vader") {
			$('#luke, #obi-wan, #boba').toggleClass('char enemy').appendTo('.enemies');
		} else if ($(this).attr('id') == "boba") {
			$('#luke, #obi-wan, #vader').toggleClass('char enemy').appendTo('.enemies');
		}
		game.play.charSelected = true;
		console.log('Character Selected: ' + game.play.charSelected);
	});

	// Select a defender
	$('.enemy').click(function() {
		// if (game.play.defSelected === true) {
		// 	return;
		// }
		if ($(this).attr('id') == "luke") {
			$('#luke').attr('class', 'btn btn-lg defender').appendTo('.defender');
		} else if ($(this).attr('id') == "obi-wan") {
			$('#luke, #vader, #boba').attr('class', 'btn btn-lg enemy').appendTo('.enemies');
		} else if ($(this).attr('id') == "vader") {
			$('#luke, #obi-wan, #boba').attr('class', 'btn btn-lg enemy').appendTo('.enemies');
		} else if ($(this).attr('id') == "boba") {
			$('#luke, #obi-wan, #vader').attr('class', 'btn btn-lg enemy').appendTo('.enemies');
		}
		console.log('Defender Selected: ' + game.play.defSelected);
	});
	// Fight

	// Start New Game
	$('#reset').click(function() {
		play();
	});
	play();
});
