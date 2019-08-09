var sketchProc = function(processingInstance) {
    with (processingInstance) {
       size(400, 400);
       frameRate(30);

//I created this mini project from scratch for a Khan Academy assignment. Most of the principles I learned through the lessons provided by Kahn Academy's programming modules.


//Creating a constructor function for a mover class that will hold multiple properties that concern movement

var firetail = loadImage("ProcessingImages/firetail.png");



var Mover = function (x, y) {
    this.position = new PVector (x, y);
    this.velocity = new PVector (0, 0);
    this.acceleration = new PVector (0, 0);
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
};

//creating an update function on the objects prototype that adds all the relevant vectors and scalar quantities so as to good movement
Mover.prototype.update = function () {
    this.velocity.limit(2);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angle += radians(this.aVelocity);
    this.aVelocity += radians(this.aAcceleration);
};

//creating an applyforce method that adds another PVector to the acceleration PVector
Mover.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};

//creating a function that draws a triangular spaceship with boosters at the bottom
Mover.prototype.display = function () {
   strokeWeight(0);
    fill(133, 133, 133);
    pushMatrix();
    translate(this.position.x , this.position.y );
    rotate(this.angle);
    triangle(-30, 26, 0, -26, 30, 26);
    fill(3, 3, 3);
    rect(-21, 27, 15, 5);
    image(firetail, 200, 200, 20, 20);


    rect(6, 27, 15, 5);
    popMatrix();
};


//created a function that manipulates the this.angle property that was implemented in the rotate function in the display function.. when the user presses the left arrow key 1 is subtracted each time. If the angle is at 0. there are conditional statements that help the program recognize that so as to not go negtative and to reset to 359
Mover.prototype.turnleft = function () {
    if (keyPressed && keyCode === LEFT) {
        if (this.angle === radians(0)) {
            this.angle = radians(359);
        }
    this.angle = this.angle - radians(1);
    return;
    }
};

//oppposite of the turn left function that accounts for when the angle is at 359 and resets it to 0
Mover.prototype.turnRight = function () {
    if (keyPressed && keyCode === RIGHT) {
        if (this.angle === radians(359)) {this.angle = radians(0);}
        this.angle = this.angle +radians(1);
    }
};


//launch function that takes the x, and y value that correspond to 'this.angle'. I applied lessons from the modules and used some creative application to figture out how to account for angles bigger than 90.
Mover.prototype.launch = function () {
   var xlength = 1;
   var ylength = 0;

   if (keyPressed && keyCode === UP) {
       //the angle is that which is reasonble within a right triangle (90) than the program calculates a normal vector based on tan of that angle and flips the y because the height is the bottom of the window

        if (this.angle < radians(90)) {
        ylength = tan(this.angle);
   this.applyForce(new PVector(ylength/2, xlength/-2));}
   //applies the same principle but subtracts 90 from the angle because tan only applies for an angle less than 90
   //and so on for the rest of the if statements
        else if (this.angle < radians(180)) {
            ylength = tan(this.angle - radians(90));
            this.applyForce(new PVector(xlength /2, ylength/2));}
        else if (this.angle < radians(270)) {
            ylength = tan(this.angle - radians(180));
            this.applyForce(new PVector(ylength / -2, xlength / 2));}
        else {
            ylength = tan(this.angle - radians(270));
            this.applyForce(new PVector(xlength / -2, ylength /-2));
        }

}

};

//this function checks if the spaceship is within the window. if not it brings it back in
Mover.prototype.checkEdges = function () {
    if (this.position.x > width) {
        this.position.x = 0;
    }
    else if (this.position.x < 0) {
        this.position.x = width;
    }
    if (this.position.y > height) {
        this.position.y = 0;
    }
    else if (this.position.y < 0) {
        this.position.y = height;
    }
};

var spaceship = new Mover(200, 200);



draw = function() {
     background(150, 150, 255);
     spaceship.turnleft();
     spaceship.turnRight();
     spaceship.update();
     spaceship.display();
     spaceship.launch();
     spaceship.checkEdges();




};



}};

var spaceshipcanvas = document.getElementById("spaceship");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(spaceshipcanvas, sketchProc);