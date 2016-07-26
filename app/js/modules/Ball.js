var TWEEN = require("tween.js");
function Ball(){
	var textures = [];
	for (let i=1; i < 7; i++){
	     let texture = PIXI.Texture.fromFrame("ball"+i);
	     textures.push(texture);
	};

	PIXI.extras.MovieClip.call(this,textures);
	this.animationSpeed = 0.1;
	this.position.x = 242;
	this.position.y = 493;
}
var START_X = 242;
var START_Y = 483;
var TOP_Y = 200;
var YES_Y = 300;
var LEFT_X = 100;
var DOWN_Y = 700;
var RIGHT_X = 540;
var CENTER_Y = 516; 

Ball.prototype = Object.create(PIXI.extras.MovieClip.prototype);
Ball.constructor = Ball;


Ball.prototype.shoot = function(direction){
	this.play();
	//shoot has completed
	this.straight(direction);
	setTimeout(function(){
		this.reBack();
	}.bind(this),1000);
		// tween.easing(tenStepEasing);
}

Ball.prototype.score = function(){
	// this.position.y = 
}

Ball.prototype.reBack = function(){
	this.position.x = START_X;
	this.position.y = START_Y;
	this.alpha = 1;
	this.scale.x = this.scale.y = 1;
	this.stop();
}



Ball.prototype.straight = function(direction){
	this.t = 1;

	// this.position.y += 
	var straight = new TWEEN.Tween(this.position);
	
	straight.easing(TWEEN.Easing.Elastic.InOut)


	straight.to({
		y:TOP_Y
	},200);

	straight.start();

	if(!direction){
		straight.onComplete(function(){
			this.goDown()
		}.bind(this));


		straight.onUpdate(function(){
			this.t -= 0.05;
			this.scale.y = this.scale.x = this.t;
			this.position.x += this.t*5
		}.bind(this))

	}else if(direction == 1){
		straight.onComplete(function(){
			this.goLeft()
		}.bind(this));
		
		straight.onUpdate(function(){
			this.t -= 0.05;
			this.scale.y = this.scale.x = this.t;
			this.position.x -= this.t*3
		}.bind(this))
	}else{
		straight.onComplete(function(){
			this.goRight();
		}.bind(this));


		straight.onUpdate(function(){
			this.t -= 0.05;
			this.scale.y = this.scale.x = this.t;
			this.position.x += this.t*15
		}.bind(this))
	}

	


	// var down = new TWEEN.Tween(this.position)
	// down.easing(TWEEN.Easing.Quintic.In)
	// down.to({
	// 	y:YES_Y
	// },200)
	// .onComplete(function(){
	// 	this.alpha = 0
	// }.bind(this));
}

Ball.prototype.goDown = function(){
	var down = new TWEEN.Tween(this.position)
	down.easing(TWEEN.Easing.Quintic.In)
	down.to({
		y:YES_Y
	},200)
	.onComplete(function(){
		this.alpha = 0;
		// this.
	}.bind(this));
	down.start();
}


Ball.prototype.goLeft = function(){
	var downLeft = new TWEEN.Tween(this.position)
	downLeft.easing(TWEEN.Easing.Cubic.In)
	downLeft.to({
		y:DOWN_Y,
		// x:LEFT_X
	},500)
	.onUpdate(function(){
		this.position.x -=8; 
	}.bind(this))
	.onComplete(function(){
		this.upLeft()
	}.bind(this));
	downLeft.start();
}

Ball.prototype.upLeft = function(){
	var upleft = new TWEEN.Tween(this.position)
	upleft.easing(TWEEN.Easing.Quintic.In)
	upleft.to({
		y:CENTER_Y,
		x:-50
	},200)
	.onComplete(function(){
		this.alpha = 0
	}.bind(this));
	upleft.start();
}


Ball.prototype.goRight = function(){
	var downLeft = new TWEEN.Tween(this.position)
	downLeft.easing(TWEEN.Easing.Cubic.In)
	downLeft.to({
		y:DOWN_Y,
		// x:LEFT_X
	},500)
	.onUpdate(function(){
		this.position.x +=8; 
	}.bind(this))
	.onComplete(function(){
		this.upRight()
	}.bind(this));
	downLeft.start();
}

Ball.prototype.upRight = function(){
	var upleft = new TWEEN.Tween(this.position)
	upleft.easing(TWEEN.Easing.Quintic.In)
	upleft.to({
		y:CENTER_Y,
		x:700
	},200)
	.onComplete(function(){
		this.alpha = 0
	}.bind(this));
	upleft.start();
}




// function tenStepEasing(k) {
//     return Math.floor(k * 10) / 10;
// }
module.exports = Ball;