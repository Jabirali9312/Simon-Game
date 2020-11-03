// initial varaiables
var gamePattren = [];
var userClickPattren = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var lvl = 0;
var gameStatus = false;


//  checking click events
$(".btn").click(function() {
  var chkColourPress = $(this).attr("id")
  userClickPattren.push(chkColourPress);
  playsound(chkColourPress);
  animatepress(chkColourPress);
  chkanswer(userClickPattren.length-1);
});


// keypressing actions
$(document).keypress(function(event){
  if(!gameStatus){
    gameStatus = true;
    nextSequence();
    }
});


// cheking answers of users
function chkanswer(currentlvl){
  if(gamePattren[currentlvl] === userClickPattren[currentlvl]){
    console.log("sucess");
    // checking current lvl completes or not
    if(gamePattren.length === userClickPattren.length)
    {
      // going to next level
        setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{  // actions when gameover
    console.log("game over");
    $("h1").html("Game Over, Press any Key to Restart");
    // game over effects added colour
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    // gameover sound added
    playsound("wrong");
    // reset iniial data
    resetdata();
  }
}


// setting next lvl of game
function nextSequence() {
  userClickPattren = [];  //user pattren reset every new lvl
  lvl++;                  // increment game lvl
  $("h1").html("level " + lvl);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosecolour = buttonColours[randomNumber];
  gamePattren.push(randomChosecolour);
  $("#" + randomChosecolour).fadeIn(100).fadeOut(100).fadeIn(100);  // Affect when random button selected
  playsound(randomChosecolour);
  console.log(randomNumber);
}


//  function used to play sounds
function playsound(name) {
  var m = new Audio("sounds/" + name + ".mp3");
  m.play();
}


// funtion used to display animation when button pressed
function animatepress(curentColour) {   // add and removed animationeffect class
  $("#" + curentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + curentColour).removeClass("pressed");
  }, 100);
}


// reset initial data when game over
function resetdata(){
  gamePattren = [];
  userClickPattren = [];
  lvl = 0;
  gameStatus = false;
}
