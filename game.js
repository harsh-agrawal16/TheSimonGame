var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


//this function checks the userpattern against the gamepattern.
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] != gamePattern[currentLevel]){
    playSound("wrong");
    $("h1").text("Game Over, You reached Level " + level + " Press any key to restart");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    restartGame();
  }

  else if(currentLevel === gamePattern.length - 1){
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}

//This function helps restart the game whenever the pattern breaks down.
function restartGame(){
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

//This function plays a sound for a particular button , either when clicked or nextSequence is called.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//This helps animate a flash on a button.
function buttonAnimation(name) {
  $("." + name).addClass("pressed");
  setTimeout(function() {
    $("." + name).removeClass("pressed");
  }, 100)
}

// This function adds a new color to the sequence.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


//This function gets triggered whenever a button is clicked.
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  buttonAnimation(userChosenColor);
  playSound(userChosenColor);

  var len = userClickedPattern.length;
  checkAnswer(len-1);
})


//This listens to the document and gets triggered whenever a key is pressed.
$(document).keydown(function(event) {
  level = 0;
  if (started === false) {
    started = true;
    userClickedPattern = [];
    gamePattern = [];
    nextSequence();
    $("h1").text("Level " + level);
  }
});
