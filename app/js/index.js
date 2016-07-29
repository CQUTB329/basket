
var PIXI = require('pixi.js');
var Interact = require("./modules/Socket.js");
var Page1 = require("./modules/Page1.js")
var all  = document.getElementById("gameWrapper");
var WIDTH = window.SCREEN_WIDTH = 640;
var HEIGHT = window.SCREEN_HEIGHT =1136;

var SCROLL_SPEED = 5;

var UI = require("./modules/UI.js")
var Game = require("./modules/Game")

function Main(){
  this.stage = new PIXI.Container(0xF0F0F0);
  this.renderer = new PIXI.CanvasRenderer(WIDTH, HEIGHT);
  this.renderer.backgroundColor = 0xF0F0F0;
  all.appendChild(this.renderer.view);
  this.loadSpriteSheet();
}

Main.prototype.loadSpriteSheet = function(){
  var assetsToLoad = ["img/go.json","img/sprite.json","img/players.json"];
  var loader = new PIXI.loaders.Loader();
  loader.add(assetsToLoad);
  // loader.on("progress",this.loading);
  loader.once("complete",this.spriteSheetLoaded.bind(this));
  loader.load();
  
}

/**
 * [loading description]
 * @Author   yursile
 * @DateTime 2016-07-15T16:16:43+0800
 * @return   {[type]}                 [description]
 */     
Main.prototype.loading = function(data){
  console.log(data);

}


Main.prototype.spriteSheetLoaded = function(){
  this.showNavigator();

  // this.setupGame();

}



/**
 * [isSecond if the player is second one]
 * @Author   yursile
 * @DateTime 2016-07-18T10:03:46+0800
 * @return   {Boolean}                [description]
 */
Main.prototype.isSecond = function(){
  var arg = window.location.search.slice(1);
  var arr = arg.split("&");
  var obj ={};
  for(let i in arr){
      let temp = arr[i].split("=");
      obj[temp[0]] = temp[1]
  }

  var roomid = obj.roomid;
  if(roomid){
    this.role = 2;
    this.type = 2;
    return true;
  }else{
    this.role = 1;
    return false;
  }
}

Main.prototype.showNavigator = function(){

  this.page1 = new Page1();

  //start click
  this.page1.startBtn.addEventListener("touchstart",this.toStart.bind(this),false);

  if(this.isSecond()){
    this.page1.showDouble();
    this.toStart();
  }
}

Main.prototype.toStart = function(){
  var _this = this;
  if(this.page1.type == 1){
    document.querySelector("#specification1").style.display = "block";
    document.querySelector("#gameWrapper").style.display="block"
    this.page1.hide();
    this.setupGame();
  }else{
    window.Interact.init();
    window.Interact.generateQR(document.querySelector(".ewm_box"));
    document.querySelector("#specification2").style.display = "block";


    // monitor other player enter
    
    window.Interact.onMatched(function(){
      _this.setupGame();
      // _this.page1.stopAnimation();
      document.querySelector("#specification2").style.display = "none";
      document.querySelector("#match_success").style.display = "block";
      document.querySelector(".page1").style.display="none";
      document.querySelector(".gameWrapper").style.display="block";

      // set
    });

  }
}

Main.prototype.setupGame = function(){

    this.ui = new UI(this.stage,this.role);

    

    ////////////////
    // add player //
    ////////////////
    
    /**
     * [game description]
     * @role 1 ,  2
     * @type 1 single 2 double
     */
    console.log(this.role);
    window.game = this.game = new Game(this.role,this.page1.type,this.stage,this.renderer,this.ui);
    this.game.init();   
    
    this.renderer.render(this.stage);
  // }
}



window.main = new Main();





