var Ball = require("./Ball.js")
var BALL_NUM = 15;

function Player(role,stage){
	this.role = role;
	this.stage = stage;

	// this.balls = 

	var cdt = (this.role==1?"m_player":"s_player");
	var textures = [];
	for (let i=1; i < 3; i++){
	     let texture = PIXI.Texture.fromFrame(cdt+i);
	     textures.push(texture);
	};


	PIXI.extras.MovieClip.call(this,textures);
	this.animationSpeed = 0.08;

	this.position.x = Player.CX;
	this.position.y = Player.CY;
	this.loop = false;




	// init balls
	
	this.balls = [];
	this.initBalls();

	
}
Player.CX = 180;
Player.CY = 500;

Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.MovieClip.prototype);



Player.prototype.initBalls = function(){

	for (var i = 0;i<BALL_NUM;i++){
		var ball = new Ball();
		ball.alpha = 0;
		this.balls.push(ball);
		this.stage.addChild(ball);
	}


}


Player.prototype.shoot = function(direction){
	this.gotoAndPlay(0);

	this.ball.shoot(direction);

	setTimeout(function(){
		this.hold();
	}.bind(this),300);

}



/**
 * shoot complete
 * pick up a new ball
 * @return {[type]} [description]
 */
Player.prototype.hold = function(){
	this.gotoAndStop(0);
	// this.ball.stop();
	// 
	// 
	this.pickUp();

}


Player.prototype.pickUp = function(){
	this.ball = this.balls.pop();
	if(this.ball)
		this.ball.alpha = 1;
	// this.stage.addChild(this.ball);
}
module.exports = Player;