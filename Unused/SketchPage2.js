//links to the tutorials are in the bottom
let pg; //the graphics layer which stores the gradient that will be applied onto the texture for 3D objects
let shapeIndex = 0; //index to change shapes on mouse click

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  pg = createGraphics(200, 200); //here is when I create a layer which is 200x200 to store the gradient map for texture
  pg.colorMode(HSB, 360, 100, 100);//define the color mode
}

//here is where the gradient map is created, pretty followed the tutorial, and loaded everything to pg - graphics layer
function GradientFilter(posX, posY) {
  let startColor = color(posX, 70, 90);
  let endColor = color(posY, 100, 100);
    for (let y=0; y<pg.height; y++) {
      let amt = map(y, 0, pg.height, 0, 1);
      let gradColor = lerpColor(startColor, endColor, amt);
      pg.stroke(gradColor);
      pg.line(0, y, pg.width, y);
    }
}

//changes index shape on RMB pressed
function mousePressed(event) {
  if (mouseButton === RIGHT) {
    shapeIndex = (shapeIndex + 1) % 3; 
  }
}


function draw() {
  //constrained/mapped the values of mouse X to range from 0 to 360, to convert it into hue value(since there is only 360 hue values)
  let x = map(mouseX, 0, width, 0, 360);
  let y = map(mouseY, 0, height, 0, 360);

  GradientFilter(x, y);//calling the gradient map layer while 
  //passing the constrained positions of mouseX and mouseY so they can be used for gradient values

  background(10);
  rotateY(frameCount * 0.01);//rotationg the object
  texture(pg);  // applying pg as a texture
  //shape on click logic
  if (shapeIndex === 0) {sphere(150);}
  if (shapeIndex === 1) {box(200);}
  if (shapeIndex === 2) {torus(175, 100);}
  //orbit control to be extra cool😎
  orbitControl();
}

//TUTORIALS
//https://p5js.org/tutorials/color-gradients/ - took just the gradient effect from this, and later attached it
//to change with mouse movement
//https://p5js.org/tutorials/coordinates-and-transformations/ - took the creating 3D objects, rotation, OrbitControl() and etc.


//REFERENCE
//https://p5js.org/reference/p5/mousePressed/ - the mouse press detection
//https://p5js.org/reference/p5/mouseButton/ - the detection of which button is pressed
//https://p5js.org/reference/p5/texture/ - the texture creation(createGraphics) and apply(Texture)