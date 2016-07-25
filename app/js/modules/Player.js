
function Player(role,fires){
	this.role = role;
	console.log(this.role)
	this.fires = fires;


	var cdt = (this.role==1?"main_player":"second_player");
	console.log(cdt);
	var textures = [];
	for (let i=1; i < 3; i++){
	     let texture = PIXI.Texture.fromFrame(cdt+i);
	     textures.push(texture);
	};


	PIXI.extras.MovieClip.call(this,textures);
	this.animationSpeed = 0.2;
	// this.loop = false;
	this.position.x = Player.CX;
	this.position.y = Player.CY;
	// this.play();
	// 
	
}
Player.CX = 35;
Player.CY = 670;

Player.constructor = Player;
Player.prototype = Object.create(PIXI.extras.MovieClip.prototype);






Player.prototype.fire = function(){
	this.play();
	this.fires.alpha = 1;
	this.fires.play();

}

Player.prototype.hold = function(){
	this.stop();
	this.fires.alpha = 0;
	this.fires.stop();

}
module.exports = Player;