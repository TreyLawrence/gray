var system, video;

var vidScale = 1;
var img; 

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vidScale, height/vidScale);
  img = new jsfeat.matrix_t(width/vidScale, height/vidScale, jsfeat.U8C1_t);
}

function draw() {
  video.loadPixels();
  jsfeat.imgproc.grayscale(video.pixels, width/vidScale, height/vidScale, img);
  jsfeat.imgproc.gaussian_blur(img, img, 6, 0);
  jsfeat.imgproc.canny(img, img, 20, 50);
  loadPixels();
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      var canvasIdx = (j * width * 4) + (i * 4);
      var vidIdx = (floor(j/vidScale) * floor(width/vidScale)) + floor(i/vidScale);
      var col = img.data[vidIdx];
      pixels[canvasIdx] = col;
      pixels[canvasIdx+1] = col;
      pixels[canvasIdx+2] = col;
      pixels[canvasIdx+3] = 255;
    }
  }
  updatePixels();
}
