
var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(400, 400);
       frameRate(30);

     // Adapted from Dan Shiffman, natureofcode.com

     //I added new scenes to this program.

//I also added buttons and a button object to go along with it that helps the user navigate through the different scenes.

//I added a rock in the second level that decrements the users scores and its lives

//I've added a couple methods for the player. One that checks for the NPC and one that draws lives on the top right corner

//I've added several different if statements that function as the logic behind the scene navigation
var playwholegame = function () {
var currentScene = 0;
var prevScene = 0;
var cryingmike = loadImage("ProcessingImages/cryingmike.png");
var shaq = loadImage("ProcessingImages/shaq.png");
var basketball = loadImage("ProcessingImages/basketball.png");
var titlepage = loadImage("ProcessingImages/TITLEPAGEMJ.png");
var court = loadImage("ProcessingImages/BullsCourt.png");
var trophy = loadImage("ProcessingImages/NBATrophy.png");



var Player = function(x, y) {
this.x = x;
this.y = y;
this.img = cryingmike;
this.score = 0;
this.lives = 4;
};

Player.prototype.draw = function() {
fill(255, 0, 0);
this.y = constrain(this.y, 0, height-50);
image(this.img, this.x, this.y, 40, 40);
};

Player.prototype.drawlives = function() {
for (var i = 0; i < this.lives; i ++) {
    image(trophy, 300 + i * 26, 10, 25, 30);
}

};

Player.prototype.hop = function() {
this.img = cryingmike;
this.y -= 5;
};

Player.prototype.fall = function() {
this.img = cryingmike;
this.y += 5;
};

Player.prototype.checkForBallGrab = function(ball) {
if ((ball.x >= this.x && ball.x <= (this.x + 40)) &&
    (ball.y >= this.y && ball.y <= (this.y + 40))) {
    ball.y = -400;
    this.score++;
}
};

Player.prototype.checkforNPC = function (NPC) {
if ((NPC.x >= this.x && NPC.x <= (this.x + 17)) && (NPC.y >= this.y && NPC.y <= (this.y + 17))) {
    if (NPC.alreadyhit === false) {
    this.score = this.score -1;
    this.lives -= 1;
    NPC.alreadyhit = true;
}
}
};

var Ball = function(x, y) {
this.x = x;
this.y = y;
this.img = basketball;
};


Ball.prototype.draw = function() {
image(this.img, this.x, this.y, 25, 25);
};


var NPC = function (x, y) {
this.x = x;
this.y = y;
this.image = shaq;
this.alreadyhit = false;
};

NPC.prototype.draw = function() {
 image(this.image, this.x, this.y, 25, 30);
};

NPC.prototype.rise = function () {
this.y = this.y - 2;
};

NPC.prototype.fall = function () {
this.y = this.y + 2;
};


var Button = function(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
};

Button.prototype.draw = function() {
    noStroke();
    fill(201, 0, 0);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(255, 255, 255);
    textSize(19);
    text(this.label, this.x + 11, this.y + 15);
};


Button.prototype.isMouseInside = function() {
    return mouseX >= this.x &&
           mouseX <= (this.x + this.width) &&
           mouseY >= this.y &&
           mouseY <= (this.y + this.height);
};



var mj = new Player(200, 300);

var rocks = [];
for (var i = 0; i < 10; i ++) {
rocks.push(new NPC(i * 432 + 300, random(20,260)));
}

var balls = [];
for (var i = 0; i < 40; i++) {
balls.push(new Ball(i * 55 + 300, random(20, 260)));
}



var pausebutton = new Button (5, 363, 78, 29, null);
var continuebutton = new Button (5, 363, 78, 29, null);
var level2button = new Button (163, 200, 78, 29, null);
var startoverbutton = new Button (163, 200, 78, 29, null);
var quitbutton = new Button (width - 85, 363, 78, 29, null);
var yesquitbutton = new Button (120, 200, 51, 20, "yes");
var noquitbutton = new Button (238, 200, 51, 20, "no");
var pausebutton2 = new Button (5, 363, 78, 29, null);
var startoverbutton2 = new Button (156, 241, 78, 29, null);




///////DRAWING SCENE 1

var drawIntroScene = function () {
currentScene = "IntroScene";
background(247, 126, 140);
image(cryingmike, 145, height -150, 100, 100);
image(titlepage, 0, 0, 400, 400);

};
/////// ^^^ TURNED THE MAIN GAME PLAYING SCENE INTO A FUNCTION AND CALLING IT WITHIN A MOUSECLICKED FUNCTION WITHIN A DRAW FUNCTION///

var drawFirstLevel = function () {
currentScene = "FirstLevel";
prevScene = "FirstLevel"
background(227, 254, 255);
image(court, 0, 0, 400, 400);
fill(130, 79, 43);
rectMode(CORNER);





for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    mj.checkForBallGrab(balls[i]);
    balls[i].x -= 1;
}



textSize(18);
text("Score: " + mj.score, 20, 30);



if (keyPressed && keyCode === 0) {
    mj.hop();
} else {
    mj.fall();
}


mj.drawlives();
pausebutton.draw();
quitbutton.draw();
textSize(16);
text("Pause", continuebutton.x + 11, continuebutton.y + 18);
text("Quit", quitbutton.x + 20, quitbutton.y + 19)
mj.draw();



};
//// END OF FUNCTION FOR drawFirstLevel//////


var drawPauseScene = function () {
currentScene = "PauseScene";
background(214, 141, 141);
fill(130, 79, 43);
rectMode(CORNER);
    fill(201, 201, 43);
    textSize(32);
    text("PAUSED", 144, 176);
    continuebutton.draw();
    textSize(16);
    text("Continue", continuebutton.x + 7, continuebutton.y + 18);
};

