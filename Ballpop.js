var windowwidth = document.documentElement.clientWidth;



var divheight = document.getElementById('aboutjey').clientHeight;

var sketchProc = function(processingInstance) {
        with (processingInstance) {
           size(windowwidth, divheight);
           frameRate(30);

         // Adapted from Dan Shiffman, natureofcode.com

var ballcount = 9;

var Mover = function(r,g,b) {
    this.position = new PVector(random(0, width/4), random(0, height/4));
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.r = r;
    this.g = g;
    this.b= b;

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
    noStroke();
    fill(this.r,this.g,this.b);
    ellipse(this.position.x, this.position.y, 20, 20);
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

var moverlist = [];

for (var i = 0; i < 10; i++){
    moverlist.push(new Mover(random(0,255), random(0,255), random(0,255)));

}


mouseClicked = function () {
    moverlist.push(new Mover(random(0,255), random(0,255), random(0,255)));
    moverlist[ballcount].position.x = mouseX;
    moverlist[ballcount].position.y = mouseY;
    ballcount++;

};


draw = function() {

    if (darkmodeon) {
    background(0, 0, 0);
    }
    else
    {
        background (255, 255, 255)
    }

    for (var i = 0; i < moverlist.length; i++){
    moverlist[i].update();
    moverlist[i].checkEdges();
    moverlist[i].display();
    }
};



}};

           // Get the canvas that Processing-js will use
   var canvas = document.getElementById("mycanvas");
   // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
   var processingInstance = new Processing(canvas, sketchProc);
