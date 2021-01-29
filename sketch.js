let video;
const vScale = 16;

let redSlider;

function setup() {
  redSlider = createSlider(0, 255, 200);
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(0);
  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (video.width - x + 1 + (y * video.width)) * 4;
      
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];

      let redDistance = dist(255, 0, 0, r, g, b); 
      let bright;

      if (redDistance < redSlider.value()) {
        // this is red-ish...
        fill(r, 0, 0);
        bright = 255; // behave as if maximum brightness
      } else {
        fill(255, 255, 255);
        bright = (r + g + b) / 3;
      }

      let w = map(bright, 0, 255, 0, vScale);

      noStroke();
      ellipseMode(CENTER);
      ellipse(x * vScale, y * vScale, w);
    }
  }
}