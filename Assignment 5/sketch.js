// REFERENCES AND WHAT I HAVE USED BELOW

// Modified pitch detection code
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/151-ukulele-tuner.html
// https://youtu.be/F1OkDTUkKFo
// https://editor.p5js.org/codingtrain/sketches/8io2zvT03

// Modified visuals code
// Synergy Development
// https://www.youtube.com/watch?v=AsRzzv3vL0Y

// FFT tutorials that helped out a lot :)
// https://www.youtube.com/watch?v=x_aGtSZMEUA&list=PL0beHPVMklwjNRGtN74Mp6JCub4Dd_y5w&index=12
//https://www.youtube.com/watch?v=2O3nm0Nvbi4&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=18

//first line is the reference to the ml5 library to integrate it into the code
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let fft;
let spectrum;
let strokeHue;
let strokeSaturation;
let amp;
let font;

//list of notes with their corresponding frequencies. I generated it with ChatGPT
let notes = [
  { note: 'A2', freq: 110.00 },
  { note: 'A#2', freq: 116.54 },
  { note: 'Bb2', freq: 116.54 },
  { note: 'B2', freq: 123.47 },
  { note: 'C3', freq: 130.81 },
  { note: 'C#3', freq: 138.59 },
  { note: 'Db3', freq: 138.59 },
  { note: 'D3', freq: 146.83 },
  { note: 'D#3', freq: 155.56 },
  { note: 'Eb3', freq: 155.56 },
  { note: 'E3', freq: 164.81 },
  { note: 'F3', freq: 174.61 },
  { note: 'F#3', freq: 185.00 },
  { note: 'Gb3', freq: 185.00 },
  { note: 'G3', freq: 196.00 },
  { note: 'G#3', freq: 207.65 },
  { note: 'Ab3', freq: 207.65 },
  { note: 'A3', freq: 220.00 },
  { note: 'A#3', freq: 233.08 },
  { note: 'Bb3', freq: 233.08 },
  { note: 'B3', freq: 246.94 },
  { note: 'C4', freq: 261.63 }, 
  { note: 'C#4', freq: 277.18 },
  { note: 'Db4', freq: 277.18 },
  { note: 'D4', freq: 293.66 },
  { note: 'D#4', freq: 311.13 },
  { note: 'Eb4', freq: 311.13 },
  { note: 'E4', freq: 329.63 },
  { note: 'F4', freq: 349.23 },
  { note: 'F#4', freq: 369.99 },
  { note: 'Gb4', freq: 369.99 },
  { note: 'G4', freq: 392.00 },
  { note: 'G#4', freq: 415.30 },
  { note: 'Ab4', freq: 415.30 },
  { note: 'A4', freq: 440.00 },
  { note: 'A#4', freq: 466.16 },
  { note: 'Bb4', freq: 466.16 },
  { note: 'B4', freq: 493.88 },
  { note: 'C5', freq: 523.25 },
  { note: 'C#5', freq: 554.37 },
  { note: 'Db5', freq: 554.37 },
  { note: 'D5', freq: 587.33 }
];

//loaded font so I can display it in WEBGL
function preload() {
  font = loadFont('SpaceMono-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255);
  textFont(font);
  
  //setting up mic input
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  
  //setting up FFT and assigning mic as its input value
  fft = new p5.FFT();
  fft.setInput(mic);
}

//initializng ml5's pitch detection on mic start
function listening() {
  console.log('listening');
  pitch = ml5.pitchDetection(
    model_url,
    audioContext,
    mic.stream,
    modelLoaded
  );
}


function draw() {
  background(0);
  noFill();
  stroke(255);
  textAlign(CENTER, CENTER);

  //analyzing the audio input from mic and converting it into an array with frequencies
  spectrum = fft.analyze();
  
  //this is to detect which note the frequency corresponds to
  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }


  let diff = recordDiff;
  
  //changing hue on pitch
  strokeHue = map(freq, 80, 715, 0, 255);
  amp = mic.getLevel() * 100;
  strokeSaturation = map(amp, 0, 30, 150, 255);
  stroke(strokeHue, strokeSaturation, 255);

  //Rotating the boxes and increasing their size based on volume. This is the part that I took from Synergy Development reference, which is at the very top.
  for (let i=100; i>10; i-=20) {
    push(); 
      rotateX(frameCount/120);
      rotateY(frameCount/100);
      rotateZ(frameCount/80);

    if (spectrum[i] > 60) {
      box(floor(spectrum[i]));
    }   
    pop();
  } 
  
  // Printing the note and its frequency on the screen
  fill(255);
  textSize(32);
  text(freq.toFixed(2), 0, 100);
  textSize(64);
  text(closestNote.note, 0, 150);
}

//confirming that the model has been loaded and getting the pitch
function modelLoaded() {
  console.log('model loaded');
  pitch.getPitch(gotPitch);
}

//getting the pitch and showing error in case the model can't recognize the note
function gotPitch(error, frequency) {
  if (error) {
    console.error(error);
  } else {
    //console.log(frequency);
    if (frequency) {
      freq = frequency;
    }
    pitch.getPitch(gotPitch);
  }
}