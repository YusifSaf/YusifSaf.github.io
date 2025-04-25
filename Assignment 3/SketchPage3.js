//Main tutorial I used for this
//Patt Vira
//https://www.youtube.com/watch?v=eZHclqx2eJY

//just made a 3d text illusion which reacts to mouse position, changes color on mouse click and adjust its intensity on slider change

let font;
let points = [];

let slider1;
let slider2;
let input;
let inputText = "";

let r = 5;
let intensity = 2;
let angle = 10;
let colorRange = 0;



function preload(){
  font = loadFont("fonts/SpaceMono-Bold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  slider1 = createSlider(0, 20, 5);
  slider1.position(10, 10);

  slider2 = createSlider(0, 20, 2);
  slider2.position(10, 40);

  input = createInput();
  input.position(10, 80);
  input.value('type here');
  input.input(updateInput);

  let tutorialText = createP("Use your mouse and LMB to interact. Type in text and use sliders to tweak the motion");
  tutorialText.position(500, 500);

  points = font.textToPoints(inputText, 30, 300, 200, {
    sampleFactor: 0.2
  });
  
}

function mouseClicked(event) {
  colorRange +=50;
}

function updateInput() {
  inputText = input.value();
  if (inputText.length < 10) {
    points = font.textToPoints(inputText, 30, 300, 200, {
    sampleFactor: 0.2
  });}
  else {input.value("too much"); }
}

function draw() {
  let xOffset = map(mouseX, 0, width, 0, 10);
  let yOffset = map(mouseY, 0, width, 0, 10);

  r = slider1.value();
  intensity = slider2.value();

  if (colorRange>350) {colorRange=0}

  background(220);
  for (let i=0; i<points.length; i++) {
    ellipse(points[i].x + r*sin(angle + i*xOffset), points[i].y + r*sin(angle + i*yOffset), 18);
    fill(colorRange+i/4, 70, 100);
  }
  angle += intensity;
}
