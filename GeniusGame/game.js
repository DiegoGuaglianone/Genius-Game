/* ======== VARIAVEIS GLOBAIS ========= */

const gameColors = ["green", "red", "yellow", "blue"]
const gamePattern = [];
const userChosen = [];
let started = false;
let level = 0;


// ======== FUNCOES UTILITARIAS =========

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    // ARROW FUNCTION IN jQuery
    setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}


// ======== FUNCOES CLIQUE =========

function userClick(){
    $(".btn").click(function(){
        let colorClicked = $(this).attr("id");
        userChosen.push(colorClicked);

        playSound(colorClicked);
        animatePress(colorClicked);
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

$(document).ready(userClick)


