var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add chidren

//Graphics
//[Background]

var bg; //The background Graphics

//[Title View]

var main; //The Main Background 
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu

//[Credits]

var credits; //The Credits screen
//[Game View]

var player; //The player paddle Graphics
var ball; //The ball Graphics
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup

//[Score]

var playerScore; //The main player score 
var cpuScore; //The CPU score 
var cpuSpeed = 6; //The speed of the CPU paddle; the faster it is the game is 

var xSpeed = 5;
var ySpeed = 5;

var tkr = new Object;

//preloader

var preloader; // contain the PreloadJS object
var manifest; // holds the list of files needed to load
var totalLoaded = 0; // the list of files already loaded

var TitleView = new Container(); // hold several graphics together and make them appear all together

function Main()
{
  /* Link Canvas */

  canvas  docoment.getElementById('PongStage');

  stage = new Stage(canvas) // create Stage object for the canvas

  stage.mouseEventsEnabled = true;  // to detect mouse movements

  /* set the flash plugin for browsers that don't support sound */
  SoundJS.FlashPlugin.BASE_PATH = "assets/";
  if ( !SoundJS.checkPlugin(true)) {
    alert("Error!");
    return;
  }

manifest = [
            {src:"bg.png", id:"bg"},
                {src:"main.png", id:"main"},
                {src:"startB.png", id:"startB"},
                {src:"creditsB.png", id:"creditsB"},
                {src:"credits.png", id:"credits"},
                {src:"paddle.png", id:"cpu"},
                {src:"paddle.png", id:"player"},
                {src:"ball.png", id:"ball"},
                {src:"win.png", id:"win"},
                {src:"lose.png", id:"lose"},
                {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
                {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
                {src:"hit.mp3|hit.ogg", id:"hit"},
                {src:"wall.mp3|wall.ogg", id:"wall"}
            ];
      preloader = new PreloadJS();
      preloader.installPlugin(SoundJS)
      preloader.onProgress = handleProgress;
      preloader.onComplete = handleComplere;
      preloader.onFileLoad = handleFileLoad;
      preloader.loadManifest(manifest);

      /* Ticker */
      Ticker.setFPS(30)
      Ticker.addListener(stage);
}

function handleProgress(event)
{
  //use event.load to get the percentage of the loading
}

function handleComplete(event) {
  //triggered when all loading is complete
}

function handleFileLoad(event) {
  // trigger when an individual file completes loading

  switch(event.type)
  {
    case PreloadJS.IMAGE:
    // image loaded
    var img = new Image()
      img.src = event.src;
      img.onload = handleLoadComplete;
      window[event.id] = new Bitmap(img);
    break;

    case PreloadJS.SOUND:
    // sound loaded

    handleLoadComplete();
    break;

  }
}

function handleLoadComplete(event)
{
  totalLoaded++;

  if (manifest.length==totalLoaded)
  {
    addTitleView();
  }
}

function addTitleView()
{
  //console.log('Add Title View');
  startB.x = 240 - 31.5;
  startB.y = 160;
  startB.name = 'startB';

  creditsB.x = 241 -42;
  creditB.y = 200;

  TitleView.addChild(main, startB, creditB);
  stage.addChild(bg, TitleView);
  stage.update();

  // Button Listeners

  startB.onPress = tweenTitleView;
  creditsB.onPress = showCredits;
}

function showCredits()
{
  //show Credits

  credits.x = 480;

  stage.addChild(credits)
  stage.update();
  Tween.get(credits).to({x:0}, 300);
  credits.onPress = hideCredits;
}

// Hide Credits

function hideCredits(e)
{
  Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}
// Remove Credits

function rmvCredits()

{
  stage.removeChild(credits);
}

//Tween Title View

function tweenTitleView()
{
  // Start Game

  Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}


