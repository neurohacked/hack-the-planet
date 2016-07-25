$(document).ready(function() {
	var charSelected, firstDefender, secondDefender, thirdDefender, playerWin;

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
		firstDefender = false;
		secondDefender = false;
		thirdDefender = false;
		charSelected = false;
		playerWin = false;
		$('.choice').html('Select Your Character: ')
		$('#luke, #obi-wan, #vader, #boba').attr('class', 'btn btn-lg char').appendTo('#characters');
		$('#luke, #obi-wan, #vader, #boba').off('click');

		selectChar();

		console.log('Is Character Selected: ' + charSelected);
		console.log('Is First Defender Selected: ' + firstDefender);
	}
	// Select character
	function selectChar() {
		$('.char').on('click', function() {
			$('.choice').html('Your Character: ');
			if (charSelected) return;
			charSelected = true;
			if ($(this).attr('id') == "luke") {
				$('#obi-wan, #vader, #boba').toggleClass('char enemy').appendTo('#enemies');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "obi-wan") {
				$('#luke, #vader, #boba').toggleClass('char enemy').appendTo('#enemies');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "vader") {
				$('#luke, #obi-wan, #boba').toggleClass('char enemy').appendTo('#enemies');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "boba") {
				$('#luke, #obi-wan, #vader').toggleClass('char enemy').appendTo('#enemies');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			}

			selectFirst();
			console.log('Character Selected: ' + charSelected);
		});
	}

	// Select a defender
	function selectFirst() {
		$('.enemy').on('click', function() {
			if (firstDefender) return;
			firstDefender = true;
			if ($(this).attr('id') == "luke") {
				$('#luke').toggleClass('enemy defender').appendTo('#defender');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "obi-wan") {
				$('#obi-wan').toggleClass('enemy defender').appendTo('#defender');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "vader") {
				$('#vader').toggleClass('enemy defender').appendTo('#defender');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			} else if ($(this).attr('id') == "boba") {
				$('#boba').toggleClass('enemy defender').appendTo('#defender');
				$('#luke, #obi-wan, #vader, #boba').off('click');
			}
			console.log('First Defender Selected: ' + firstDefender);
		});
	}
	// BATTLE!
	function fight() {

	}

	// Start New Game
	$('#reset').on('click', function() {
		play();
	});
	play();
});
