$(document).ready(function() {
    var selectedChar, selectedDef, charSelected, firstDefender, secondDefender, thirdDefender, playerWin;

    //Play the game
    function play() {
        selectedChar = '';
        selectedDef = '';
        firstDefender = '';
        secondDefender = '';
        thirdDefender = '';
        charSelected = false;
        defender = false;
        playerWin = false;
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
        obi = {
            name: "Obi-Wan Kenobi",
            hp: 100,
            ap: 3,
            ca: 5,
            atk: function(enemy) {
                enemy.hp = enemy.hp - obi.ap;
                obi.ap *= 2;
            },
            catk: function(attacker) {
                attacker.hp = attacker.hp - obi.ca;
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

        $('.choice').html('Select Your Character: ');
        $('#character-stats, #defender-stats').empty();
        $('#luke, #obi-wan, #vader, #sidious').show().attr('class', 'btn btn-lg char').appendTo('#characters');
        $('#luke-hp').html('HP: ' + luke.hp);
        $('#obi-hp').html('HP: ' + obi.hp);
        $('#vader-hp').html('HP: ' + vader.hp);
        $('#sidious-hp').html('HP: ' + sidious.hp);
        $('#luke, #obi-wan, #vader, #sidious, #attack').off('click');

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
                $('#obi-wan, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                selectedChar = luke;
            } else if ($(this).attr('id') == "obi-wan") {
                $('#luke, #vader, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                selectedChar = obi;
            } else if ($(this).attr('id') == "vader") {
                $('#luke, #obi-wan, #sidious').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                selectedChar = vader;
            } else if ($(this).attr('id') == "sidious") {
                $('#luke, #obi-wan, #vader').toggleClass('char enemy').appendTo('#enemies');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                selectedChar = sidious;
            }

            selectFirst();
            console.log('Character Selected: ' + selectedChar.name + ', HP: ' + selectedChar.hp);
        });
    }

    // Select first defender
    function selectFirst() {
        $('.enemy').on('click', function() {
            if (defender) return;
            defender = true;
            if ($(this).attr('id') == "luke") {
                $('#luke').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                firstDefender = luke;
                console.log('You\'re fighting ' + luke.name);
            } else if ($(this).attr('id') == "obi-wan") {
                $('#obi-wan').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                firstDefender = obi;
                console.log('You\'re fighting ' + obi.name);
            } else if ($(this).attr('id') == "vader") {
                $('#vader').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                firstDefender = vader;
                console.log('You\'re fighting ' + vader.name);
            } else if ($(this).attr('id') == "sidious") {
                $('#sidious').toggleClass('enemy first').appendTo('#defender');
                $('#luke, #obi-wan, #vader, #sidious').off('click');
                firstDefender = sidious;
                console.log('You\'re fighting ' + sidious.name);
            }
            selectedDef = firstDefender;
            fight();
        });
    }
    // BATTLE!
    function fight() {
        $('#attack').on('click', function() {
            if (selectedChar.hp <= 0) {
                alert('You Lost!');
                return;
            }
            if (firstDefender.hp <= 0) {
                alert('killed');
                $('.first').hide();
                return;
                // selectSecond();
            } else if (secondDefender.hp <= 0) {
                selectThird();
            } else if (thirdDefender.hp <= 0) {
                playerWin = true;
                alert('You Won!');
            }
            if (selectedChar === luke) {
                if (selectedDef === obi) {
                    console.log('POW');
                    luke.atk(obi);
                    obi.catk(luke);
                } else if (selectedDef === vader) {
                    console.log('OOF');
                    luke.atk(vader);
                    vader.catk(luke);
                } else if (selectedDef === sidious) {
                    console.log('ZOW');
                    luke.atk(sidious);
                    sidious.catk(luke);
                }
            }
            if (selectedChar === obi) {
                if (selectedDef === luke) {
                    console.log('PEW');
                    obi.atk(luke);
                    luke.catk(obi);
                    $('#character-stats').html('You attacked ' + selectedDef.name + ' for ' + selectedChar.ap + ' damage.');
                    $('#defender-stats').html(selectedDef.name + ' attacked you for ' + selectedDef.ca + ' damage.');
                    $('#obi-hp').html('HP: ' + selectedChar.hp);
                    $('#luke-hp').html('HP: ' + selectedDef.hp);
                } else if (selectedDef === vader) {
                    console.log('OOF');
                    obi.atk(vader);
                    vader.catk(obi);
                } else if (selectedDef === sidious) {
                    console.log('ZOW');
                    obi.atk(sidious);
                    sidious.catk(obi);
                }
            }
            if (selectedChar === vader) {
                if (selectedDef === luke) {
                    console.log('PEW');
                    vader.atk(luke);
                    luke.catk(vader);
                } else if (selectedDef === obi) {
                    console.log('POW');
                    vader.atk(obi);
                    obi.catk(vader);
                } else if (selectedDef === sidious) {
                    console.log('ZOW');
                    vader.atk(sidious);
                    sidious.catk(vader);
                }
            }
            if (selectedChar === sidious) {
                if (selectedDef === luke) {
                    console.log('PEW');
                    sidious.atk(luke);
                    luke.catk(sidious);
                } else if (selectedDef === obi) {
                    console.log('POW');
                    sidious.atk(obi);
                    obi.catk(sidious);
                } else if (selectedDef === vader) {
                    console.log('OOF');
                    sidious.atk(vader);
                    vader.catk(sidious);
                }
            }
        });

        console.log('Let\'s Get It On!!');
    }

    // Start New Game
    $('#reset').on('click', function() {
        play();
    });
    play();
});
