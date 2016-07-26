
function Player(role,ball){
	this.role = role;
	this.ball = ball;

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

	
}
Player.CX = 180;
Player.CY = 500;

Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.MovieClip.prototype);





Player.prototype.shoot = function(){
	this.gotoAndPlay(0);

	this.ball.shoot();

	setTimeout(function(){
		this.hold();
	}.bind(this),300);

}

Player.prototype.hold = function(){
	this.gotoAndStop(1);
	// this.ball.stop();

}
module.exports = Player;