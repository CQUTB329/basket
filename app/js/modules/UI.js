var TWEEN = require("tween.js");
var Player = require("./Player.js")
// var Fires = require("./Fires.js")
var WIDTH = window.SCREEN_WIDTH;
var HEIGHT = window.SCREEN_HEIGHT;
var FLOORY = 620;
var BARY = 475;


var CrowdFactory = require("./CrowdFactory.js")

var STYLE_S = {
	    font : 'bold italic 40px Arial'
	};

var STYLE = {
	font : 'bold italic 60px Arial'
}

var STYLE_X = {
	font : 'bold italic 40px Arial'
}

function UI(stage,role,tween){
	this.stage = stage;

	// this.addBG();
	// this.addScore();	
	// this.addTime();


	this.score = 0;
	this.time = 15;
	this.role = role;

	// TWEEN = tween;
}

PIXI.SCALE_MODES = "LINEAR";

UI.CAMERA_MAX_Y = 300;


UI.prototype.addBG = function(){
	if(this.role == 1){
		this.bg = new PIXI.Sprite.fromImage("img/main_bg.png");		
	}else{
		this.bg = new PIXI.Sprite.fromImage("img/second_bg.png");		
	}
	this.stage.addChild(this.bg);
}
/**
 * [addPlayer description]
 * @Author   yursile
 * @DateTime 2016-07-19T19:03:39+0800
 * @param    {role}                 role 1:main 2: second
 */
UI.prototype.addPlayer = function(){
	this.player = new Player(this.role,this.fires);
	this.stage.addChild(this.player);
}

// UI.prototype.addFire = function(){
// 	this.fires = new Fires();
// 	this.stage.addChild(this.fires);
// }




UI.prototype.addScore = function(){

	this.scoreBg = new PIXI.Sprite.fromFrame("scores")
	this.scoreBg.position.y = 12;
	this.stage.addChild(this.scoreBg)


	this.scoreText = new PIXI.Text("00",STYLE);
	this.scoreText.x = 530;
	this.scoreText.y = 10;
	this.stage.addChild(this.scoreText);
	
}

UI.prototype.plusScore = function(){
	this.setScore(++this.score);
}


UI.prototype.addCrowd = function(){
	this.addCamera();
	console.log(this.role)
	this.crowd = new CrowdFactory(this.role,this.stage,this.camera);
}

UI.prototype.addTime = function(){



	this.TimeText = new PIXI.Text(this.time,STYLE);
	this.TimeText.x = 5;
	this.TimeText.y = 10;
	this.stage.addChild(this.TimeText);

}

UI.prototype.updateTime = function(){
	var _this = this;
	this.timer = setInterval(function(){
		
		_this.TimeText.text = (--_this.time)>9?_this.time:("0"+_this.time);
		if(_this.time == 0) {
			clearInterval(_this.timer);
			_this.timer = null;
			_this.over();

		}
	},1000)
}


UI.prototype.setScore = function(score){
	if(score<10){
		this.scoreText.text = "0"+score;
	}else{
		this.scoreText.text  = score;
	}
	this.score = score;
	
}

UI.prototype.getTime = function(){
	return this.time;
}

UI.prototype.getScore = function(){
	return this.score;
}


UI.prototype.over = function(){
	this.state = "over";
}

UI.prototype.update = function(tween){
	this.state = "update";
	// TWEEN = tween;
	this.updateTime();
	// this.updateClouds();
	this.crowd.update(tween);
}

UI.prototype.again = function(){
	this.TimeText.text = this.time = "0.00";
	this.scoreText = this.score = "000";
}


UI.prototype.addCamera = function(){
	this.camera = new PIXI.Sprite.fromFrame("camera");
	this.camera.position.y = UI.CAMERA_MAX_Y;
	this.picturing = new PIXI.Sprite.fromFrame("caa");
	this.picturing.position.x = 80;
	this.picturing.position.y = -20;
	this.picturing.alpha = 0;
	// this.picturing.scale = 0.1;
	this.camera.addChild(this.picturing);
	// this.stage.addChild(this.camera);
}



UI.prototype.takePhoto = function(){
	var tween = new TWEEN.Tween(this.camera.position);
	var coordinate = generatePicturingPosition();
	this.camera.position.x = coordinate.x;
	tween.to({y:coordinate.y},1000)
	.onComplete(this.caa.bind(this));

	tween.start();
}

UI.prototype.caa = function(){
	this.caaTween = new TWEEN.Tween(this.picturing);
	this.caaTween.to({alpha:1},300).
	onComplete(this.hideCamera.bind(this)).
	start();

}

UI.prototype.hideCamera = function(){
	this.picturing.alpha = 0;
	// this.picturing.scale = 0.1;
	var tween = new TWEEN.Tween(this.camera.position);
	tween.to({y:UI.CAMERA_MAX_Y},1000).
	onComplete(function(){
		this.takePhoto();
	}.bind(this),2000).
	delay(1000);
	tween.start();
}

UI.prototype.stopAnimation = function(){
	webkitCancelAnimationFrame(this.timer);
	this.timer = null;
}




function generatePicturingPosition(){
	var minX = 0;
	var maxX = 600;
	var minY = 120;
	var maxY = 250;

	var x = Math.floor(Math.random()*maxX);
	var y = Math.max(Math.floor(Math.random()*maxY),minY);

	// var y = Math.random()*maxY;
	var coordinate = {
		"x":x,
		"y":y
	};
	return coordinate;
}





module.exports = UI;