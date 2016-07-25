function Fires(){


	var textures = [];
	for (let i=1; i < 3; i++){
	     let texture = PIXI.Texture.fromFrame("fires"+i);
	     textures.push(texture);
	};


	PIXI.extras.MovieClip.call(this,textures);
	this.animationSpeed = 0.1;
	this.alpha = 0;
	// this.position.x = Player.CX+200;
	// this.position.y = Player.CY+50;
	this.position.x = 35+205;
	this.position.y = 670+55;
	// this.play();
}

Fires.prototype = Object.create(PIXI.extras.MovieClip.prototype);
Fires.constructor = Fires;
module.exports = Fires;