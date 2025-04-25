// This is the main tutorial I used. I implemented pretty much the same logic, just changed the way it outputs visuals onto the screen
// I found this author's tutorials very clear, straightforward and clear
// https://www.youtube.com/watch?v=QlpadcXok8U

//the hue changes on mouse position. Additionally u can control the particles with sound

// the let ps = [] is an array that stores 'system' constructurs/objects in itself. The 'system' constructor stores 'particle' constructor/objects in itself
let ps = [];
let mic;
let buttonMouse;
let buttonMic;
let controlInt = 0; // This int is to switch between mouse mode and mic mode

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //initializing mic
  mic = new p5.AudioIn();
  mic.start();
  
  //buttons to switch modes
  buttonMouse = createButton("Mouse Control");
  buttonMouse.position(10, 15);
  buttonMouse.mousePressed(() => controlInt = 0);

  buttonMic = createButton("Microphone Control");
  buttonMic.position(10, 50);
  buttonMic.mousePressed(() => controlInt = 1);
}

function draw() {
  background(0);
  noStroke();
  
  //getting mic level. Since mic.getLevel() is only 0 to 1, we have to multiply iy by 100 to get a reasonable amplitude
  let amplitude = mic.getLevel() * 100;
  
  //based on amplitude the particles are gonna be spawned on certain positions
  if(controlInt==1 && amplitude > 1) {
    ps.push(new System(map(amplitude, 0, 10, 0, width), map(amplitude, 0, 10, 0, height)));
  }

  //based on changing the position of the mouse the particles are gonna be spawned on certain positions(position of the mouse), leaving sort of a "trail" behind
  if (controlInt==0 && (abs(pmouseX-mouseX) > 0 || abs(pmouseY - mouseY) > 0)) {
    ps.push(new System(mouseX, mouseY));
  }

  // if(random() < 0.3) {
  //   ps.push(new System(random(width/2), random(height/2)))
  // }

  // here is the instancing of 'system' objects which are basically a group of particles. Since they have to disappear I used splice; therefore, I decided to decrement the loop, so the order stays the same
  for (let i=ps.length-1; i>=0; i--) {
    ps[i].update();
    ps[i].display();

    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}