var drawCongratsFirstLevel = function () {
currentScene = "CongratsFirstLevel";
background(214, 141, 141);
    fill(130, 79, 43);
    textSize(24);
    text("CONGRATS YOU BEAT LEVEL 1", 23, 76);
    text("Level 2 is a little harder", 66, 111);
    text("Watch out for Shaq ", 90, 150);
    text("or you'll lose lives!", 95, 177);

    textSize(14);
    level2button.draw();
    text("Level 2", 171, 219);

};

var drawSecondLevel = function () {
    currentScene = "SecondLevel";
    prevScene = "SecondLevel"

background(227, 254, 255);
image(court, 0, 0, 400, 400);
fill(130, 79, 43);



for (var i = 0; i < rocks.length; i++) {
    rocks[i].draw();
    rocks[i].x -= 1;
    mj.checkforNPC(rocks[i]);
}


for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    mj.checkForBallGrab(balls[i]);
    balls[i].x -= 1;

}


textSize(18);
text("Score: " + mj.score, 20, 30);



if (keyPressed && keyCode === 0) {
    mj.hop();
} else {
    mj.fall();
}


mj.drawlives();
pausebutton2.draw();
quitbutton.draw();
textSize(16);
text("Pause", continuebutton.x + 11, continuebutton.y + 18);
text("Quit", quitbutton.x + 20, quitbutton.y + 19)
mj.draw();

};

var drawLoseScene = function () {
    currentScene = "LoseScene";
    background(214, 141, 141);
    fill(130, 79, 43);
    textSize(20);
    text("YOU LOSE", 157, 99);
    startoverbutton.draw();
    text("start over", startoverbutton.x, startoverbutton.y + 20);
};

var drawCongratsScene = function () {
currentScene = "CongratsScene";
    background(214, 141, 141);
        fill(130, 79, 43);
        textSize(19);
        text("Congrats, you beat the whole game!", 51, 105);
        text("The game is still under development", 56, 158);
        text("There will be newer levels in the future!", 42, 178);

                startoverbutton2.draw();
        text("start over", startoverbutton2.x, startoverbutton2.y + 20);


    };

//GAME OVER SCENE FUNCTION ENDS HERE//

var drawQuitConfirmation = function () {
    currentScene = "QuitConfirmation";
    background(214, 141, 141);
    fill(18, 17, 16);
    textSize(20);

    text("Are you sure you want to quit?", 69, height/4);
    yesquitbutton.draw();
    noquitbutton.draw();

};





//function for checking if the user clicked inside the hopper image on the first page//
var isMouseInside = function () {
return (mouseX >171 && mouseX < 251 && mouseY > 256 && mouseY < 339);

};
//^^^^function for checking if the user clicked inside the hopper image on the first page^^^^//



draw = function() {
if (currentScene==="IntroScene") {
    drawIntroScene();
}
 if (currentScene === "FirstLevel") {
     drawFirstLevel();
 }

 if (currentScene === "FirstLevel" && (balls[balls.length - 1].x === 150) && (mj.score>35))  {
     mj.score = 0;
     drawCongratsFirstLevel();
 }
 if (currentScene === "FirstLevel" && (balls[balls.length -1].x === 150) && mj.score<35){
     mj.score = 0;
     drawLoseScene();
 }
 if (currentScene ==="SecondLevel") {
     drawSecondLevel();
 }

      if (currentScene === "SecondLevel" && (balls[balls.length -1].x === 150) && mj.score<35){
          mj.score = 0;
     drawLoseScene();
      }
      if (currentScene === "SecondLevel" && mj.lives === 0) {
          mj.score = 0;
          drawLoseScene();
      }
         if (currentScene === "SecondLevel" && (balls[balls.length - 1].x === 150) && (mj.score>35))  {
     mj.score = 0;
     drawCongratsScene();
 }
};

mouseClicked = function() {
if (currentScene === "IntroScene" && isMouseInside()) {
         drawFirstLevel();
 }
else if (currentScene === "LoseScene" && startoverbutton.isMouseInside()) {
    drawIntroScene();
}
else if (currentScene === "FirstLevel" && pausebutton.isMouseInside()) {
            drawPauseScene();
}
else if (currentScene === "FirstLevel" && quitbutton.isMouseInside()) {
        drawQuitConfirmation();
}
else if (currentScene ==="QuitConfirmation" && yesquitbutton.isMouseInside()) {
        playwholegame();
}
else if (currentScene ==="QuitConfirmation" && noquitbutton.isMouseInside() && prevScene ==="FirstLevel") {
        drawFirstLevel();
}
else if (currentScene ==="QuitConfirmation" && noquitbutton.isMouseInside() && prevScene ==="SecondLevel") {
    drawSecondLevel();
}
else if (currentScene === "PauseScene" && continuebutton.isMouseInside() && prevScene==="FirstLevel") {
            drawFirstLevel();
 }
 else if (currentScene === "PauseScene" && continuebutton.isMouseInside() && prevScene==="SecondLevel") {
    drawSecondLevel();
}
 else if (currentScene === "CongratsFirstLevel" && level2button.isMouseInside()) {
            drawSecondLevel();
 }
 else if (currentScene === "SecondLevel" && pausebutton2.isMouseInside()) {
        drawPauseScene();
 }
else if (currentScene === "SecondLevel" && quitbutton.isMouseInside()) {
            drawQuitConfirmation();
 }
 else if (currentScene === "LoseScene" && startoverbutton.isMouseInside()) {
     playwholegame();
 }
 else if (currentScene === "CongratsScene" && startoverbutton.isMouseInside()) {
     playwholegame();
 }
};


drawIntroScene();


};
 playwholegame();

}};

var canvas = document.getElementById("michaeljordanflappy");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);
