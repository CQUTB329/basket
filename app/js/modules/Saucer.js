function Saucer(x,y,stage,index){

	this.texture = PIXI.Texture.fromFrame("saucer");

	this.stage = stage;
	PIXI.Sprite.call(this,this.texture,Saucer.WIDTH,Saucer.HEIGHT);

	this.position.x = x-Saucer.WIDTH/2+8;
	this.position.y = y||-90;
	this.index = index||null;
	

	this.direction == 2
	this.setScale(INITIAL_SCALE);

/**
 * clicable
 */
	this.interactive = true;
	this.clickable();

	this.VELOCITY = 0.4;
}


Saucer.WIDTH = 218;
Saucer.HEIGHT = 97;
Saucer.MAXY = 1008;
Saucer.MAXX = 640-Saucer.WIDTH/2;
Saucer.MINX = 0;
// Saucer.DELTA_X = 0.64;


/**
 * v^2 = 2gh;
 */

// var this.VELOCITY = 0.4;

var ACCELERATION = 0.06;
const XSPEED = 3;
const INITIAL_SCALE = 0.2;

Saucer.prototype = Object.create(PIXI.Sprite.prototype);
Saucer.prototype.constructor = Saucer;

Saucer.prototype.setScale = function(scale){
	this.scale.x = scale;
	this.scale.y = scale;
}

Saucer.prototype.fallDown = function(){
	this.position.y += this.VELOCITY;
	this.setScale(Math.min(Math.max(this.position.y/500,INITIAL_SCALE),1));
	// console.log(this.position.y);
	this.VELOCITY = this.VELOCITY+ACCELERATION;
	if(this.position.y>Saucer.MAXY){
		this.miss();
	}
}

/**
 * left :1
 * right :2
 */
Saucer.prototype.drift = function(){

	if(this.position.x>Saucer.MAXX){
		this.direction = 1
	}else if(this.position.x<Saucer.MINX){
		this.direction = 2
	}

	if(this.direction == 1){
		this.position.x -= XSPEED;
	}else if(this.direction == 2){
		this.position.x += XSPEED;
	}
}


Saucer.prototype.move = function(){
	this.fallDown();
	this.drift();
}

/**
 * give a state to saucer pool through game
 * @Author   yursile
 * @DateTime 2016-07-19T10:15:46+0800
 * @return   {[type]}                 [description]
 */
Saucer.prototype.miss = function(){
	this.state = "miss"
}

Saucer.prototype.within = function(min,max){
	return (max - Math.floor(Math.random()*min));
}


Saucer.prototype.clickable = function(){
	this.once("touchstart",this.disapper);
}

Saucer.prototype.disapper = function(){
	this.state = "disapper";

	//add score
	

	//firing
	
	var disappering = "disappering"
	var disappers = [];
	for (let i=1; i < 6; i++)
	{
	     let texture = PIXI.Texture.fromFrame(disappering+i);
	     disappers.push(texture);
	};

	this.bye = new PIXI.extras.MovieClip(disappers);
	this.bye.loop = false
	this.bye.animationSpeed = 0.5;
	this.bye.position.x = this.position.x;
	this.bye.position.y = this.position.y;
	this.bye.scale = this.scale;



	this.stage.addChild(this.bye);
	this.bye.play();
	setTimeout(function(){
		// this.bye.destroy();
		this.stage.removeChild(this.bye);
		this.bye = null;
	}.bind(this),200);
}

module.exports = Saucer;
