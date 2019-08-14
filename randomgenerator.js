var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(600, 400);
       frameRate(30);

//I created this mini project from scratch for a Khan Academy assignment. Most of the principles I learned through the lessons provided by Kahn Academy's programming modules.


//Creating a constructor function for a spaceship class that will hold multiple properties that concern movement

var clouds = function (x, y) {
    this.x = x;
    this.y = y;
};

clouds.prototype.draw = function() {
    fill(255, 255, 255);
    ellipse(this.x, this.y, 48, 25);
    ellipse(this.x - 2, this.y, 27, 34);
};

clouds.prototype.move = function() {
    if (this.x > 200) {
    this.x += 1;
    }
    if (this.x < 200) {
        this.x -= 1;
    }
};

var cloudlist = [];

for (var i = 0; i < 10; i ++) {
    cloudlist.push(new clouds (random(0, 400), random(200, 250)));
}


var brown = (84, 50, 50);

var bLuE = (44, 44, 128);

var white = fill(255, 0, 0);



var drawRange = function(randNu, color) {

    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(randNu);
        var y = map(n, 0, 1, 0, height/2);
        stroke(color);
        fill(color);
        rect(t*100, height-y, 1, y);
        randNu += incAmount;
    }
};




draw = function() {
background(0, 234, 255);
drawRange(2000, white);
drawRange(800, bLuE);
drawRange(0, brown);
fill(255, 221, 0);
noStroke();
ellipse(0, 0, 100, 100);
for (var i = 0; i< cloudlist.length; i++) {
    cloudlist[i].draw();
    cloudlist[i].move(0);
}
};






}};

var randomgeneratorcanvas = document.getElementById("randomgenerator");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(randomgeneratorcanvas, sketchProc);