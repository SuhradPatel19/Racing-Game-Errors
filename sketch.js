var canvas;
var backgroundImage;
var bgImg;
var database;
var myform, myplayer, mygame

var myplayerCount, myGamestate
var allPlayers,car1, car2, car1Image, car2Image
var cars,track
var lifeImage

var fuelGroup,fuelImage
var coinsGroup,coinsImage
var obstacle1, obstacle1Image
var obstacle2, obstacle2Image


function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Image = loadImage("./assets/car1.png")
  car2Image = loadImage("./assets/car2.png")
  track = loadImage("./assets/track.jpg")
  fuelImage = loadImage("./assets/fuel.png")
  coinsImage= loadImage("./assets/goldCoin.png")
  lifeImage= loadImage("./assets/life.png")
  obstacle1Image= loadImage("./assets/obstacle1.png")
  obstacle2Image= loadImage("./assets/obstacle2.png")

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  mygame = new Game()
  mygame.start()
  mygame.getState()
  console.log(myGamestate)


}



function draw() {
  background(backgroundImage);
  if (myplayerCount === 2) {
    mygame.updateState(1)
  }

  if (myGamestate === 1) {
    mygame.play()

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// updating the rank is not working
// track is not moving properly for second player
// fuel bar should decrease when its not collecting fuel
