
let shapes = [];

function setup() {
  createCanvas(700, 500);
  angleMode(DEGREES);
  noStroke();

  // Create shapes with properties for animation
  for (let i = 0; i < 8; i++) {
    shapes.push(new Spiral(random(width), random(height), random(30, 70), random(3, 7), random([-1, 1]), i * 20, color(30, 90, 200, 180)));
  }
  for (let i = 0; i < 6; i++) {
    shapes.push(new FloatingCircle(random(width), random(height), random(20, 50), random([-1, 1]), i * 40, color(255, 215, 0, 190)));
  }
  for (let i = 0; i < 4; i++) {
    shapes.push(new OtherShape(random(width), random(height), random(40, 70), random([-1, 1]), i * 50, color(40, 70, 190, 180)));
  }
}

function draw() {
  background(15, 20, 70);

  for (let s of shapes) {
    s.update();
    s.display();
  }
}

class Spiral {
  constructor(x, y, radius, turns, dir, phase, col) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.turns = turns;
    this.dir = dir;
    this.phase = phase;
    this.col = col;
    this.angle = 0;
    this.floatOffset = random(1000);
  }
  
  update() {
    this.angle += 1.2 * this.dir;
    this.y += sin(frameCount + this.floatOffset) * 0.5;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + this.phase);
    noFill();
    stroke(this.col);
    strokeWeight(2);
    
    beginShape();
    // draw a spiral by increasing radius as angle increases
    for (let a = 0; a <= 360 * this.turns; a += 5) {
      let r = map(a, 0, 360 * this.turns, 0, this.radius);
      let sx = r * cos(a);
      let sy = r * sin(a);
      vertex(sx, sy);
    }
    endShape();
    pop();
  }
}

class FloatingCircle {
  constructor(x, y, diameter, dir, phase, col) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.dir = dir;
    this.phase = phase;
    this.col = col;
    this.angle = 0;
    this.floatOffset = random(1000);
  }
  
  update() {
    this.angle += 0.8 * this.dir;
    this.y += cos(frameCount + this.floatOffset) * 0.4;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + this.phase);
    fill(this.col);
    ellipse(0, 0, this.diameter);
    pop();
  }
}

class OtherShape {
  constructor(x, y, size, dir, phase, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dir = dir;
    this.phase = phase;
    this.col = col;
    this.angle = 0;
    this.floatOffset = random(1000);
  }

  update() {
    this.angle += 1.5 * this.dir;
    this.y += sin(frameCount * 0.7 + this.floatOffset) * 0.6;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + this.phase);
    fill(this.col);
    // Combine rectangles and triangles for variety
    rectMode(CENTER);
    rect(0, 0, this.size * 0.6, this.size * 0.6, 5);
    triangle(-this.size * 0.3, this.size * 0.3, 0, -this.size * 0.4, this.size * 0.3, this.size * 0.3);
    pop();
  }
}
