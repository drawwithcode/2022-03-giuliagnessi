var video;
var button;
var snapshots = [];
var counter = 0;
var total = 86;
var mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(80);
  video = createCapture(VIDEO, ready);
  video.size(0, 0);
  imageMode(CORNER);

  mic = new p5.AudioIn();
  mic.start();
}

var go = false;

function ready() {
  go = true;
}

function draw() {
  if (go) {
    snapshots[counter] = video.get();
    counter++;
    if (counter == total) {
      counter = 0;
    }
  }

  var w = windowWidth / 4;
  var h = windowHeight / 4;
  var x = 0;
  var y = 0;

  var vol = mic.getLevel();
  var col = vol * 2000;

  for (var i = 0; i < snapshots.length; i++) {
    var index = (i + frameCount) % snapshots.length;
    image(snapshots[index], x, y, w, h);
    x = x + w / 2;

    if (x > width) {
      x = 0;
      y = y + h / 2;
    }

    rectMode(CENTER);
    fill(30, 30, col, 5);

    rect(width / 2, height / 2, windowWidth, windowHeight);
  }
}

