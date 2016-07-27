$(document).ready(function() {
    // battleMusic = new Audio('http://dacjosvale.free.fr/mp3/John%20Williams%20-%20Star%20Wars%20Battle%20Theme.mp3');
    $game = $('#game');
    $select = $('#select');
    $choice = $('#choice');
    $stats = $('#battle-stats');
    $characters = $('#luke, #kenobi, #vader, #sidious');
    $infohead = $('#info-header');
    $info = $('#info');
    $reset = $('#reset');
    $attack = $('#attack');
    // Function to characters and character stats.
    function character(name, healthPoints, attackPower, counterAttack) {
        this.name = name;
        this.healthPoints = healthPoints
        this.attackPower = attackPower
        this.counterAttack = counterAttack;
        return this;
    }
    // Create characters for the game.
    function createCharacters() {
        luke = new character('Luke Skywalker', 150, 5, 5);
        $('<p id="luke-hp"></p>').appendTo('#luke');
        kenobi = new character('Obi-Wan Kenobi', 100, 1, 5);
        $('<p id="kenobi-hp"></p>').appendTo('#kenobi');
        vader = new character('Darth Vader', 500, 2, 10);
        $('<p id="vader-hp"></p>').appendTo('#vader');
        sidious = new character('Darth Sidious', 180, 1, 10);
        $('<p id="sidious-hp"></p>').appendTo('#sidious');
    }
    // Display characters on the page with all properties set at default.
    function display() {
        $choice.html('Select Your Character: ');
        $stats.empty().hide();
        $characters.off('click');
        $characters.show().attr('class', 'btn btn-lg char').appendTo('#characters');
        $('#luke-hp').html('HP: ' + luke.healthPoints);
        $('#kenobi-hp').html('HP: ' + kenobi.healthPoints);
        $('#vader-hp').html('HP: ' + vader.healthPoints);
        $('#sidious-hp').html('HP: ' + sidious.healthPoints);
        $game.hide();
        $select.show();
        $attack.show();
        $reset.hide();
    }
    // Player character selection.
    function selectCharacter() {
        $('.char').on('click', function() {
            $game.show();
            $select.hide();
            $info.html('Great choice! Now choose someone to battle against from the avaialble enemies.');
            if (charSelected) {
                return;
            }
            charSelected = true;
            // Try tying the objects to the DOM elements that were created.
            // This would significantly reduce code duplication.

            if ($(this).attr('id') == "luke") {
                $('#luke').appendTo('#character');
                $('#kenobi, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = luke;
            } else if ($(this).attr('id') == "kenobi") {
                $('#kenobi').appendTo('#character');
                $('#luke, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#kenobi-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = kenobi;
            } else if ($(this).attr('id') == "vader") {
                $('#vader').appendTo('#character');
                $('#luke, #kenobi, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#vader-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').appendTo('#character');
                $('#luke, #kenobi, #vader').toggleClass('char enemy').appendTo('#enemies');
                $('#sidious-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = sidious;
            }
            select();
            console.log('Character Selected: ' + selectedChar.name + ', HP: ' + selectedChar.healthPoints);
        });
    }
    // Select defender.
    function select() {
        $('.enemy').on('click', function() {
            $info.html('Click the ATTACK button to battle your chosen defender.');
            if (defender) return;
            defender = true;
            if ($(this).attr('id') == "luke") {
                $('#luke').toggleClass('enemy defender').appendTo('#defender');
                $('#luke-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = luke;
            } else if ($(this).attr('id') == "kenobi") {
                $('#kenobi').toggleClass('enemy defender').appendTo('#defender');
                $('#kenobi-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = kenobi;
            } else if ($(this).attr('id') == "vader") {
                $('#vader').toggleClass('enemy defender').appendTo('#defender');
                $('#vader-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').toggleClass('enemy defender').appendTo('#defender');
                $('#sidious-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = sidious;
            }
            if (first === false && second === false && third === false) {
                firstDefender = true;
                console.log('This is First');
                console.log('First Defender: ' + firstDefender);
            } else if (second === false && third === false) {
                secondDefender = true;
                $stats.empty().hide();
                console.log('This is Second');
                console.log('First Defender: ' + firstDefender);
                console.log('Second Defender: ' + secondDefender);
            } else if (first == true && second === true) {
                thirdDefender = true;
                $stats.empty().hide();
                console.log('This is Third');
                console.log('First Defender: ' + firstDefender);
                console.log('Second Defender: ' + secondDefender);
                console.log('Third Defender: ' + thirdDefender);
            }
            fight();
        });
    }
    // Check stats after attack
    function check() {
        // check if defender health is 0
        // check if defender is defeated
        if (selectedChar.healthPoints <= 0) {
            $attack.hide();
            $reset.show();
            $stats.html('<div id="defeat" class="alert alert-danger">You Were Defeated!</div>');
            return;
        }
        if (thirdDefender === true && selectedDef.isDefeated()) {
            playerWin = true;
            $attack.hide();
            $reset.show();
            $stats.html('<div id="defeat" class="alert alert-success">You Won!</div>');
            return;
        } else if (secondDefender === true && thirdDefender === false && selectedDef.isDefeated()) {
            $('.defender').hide();
            $('#defender-hp').attr('id', 'defender-second');
            $info.html('On to the last one!');
            $stats.html('You defeated ' + selectedDef.name);
            second = true;
            defender = false;
            select();
            return;
        } else if (secondDefender === false && selectedDef.isDefeated()) {
            $('.defender').hide();
            $('#defender-hp').attr('id', 'defender-first');
            $info.html('Nice! Now choose the next defender.');
            $stats.html('You defeated ' + selectedDef.name);
            first = true;
            defender = false;
            select();
            return;
        }
    }
    // BATTLE!
    function fight() {
        character.prototype.hit = function(who) {
            if (this.healthPoints > 0) {
                this.counter(who.counterAttack);
                who.healthPoints -= this.attackPower;
            }
            return this;
        }
        character.prototype.counter = function(howhard) {
            this.healthPoints -= howhard;
            return this;
        }
        character.prototype.isDefeated = function() {
            return this.healthPoints <= 0;
        }
        $attack.on('click', function() {
            $stats.show();
            if (playerWin) {
                return;
            }
            if (defender === true) {
                selectedChar.hit(selectedDef);
                $stats.html('You attacked ' + selectedDef.name + ' for ' + selectedChar.attackPower + ' damage. <br/>' + selectedDef.name + ' attacked you for ' + selectedDef.counterAttack + ' damage.');
                $('#character-hp').html('HP: ' + selectedChar.healthPoints);
                $('#defender-hp').html('HP: ' + selectedDef.healthPoints);
                console.log('Character HP: ' + selectedChar.healthPoints);
                console.log('Defender HP: ' + selectedDef.healthPoints);
            } else {
                return;
            }
            selectedChar.attackPower *= 2;
            check();
        });
    }
    // Setup the game for initial play.
    function play() {
        selectedChar = '';
        selectedDef = '';
        firstDefender = false;
        secondDefender = false;
        thirdDefender = false;
        charSelected = false;
        defender = false;
        first = false;
        second = false;
        third = false;
        playerWin = false;


        $('#character-hp, #defender-hp, #defender-first, #defender-second').remove();

        createCharacters();
        display();
        selectCharacter();

        $infohead.html('TO PLAY');
        $info.html('Chose a character!');
    }
    // Restart the game to play a New Game.
    $('#reset').on('click', function() {
        play();
    });
    play();

});
