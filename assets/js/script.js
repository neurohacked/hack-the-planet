var game ={
    chars : ['Kylo Ren', 'Darth Vader', 'Obi-Wan Kenobi', 'Luke Skywalker',]
    health: 120, 100, 150, 180;
}

if userChoice is chars[0] {
    set charSelect to chars[0]
    set enemy to chars[1], chars[2], chars[3]
} else if (userChoice is chars[1]) {
    set charSelect chars[1]
    set enemy to chars[0], chars[2], chars[3]
} else if (userChoice is chars[2]) {
    set charSelect chars[2]
    set enemy to chars[0], chars[1], chars[3]
} else if (userChoice is chars[3]) {
    set charSelect chars[3]
    set enemy to chars[0], chars[1], chars[2]
}
