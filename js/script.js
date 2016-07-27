$(document).ready(function() {
    $game = $('#game');
    $select = $('#select');
    $choice = $('#choice');
    $stats = $('#battle-stats');
    $characters = $('#wyrm, #ph15h, #brute, #fdat');
    $infohead = $('#info-header');
    $info = $('#info');
    $reset = $('#reset');
    $attack = $('#attack');
    // Function to characters and character stats.
    function character(name, dataConnection, hackPower, counterHack) {
        this.name = name;
        this.dataConnection = dataConnection
        this.hackPower = hackPower
        this.counterHack = counterHack;
        return this;
    }
    // Create characters for the game.
    function createCharacters() {
        wyrm = new character('_wyrm_', 100, 2, 5);
        ph15h = new character('ph15h', 100, 1, 5);
        brute = new character('Brüte', 100, 2, 10);
        fdat = new character('f.dat', 100, 1, 10);
        $('<p id="fdat-hp"></p>').appendTo('#fdat');
    }
    // Handle the Hacking
    character.prototype.hit = function(who) {
        if (this.dataConnection > 0) {
            this.counter(who.counterHack);
            who.dataConnection -= this.hackPower;
        }
        return this;
    }
    character.prototype.counter = function(howhard) {
        this.dataConnection -= howhard;
        return this;
    }
    character.prototype.isDefeated = function() {
        return this.dataConnection <= 0;
    }
    // Display characters on the page with all properties set at default.
    function display() {
        $stats.empty().hide();
        $characters.off('click');
        $characters.show().attr('class', 'btn btn-lg btn-default char').appendTo('#characters');
        $('#wyrm-hp').html('Data Connection: ' + wyrm.dataConnection);
        $('#ph15h-hp').html('Data Connection: ' + ph15h.dataConnection);
        $('#brute-hp').html('Data Connection: ' + brute.dataConnection);
        $('#fdat-hp').html('Data Connection: ' + fdat.dataConnection);
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
            $info.html('Great choice! Now choose someone to hack from the avaialble rivals.');
            if (charSelected) {
                return;
            }
            charSelected = true;
            // Try tying the objects to the DOM elements that were created.
            // This would significantly reduce code duplication.

            if ($(this).attr('id') == "wyrm") {
                $('#wyrm').appendTo('#character');
                $('#ph15h, #brute, #fdat').toggleClass('char enemy').appendTo('#rivals');
                $('#wyrm-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = wyrm;
            } else if ($(this).attr('id') == "ph15h") {
                $('#ph15h').appendTo('#character');
                $('#wyrm, #brute, #fdat').toggleClass('char enemy').appendTo('#rivals');
                $('#ph15h-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = ph15h;
            } else if ($(this).attr('id') == "brute") {
                $('#brute').appendTo('#character');
                $('#wyrm, #ph15h, #fdat').toggleClass('char enemy').appendTo('#rivals');
                $('#brute-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = brute;
            } else if ($(this).attr('id') == "fdat") {
                $('#fdat').appendTo('#character');
                $('#wyrm, #ph15h, #brute').toggleClass('char enemy').appendTo('#rivals');
                $('#fdat-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = fdat;
            }
            select();
        });
    }
    // Select defender.
    function select() {
        $('.enemy').on('click', function() {
            $info.html('Click the HACK button to hack your chosen defender.');
            if (defender) return;
            defender = true;
            if ($(this).attr('id') == "wyrm") {
                $('#wyrm').toggleClass('enemy defender').appendTo('#defender');
                $('#wyrm-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = wyrm;
            } else if ($(this).attr('id') == "ph15h") {
                $('#ph15h').toggleClass('enemy defender').appendTo('#defender');
                $('#ph15h-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = ph15h;
            } else if ($(this).attr('id') == "brute") {
                $('#brute').toggleClass('enemy defender').appendTo('#defender');
                $('#brute-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = brute;
            } else if ($(this).attr('id') == "fdat") {
                $('#fdat').toggleClass('enemy defender').appendTo('#defender');
                $('#fdat-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = fdat;
            }
            if (first === false && second === false && third === false) {
                firstDefender = true;
            } else if (second === false && third === false) {
                secondDefender = true;
                $stats.empty();
            } else if (first == true && second === true) {
                thirdDefender = true;
                $stats.empty();
            }
        });
    }
    // Check stats after attack
    function check() {
        // check if player is defeated
        if (selectedChar.dataConnection <= 0) {
            $attack.hide();
            $reset.show();
            $stats.html('<div id="defeat" class="alert alert-danger">You Were Defeated!</div>');
            return;
        }
        // check if defender is defeated
        if (thirdDefender === true && selectedDef.isDefeated()) {
            playerWin = true;
            $attack.hide();
            $('.defender').hide();
            $reset.show();
            $info.html('Click the Play Again button to start over.');
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
    // HACK THE PLANET!
    $attack.on('click', function() {
        if (defender === false || playerWin === true) {
            return;
        } else {
            $stats.show();
            selectedChar.hit(selectedDef);
            $stats.html('You attacked ' + selectedDef.name + ' for ' + selectedChar.hackPower + ' damage. <br/>' + selectedDef.name + ' attacked you for ' + selectedDef.counterHack + ' damage.');
            $('#character-hp').html('Data Connection: ' + selectedChar.dataConnection);
            $('#defender-hp').html('Data Connection: ' + selectedDef.dataConnection);
        }
        selectedChar.hackPower *= 2;
        check();
    });
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
        $('<p id="wyrm-hp"></p>').appendTo('#wyrm');
        $('<p id="ph15h-hp"></p>').appendTo('#ph15h');
        $('<p id="brute-hp"></p>').appendTo('#brute');

        createCharacters();
        display();
        selectCharacter();

        $infohead.html('TO PLAY');
        $info.html('Chose a hacker!');
    }
    // Restart the game to play a New Game.
    $('#reset').on('click', function() {
        play();
    });
    play();

});
