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
        console.log("WRONG!")
        playSound("wrong");
    }
}

$(document).ready(userClick)


