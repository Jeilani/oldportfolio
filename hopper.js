var windowwidth = document.documentElement.clientWidth;
    var divheight = document.getElementById('aboutjey').clientHeight;

    var sketchProc = function(processingInstance) {
        with (processingInstance) {
           size(windowwidth, divheight);
           frameRate(30);

         // Adapted from Dan Shiffman, natureofcode.com

var Mover = function() {
    this.position = new PVector(width/2, height/2);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
};

Mover.prototype.update = function() {
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Mover.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function() {

    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }

    if (this.position.y > height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var mover = new Mover();

var draw = function() {
    background(255, 255, 255);

    mover.update();
    mover.checkEdges();
    mover.display();
};










        }};

           // Get the canvas that Processing-js will use
   var canvas = document.getElementById("mycanvas");
   // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
   var processingInstance = new Processing(canvas, sketchProc);