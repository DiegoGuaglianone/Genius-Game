/* ======== VARIAVEIS GLOBAIS ========= */

const gameColors = ["green", "red", "yellow", "blue"]
const gamePattern = [];
const userChosen = [];
let started = false;
let level = 0;
let currentVolume = 1.0;


// ======== FUNCOES UTILITARIAS =========

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    // ARROW FUNCTION IN jQuery
    setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = currentVolume;
    audio.play();
}


// ======== FUNCOES CLIQUE =========

function userClick(){
    $(".btn").click(function(){
        if(!started) return;
        let colorClicked = $(this).attr("id");
        userChosen.push(colorClicked);

        playSound(colorClicked);
        animatePress(colorClicked);
        checkAnswer(colorClicked);
    })
}

// ======== GERAR PROXIMA COR =========

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = gameColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(document).on("keydown", function(event) {
    if (!started && event.key.toLowerCase() === "a"){
        nextSequence();
        started = true;
    }
});

// ======== VERIFICAR RESPOSTA =========

function checkAnswer(currentLevel) {
    let currentIndex = userChosen.length - 1;
    if(currentLevel === gamePattern[currentIndex]){
        if(userChosen.length === gamePattern.length){
            console.log("SUCESSO!")
            userChosen.length = 0;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else{
        console.log("WRONG!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press A to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern.length = 0;
    userChosen.length = 0;
}

$(document).ready(function(){
    userClick();
    $("#volumeRange").on("input", function(){
        currentVolume = Number($(this).val());
    });
});


