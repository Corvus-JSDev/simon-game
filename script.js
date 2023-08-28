const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let mostRecentClick;
let level = 0;
const maxLevel = 10;


let titleClick = false;    
$('#title').click(function(){
    if (titleClick == false){
        $(this).fadeOut(400);
        setTimeout(() => {
            $(this).fadeIn().text('The Simon Game');
        }, 300);
        $(this).css('cursor', 'default');
        setTimeout(() => {
            startGame();
        }, 1500);
        titleClick = true;
    }
});




function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4); // 0-3
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    
    animatePattern();
}    

function animatePattern() {
    let i = 0;

    function animateNextSquare() {
        if (i < gamePattern.length) {
            let lightSquare = "." + gamePattern[i];
            $(lightSquare).addClass('active');
            squareSoundEffect(lightSquare);
            setTimeout(function() {
                $(lightSquare).removeClass('active');
                i++;
                setTimeout(animateNextSquare, 400); // Delay between squares
            }, 300); // Duration of square activation
        }
          
    }
    animateNextSquare();
}


function squareSoundEffect(square){
    let audio;
    if (square == '.red'){
        audio = new Audio('./sounds/red.mp3');
    } else if (square == '.green') {
        audio = new Audio('./sounds/green.mp3');
    } else if (square == '.blue') {
        audio = new Audio('./sounds/blue.mp3');
    } else if (square == '.yellow') {
        audio = new Audio('./sounds/yellow.mp3');
    }
    if (audio) {
        audio.play();
    }
} 







$('.square').click(function(evt) {
    let userChosenColor = this.classList[0];
    userClickedPattern.push(userChosenColor);
    squareSoundEffect('.' + userChosenColor);

    this.classList.add('active');
    setTimeout(() => {
        $(this).removeClass('active');
    }, 150);

    checkPattern();
});

function startGame() {
    if (level < maxLevel) {
        nextSequence();
        userClickedPattern = []; // Reset player input
    } else {
        $('#title').text('Congrats, you won!');
        const interval = 300;
        const flashes = 3;

        for (let i = 0; i < flashes; i++) {
        setTimeout(() => {
            $('body').toggleClass('winner-background');
        }, i * interval * 2);

        setTimeout(() => {
            $('body').toggleClass('winner-background');
        }, (i * interval * 2) + interval);

    }
    }
}

function checkPattern() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            failedScreen();
            return;
        }
    }

    if (userClickedPattern.length === gamePattern.length) {
        level++;
        setTimeout(startGame, 2000); // Start next level after delay
    }
}










function failedScreen() {
    $('#title').html('<b>You Failed</b>');

    const interval = 300;
    const flashes = 3;

    for (let i = 0; i < flashes; i++) {
        setTimeout(() => {
            $('body').toggleClass('loser-background');
        }, i * interval * 2);

        setTimeout(() => {
            $('body').toggleClass('loser-background');
        }, (i * interval * 2) + interval);

    }
    
    let audio;
    audio = new Audio('./sounds/wrong.mp3');
    audio.play();
}

