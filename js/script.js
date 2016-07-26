$(document).ready(function() {
    battleMusic = new Audio('http://dacjosvale.free.fr/mp3/John%20Williams%20-%20Star%20Wars%20Battle%20Theme.mp3');
    $choice = $('#choice');
    $stats = $('#battle-stats');
    $characters = $('#luke, #kenobi, #vader, #sidious');

    // Create characters for the game
    function createCharacters() {
        luke = {
            name: "Luke Skywalker",
            hp: 150,
            ap: 4,
            ca: 15,
            atk: function(enemy) {
                enemy.hp = enemy.hp - 10;
            },
            catk: function(attacker) {
                attacker.hp = attacker.hp - luke.ca;
            }
        }
        kenobi = {
            name: "Obi-Wan Kenobi",
            hp: 100,
            ap: 400,
            ca: 5,
            atk: function(enemy) {
                enemy.hp = enemy.hp - kenobi.ap;
            },
            catk: function(attacker) {
                attacker.hp = attacker.hp - kenobi.ca;
            }
        }
        vader = {
            name: "Darth Vader",
            hp: 120,
            ap: 2,
            ca: 20,
            atk: function(enemy) {
                enemy.hp = enemy.hp - 10;
            },
            catk: function(attacker) {
                attacker.hp = attacker.hp - vader.ca;
            }
        }
        sidious = {
            name: "Darth Sidious",
            hp: 180,
            ap: 1,
            ca: 25,
            atk: function(enemy) {
                enemy.hp = enemy.hp - 10;
            },
            catk: function(attacker) {
                attacker.hp = attacker.hp - sidious.ca;
            }
        }
    }

    // Player character selection.
    function selectCharacter() {
        $('.char').on('click', function() {
            $choice.html('Your Character: ');
            if (charSelected) return;
            charSelected = true;
            // Try tying the objects to the DOM elements that were created.
            // This would significantly reduce code duplication.


            // $('#kenobi, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
            // $('#luke, #kenobi, #vader, #sidious').off('click');
            // selectedChar = char.name;


            if ($(this).attr('id') == "luke") {
                $('#kenobi, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedChar = luke;
            } else if ($(this).attr('id') == "kenobi") {
                $('#luke, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedChar = kenobi;
            } else if ($(this).attr('id') == "vader") {
                $('#luke, #kenobi, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedChar = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#luke, #kenobi, #vader').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedChar = sidious;
            }

            selectFirst();
            console.log('Character Selected: ' + selectedChar.name + ', HP: ' + selectedChar.hp);
        });
    }

    // Select first defender
    function selectFirst() {
        $('.enemy').on('click', function() {
            if (defSelected) return;
            defSelected = true;
            firstDefender = true;
            if ($(this).attr('id') == "luke") {
                $('#luke').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedDef = luke;
                console.log('You\'re fighting ' + luke.name);
            } else if ($(this).attr('id') == "kenobi") {
                $('#kenobi').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedDef = kenobi;
                console.log('You\'re fighting ' + kenobi.name);
            } else if ($(this).attr('id') == "vader") {
                $('#vader').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedDef = vader;
                console.log('You\'re fighting ' + vader.name);
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                selectedDef = sidious;
                console.log('You\'re fighting ' + sidious.name);
            }
            // selectedDef = firstDefender;
            fight();
        });
    }
    // Select second defender
    function selectSecond() {
        $('.enemy').on('click', function() {
            if (defSelected) return;
            defSelected = true;
            if ($(this).attr('id') == "luke") {
                $('#luke').toggleClass('enemy second').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                secondDefender = luke;
                console.log('You\'re fighting ' + luke.name);
            } else if ($(this).attr('id') == "kenobi") {
                $('#kenobi').toggleClass('enemy second').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                secondDefender = kenobi;
                console.log('You\'re fighting ' + kenobi.name);
            } else if ($(this).attr('id') == "vader") {
                $('#vader').toggleClass('enemy second').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                secondDefender = vader;
                console.log('You\'re fighting ' + vader.name);
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').toggleClass('enemy second').appendTo('#defender');
                $('#luke, #kenobi, #vader, #sidious').off('click');
                secondDefender = sidious;
                console.log('You\'re fighting ' + sidious.name);
            }
            selectedDef = secondDefender;
            console.log('Defender: ' + defSelected)
            fight();
        });
    }
    // Check stats after attack
    function check() {
        // check if defender health is 0
        // check if defender is defeated
        if (selectedChar.hp <= 0) {
            alert('You Lost!');
            return;
        }
        if (selectedDef.hp <= 0) {
            $stats.html('You defeated ' + selectedDef.name);
            firstDefender.hp = 1;
            $('.first').hide();
            defSelected = false;
            selectSecond();
            return;
        } else if (secondDefender.hp <= 0) {
            // selectThird();
        } else if (thirdDefender.hp <= 0) {
            playerWin = true;
            alert('You Won!');
        }
    }
    // BATTLE!
    function fight() {
        $('#attack').on('click', function() {
            if (firstDefender === true) {
            selectedChar.atk(selectedDef) && selectedDef.catk(selectedChar);
            $stats.html('You attacked ' + selectedDef.name + ' for ' + selectedChar.ap + ' damage. <br/>' + selectedDef.name + ' attacked you for ' + selectedDef.ca + ' damage.');
        } else if (secondDefender === true) {
            selectedChar.atk(selectedDef) && selectedDef.catk(selectedChar);
            $stats.html('You attacked ' + selectedDef.name + ' for ' + selectedChar.ap + ' damage. <br/>' + selectedDef.name + ' attacked you for ' + selectedDef.ca + ' damage.');
        } else if (thirdDefender === true) {
            selectedChar.atk(selectedDef) && selectedDef.catk(selectedChar);
            $stats.html('You attacked ' + selectedDef.name + ' for ' + selectedChar.ap + ' damage. <br/>' + selectedDef.name + ' attacked you for ' + selectedDef.ca + ' damage.');
        }
        selectedChar.ap *= 2;
        check();
        });
    }
    // Display characters on the page with all properties set at default.
    function displayCharacters() {
        $choice.html('Select Your Character: ');
        $stats.empty();
        $characters.off('click');
        $characters.show().attr('class', 'btn btn-lg char').appendTo('#characters');
        $('#luke-hp').html('HP: ' + luke.hp);
        $('#kenobi-hp').html('HP: ' + kenobi.hp);
        $('#vader-hp').html('HP: ' + vader.hp);
        $('#sidious-hp').html('HP: ' + sidious.hp);
    }
    // Setup the game for initial play.
    function play() {
        selectedChar = '';
        selectedDef = '';
        firstDefender = false;
        secondDefender = false;
        thirdDefender = false;
        charSelected = false;
        defSelected = false;
        firstDefeated = false;
        secondDefeated = false;
        thirdDefeated = false;
        playerWin = false;

        createCharacters()
        displayCharacters();
        selectCharacter();

        console.log('Is Character Selected: ' + charSelected);
        console.log('Is Defender Selected: ' + defSelected);
    }
    // Restart the game to play a New Game.
    $('#reset').on('click', function() {
        play();
    });
    play();

});
