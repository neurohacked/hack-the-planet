$(document).ready(function() {
    $game = $('#game');
    $select = $('#select');
    $choice = $('#choice');
    $stats = $('#battle-stats');
    $characters = $('#_case_, #acid, #brute, #fdat');
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
        _case_ = new character('_case_', 110, 4, 20);
        acid = new character('acid', 120, 2, 10);
        brute = new character('Brüte', 170, 1, 15);
        fdat = new character('f.dat', 150, 1, 12);
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
        $characters.show().attr('class', 'btn btn-lg btn-default hacker').appendTo('#characters');
        $('#_case_-hp').html('Data Connection: ' + _case_.dataConnection);
        $('#acid-hp').html('Data Connection: ' + acid.dataConnection);
        $('#brute-hp').html('Data Connection: ' + brute.dataConnection);
        $('#fdat-hp').html('Data Connection: ' + fdat.dataConnection);
        $game.hide();
        $select.show();
        $attack.show();
        $reset.hide();
    }
    // Player character selection.
    function selectCharacter() {
        $('.hacker').on('click', function() {
            $game.show();
            $select.hide();
            $info.html('Great choice! Now choose someone to hack from the available rivals.');
            if (charSelected) {
                return;
            }
            charSelected = true;
            if ($(this).attr('id') == "_case_") {
                $('#_case_').toggleClass('hacker char btn-block').appendTo('#character');
                $('#acid, #brute, #fdat').toggleClass('hacker rival').appendTo('#rivals');
                $('#_case_-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = _case_;
            } else if ($(this).attr('id') == "acid") {
                $('#acid').toggleClass('hacker char btn-block').appendTo('#character');
                $('#_case_, #brute, #fdat').toggleClass('hacker rival').appendTo('#rivals');
                $('#acid-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = acid;
            } else if ($(this).attr('id') == "brute") {
                $('#brute').toggleClass('hacker char btn-block').appendTo('#character');
                $('#_case_, #acid, #fdat').toggleClass('hacker rival').appendTo('#rivals');
                $('#brute-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = brute;
            } else if ($(this).attr('id') == "fdat") {
                $('#fdat').toggleClass('hacker char btn-block').appendTo('#character');
                $('#_case_, #acid, #brute').toggleClass('hacker rival').appendTo('#rivals');
                $('#fdat-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = fdat;
            }
            select();
        });
    }
    // Select defender.
    function select() {
        $('.rival').on('click', function() {
            $info.html('Click the HACK button to hack your chosen defender.');
            if (defender) return;
            defender = true;
            if ($(this).attr('id') == "_case_") {
                $('#_case_').toggleClass('rival defender btn-block').appendTo('#defender');
                $('#_case_-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = _case_;
            } else if ($(this).attr('id') == "acid") {
                $('#acid').toggleClass('rival defender btn-block').appendTo('#defender');
                $('#acid-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = acid;
            } else if ($(this).attr('id') == "brute") {
                $('#brute').toggleClass('rival defender btn-block').appendTo('#defender');
                $('#brute-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = brute;
            } else if ($(this).attr('id') == "fdat") {
                $('#fdat').toggleClass('rival defender btn-block').appendTo('#defender');
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
            $info.html('Click the Hack Again button.');
            $stats.html('<div id="defeat" class="alert alert-success">y0u 4r3 l337!</div>');
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
            $stats.html('You hacked ' + selectedDef.name + ' for ' + selectedChar.hackPower + ' damage. <br/>' + selectedDef.name + ' hacked you for ' + selectedDef.counterHack + ' damage.');
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
        $('<p id="_case_-hp"></p>').appendTo('#_case_');
        $('<p id="acid-hp"></p>').appendTo('#acid');
        $('<p id="brute-hp"></p>').appendTo('#brute');
        $('<p id="fdat-hp"></p>').appendTo('#fdat');

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
