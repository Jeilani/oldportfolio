
var sketchProc = function(processingInstance) {
        with (processingInstance) {
           size(400, 400);
           frameRate(30);

         // Adapted from Dan Shiffman, natureofcode.com

         //I added new scenes to this program.

//I also added buttons and a button object to go along with it that helps the user navigate through the different scenes.

//I added a rock in the second level that decrements the users scores and its lives

//I've added a couple methods for the beaver. One that checks for the NPC and one that draws lives on the top right corner

//I've added several different if statements that function as the logic behind the scene navigation

var currentScene = 0;
var cryingmike = loadImage("ProcessingImages/cryingmike.png");
var shaq= loadImage("ProcessingImages/shaq.png");
var grassblock = loadImage("ProcessingImages/grassblock.png");


var Button = function(x, y, width, height, label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
};

Button.prototype.draw = function() {
    fill(90, 145, 18);
    rectMode(CORNER);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    text(this.label, this.x - 30, this.y + 6);
};

Button.prototype.isMouseInside = function() {
    return mouseX >= this.x &&
           mouseX <= (this.x + this.width) &&
           mouseY >= this.y &&
           mouseY <= (this.y + this.height);
};

var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = cryingmike;
    this.score = 0;
    this.lives = 4;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.drawlives = function() {
    for (var i = 0; i < this.lives; i ++) {
        image(this.img, 300 + i * 26, 10, 12, 15);
    }

};

Beaver.prototype.hop = function() {
    this.img = cryingmike;
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = cryingmike;
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.score++;
    }
};

Beaver.prototype.checkforNPC = function (NPC) {
    if ((NPC.x >= this.x && NPC.x <= (this.x + 17)) && (NPC.y >= this.y && NPC.y <= (this.y + 17))) {
        this.score = this.score -1;
        this.lives -= 1;
    }
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};


Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var NPC = function (x, y) {
    this.x = x;
    this.y = y;
    this.image = shaq;
};

NPC.prototype.draw = function() {
     image(this.image, this.x, this.y, 22, 20);
};

NPC.prototype.rise = function () {
    this.y = this.y - 2;
};

NPC.prototype.fall = function () {
    this.y = this.y + 2;
};

var beaver = new Beaver(200, 300);

var rocks = [];
for (var i = 0; i < 10; i ++) {
    rocks.push(new NPC(i * 432 + 300, random(20,260)));
}

var sticks = [];
for (var i = 0; i < 40; i++) {
    sticks.push(new Stick(i * 55 + 300, random(20, 260)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) {
    grassXs.push(i*20);
}


var pausebutton = new Button (5, 363, 78, 29, null);
var continuebutton = new Button (5, 363, 78, 29, null);
var level2button = new Button (163, 200, 78, 29, null);
var startoverbutton = new Button (163, 200, 78, 29, null);


///////DRAWING SCENE 1
var drawScene1 = function () {
    currentScene = 1;
    background(227, 254, 255);
    fill(230, 203, 113);
    textSize(20);
    text("Welcome to \"Hopping With Hopper\"!", 44, 88);
    text("Hold the space bar to fly. \nGrab as many sticks as possible and \n avoid the obstacles and any bad guys.", 47, 152);
    text("Click Hopper \n to Start Playing", 8, 291);
    image(cryingmike, 171, 256, 80, 83);

};
/////// ^^^ TURNED THE MAIN GAME PLAYING SCENE INTO A FUNCTION AND CALLING IT WITHIN A MOUSECLICKED FUNCTION WITHIN A DRAW FUNCTION///

var drawScene2 = function () {
    currentScene = 2;
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);

    for (var i = 0; i < grassXs.length; i++) {
        image(grassblock, grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }

    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;


    }

    textSize(18);
    text("Score: " + beaver.score, 20, 30);



    if (keyPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }


    beaver.drawlives();
    pausebutton.draw();
    textSize(16);
    text("Pause", continuebutton.x + 11, continuebutton.y + 18);
    beaver.draw();



    };
//// END OF FUNCTION FOR DRAWSCENE2//////


var drawScene3 = function () {
    currentScene = 3;
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    for (var i = 0; i < grassXs.length; i++) {
        image(grassblock, grassXs[i], height*0.85, 20, 20);
        }
        fill(201, 201, 43);
        textSize(32);
        text("PAUSED", 144, 176);
        continuebutton.draw();
        textSize(16);
        text("Continue", continuebutton.x + 7, continuebutton.y + 18);
};

var drawScene4 = function () {
    currentScene = 4;
    background(227, 254, 255);
        fill(130, 79, 43);
        textSize(24);
        text("CONGRATS YOU BEAT LEVEL 1", 15, 76);
        textSize(14);
        level2button.draw();
        text("Level 2", 171, 219);

};

var drawScene5 = function () {
        currentScene = 5;

    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);

    for (var i = 0; i < grassXs.length; i++) {
        image(grassblock, grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }

    for (var i = 0; i < rocks.length; i++) {
        rocks[i].draw();
        rocks[i].x -= 1;
        beaver.checkforNPC(rocks[i]);
    }


    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;

    }


    textSize(18);
    text("Score: " + beaver.score, 20, 30);



    if (keyPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }


    beaver.drawlives();
    pausebutton.draw();
    textSize(16);
    text("Pause", continuebutton.x + 11, continuebutton.y + 18);
    beaver.draw();

};

var drawScene6 = function () {
        currentScene = 6;
        background(227, 254, 255);
        fill(130, 79, 43);
        text("YOU LOSE", 167, 99);
        startoverbutton.draw();
        text("start over", startoverbutton.x, startoverbutton.y + 20);
};

var drawScene7 = function () {
    currentScene = 7;
    background(227, 254, 255);
        fill(130, 79, 43);
        text("Congrats, you win!", 153, 116);
        text("The game is still under development. \n There will be newer levels!", 112, 277);

                startoverbutton.draw();
        text("start over", startoverbutton.x, startoverbutton.y + 20);


};

//GAME OVER SCENE FUNCTION ENDS HERE//


//function for checking if the user clicked inside the hopper image on the first page//
var isMouseInside = function () {
   return (mouseX >171 && mouseX < 251 && mouseY > 256 && mouseY < 339);

};
//^^^^function for checking if the user clicked inside the hopper image on the first page^^^^//



draw = function() {
     if (currentScene === 2) {
         drawScene2();
     }

     if (currentScene === 2 && (sticks[sticks.length - 1].x === 150) && (beaver.score>35))  {
         beaver.score = 0;
         drawScene4();
     }
     if (currentScene === 2 && (sticks[sticks.length -1].x === 150) && beaver.score<35){
         beaver.score = 0;
         drawScene6();
     }
     if (currentScene ===5) {
         drawScene5();
     }

          if (currentScene === 5 && (sticks[sticks.length -1].x === 150) && beaver.score<35){
              beaver.score = 0;
         drawScene6();
          }
          if (currentScene === 5 && beaver.lives === 0) {
              beaver.score = 0;
              drawScene6();
          }
             if (currentScene === 2 && (sticks[sticks.length - 1].x === 150) && (beaver.score>35))  {
         beaver.score = 0;
         drawScene7();
     }
};

mouseClicked = function() {
    if (currentScene === 1 && isMouseInside()) {
             drawScene2();
     }
    else if (currentScene === 2 && pausebutton.isMouseInside()) {
                drawScene3();
    }
    else if (currentScene === 3 && continuebutton.isMouseInside()) {
                drawScene2();
     }
     else if (currentScene === 4 && level2button.isMouseInside()) {
                drawScene5();
     }
     else if (currentScene === 5 && pausebutton.isMouseInside()) {
            drawScene3();
     }
     else if (currentScene === 6 && startoverbutton.isMouseInside()) {
         Program.restart();
     }
     else if (currentScene === 7 && startoverbutton.isMouseInside()) {
         Program.restart();
     }
};


drawScene1();




}};

var canvas = document.getElementById("michaeljordanflappy");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);