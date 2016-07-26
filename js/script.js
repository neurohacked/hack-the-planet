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
        luke = new character('Luke Skywalker', 150, 5, 50);
        kenobi = new character('Obi-Wan Kenobi', 100, 10, 5);
        vader = new character('Darth Vader', 120, 2, 20);
        sidious = new character('Darth Sidious', 180, 1, 25);
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
            if (charSelected) return;
            charSelected = true;
            // Try tying the objects to the DOM elements that were created.
            // This would significantly reduce code duplication.


            // $('#kenobi, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
            // $('#luke, #kenobi, #vader, #sidious').off('click');
            // selectedChar = char.name;


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
                $('#luke, #kenobi, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#vader-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#luke, #kenobi, #vader').toggleClass('char enemy').appendTo('#enemies');
                $('#sidious-hp').attr("id", "character-hp");
                $characters.off('click');
                selectedChar = sidious;
            }

            selectFirst();
            console.log('Character Selected: ' + selectedChar.name + ', HP: ' + selectedChar.hp);
        });
    }
    // Select defender.
    function selectFirst() {
        $('.enemy').on('click', function() {
            if (defender) return;
            defender = true;
            if ($(this).attr('id') == "luke") {
                $('#luke').toggleClass('enemy first').appendTo('#defender');
                $('#luke-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = luke;
            } else if ($(this).attr('id') == "kenobi") {
                $('#kenobi').toggleClass('enemy first').appendTo('#defender');
                $('#kenobi-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = kenobi;
            } else if ($(this).attr('id') == "vader") {
                $('#vader').toggleClass('enemy first').appendTo('#defender');
                $('#vader-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').toggleClass('enemy first').appendTo('#defender');
                $('#sidious-hp').attr("id", "defender-hp");
                $characters.off('click');
                selectedDef = sidious;
            }
            fight();
        });
    }
    // Select second defender
    // function selectSecond() {
    //     $('.enemy').on('click', function() {
    //         if (defSelected) return;
    //         defSelected = true;
    //         if ($(this).attr('id') == "luke") {
    //             $('#luke').toggleClass('enemy second').appendTo('#defender');
    //             $('#luke, #kenobi, #vader, #sidious').off('click');
    //             secondDefender = luke;
    //             console.log('You\'re fighting ' + luke.name);
    //         } else if ($(this).attr('id') == "kenobi") {
    //             $('#kenobi').toggleClass('enemy second').appendTo('#defender');
    //             $('#luke, #kenobi, #vader, #sidious').off('click');
    //             secondDefender = kenobi;
    //             console.log('You\'re fighting ' + kenobi.name);
    //         } else if ($(this).attr('id') == "vader") {
    //             $('#vader').toggleClass('enemy second').appendTo('#defender');
    //             $('#luke, #kenobi, #vader, #sidious').off('click');
    //             secondDefender = vader;
    //             console.log('You\'re fighting ' + vader.name);
    //         } else if ($(this).attr('id') == "sidious") {
    //             $('#sidious').toggleClass('enemy second').appendTo('#defender');
    //             $('#luke, #kenobi, #vader, #sidious').off('click');
    //             secondDefender = sidious;
    //             console.log('You\'re fighting ' + sidious.name);
    //         }
    //         selectedDef = secondDefender;
    //         console.log('Defender: ' + defSelected)
    //         fight();
    //     });
    // }
    // Check stats after attack
    function check() {
        // check if defender health is 0
        // check if defender is defeated
        if (selectedChar.healthPoints <= 0) {
            $attack.hide();
            $reset.show();
            $stats.html('<div id="defeat" class="alert alert-danger">You Were Defeated!</div>');
            return;
        } else if (selectedDef.isDead()) {
            $stats.html('You defeated ' + selectedDef.name);
            firstDefender.hp = 1;
            $('.first').hide();
            defender = false;
            select();
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
        character.prototype.isDead = function() {
            return this.healthPoints <= 0;
        }
        $attack.on('click', function() {
            $stats.show();
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
        firstDefeated = false;
        secondDefeated = false;
        thirdDefeated = false;
        playerWin = false;

        createCharacters();
        display();
        selectCharacter();

        $infohead.html('TO PLAY');
        $info.html('Chose a character!');
        console.log('Character Selected: ' + charSelected);
        console.log('Defender Selected: ' + defender);
    }
    // Restart the game to play a New Game.
    $('#reset').on('click', function() {
        play();
    });
    play();

});
