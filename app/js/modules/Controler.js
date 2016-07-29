var START_X = 530;
var START_Y = 252;
var ARROW_L = 43;
var TIME_L = 557;
var ARROW_TIME = 1000;
var END_Y = START_Y+TIME_L-ARROW_L;


var S_START = 350;
var S_END = 430;

var TWEEN = require("tween.js")
var Ball = require("./Ball.js")
var Player = require("./Player.js")

class Controler{
	constructor(game,role){
		this.game = game;
		this.role = role;
		this.preTime = 0;

		this.stage = game.stage;

	
		this.addArrow();

		// this.addBall();
	
		// this.player.

		this.player = new Player(this.role,this.stage);
		this.player.pickUp();
		this.addPlayer();
		this.addButtons();
	}




	shoot(){
		if(this.shootable){
			if(this.arrow.position.y<S_START){
				this.player.shoot(1);
			}else if(this.arrow.position.y>S_END){
				this.player.shoot(2)
			
			}else{
				this.player.shoot();

					/**
				 * test score
				 */
				setTimeout(function(){
					this.game.ui.plusScore();
				}.bind(this),300);

			}
		
		}

		this.shootable = false;
		this.button.interactive = false;
	}

	start(){
		this.shootable = true;
		this.button.interactive = true;
		var tween = new TWEEN.Tween(this.arrow.position);
		tween.to({y:END_Y},ARROW_TIME)
		.onComplete(this.end.bind(this))
		
		tween.start();

	}

	/**
	 * one chance of shoot 
	 * @return {[type]} [description]
	 */
	end(){
		//do something
		//
		//
		//
		this.shootable = false;
		this.button.interactive = false;
		// setTimeout(function(){
			this.arrow.position.y = START_Y;
			this.start();


		// }.bind(this),1000);
	

	}


	addArrow(){
		if(this.role==1){
			this.arrow = new PIXI.Sprite.fromFrame("m_arrow")
		}else{
			this.arrow = new PIXI.Sprite.fromFrame("s_arrow")
		}
		this.arrow.position.x = START_X;
		this.arrow.position.y = START_Y;
		this.stage.addChild(this.arrow);
	}


	addButtons(){
		var _this = this;
		if(this.role==1){
			this.button = new PIXI.Sprite.fromFrame("m_btn");
		}else{
			this.button = new PIXI.Sprite.fromFrame("s_btn");
		}


		this.button.interactive = true;
		this.button.position.x = 216;
		this.button.position.y = 700;

		this.stage.addChild(this.button);



		this.button.on("touchstart",function(){
			this.alpha = 0.5;
			_this.shoot();
			setTimeout(function(){
				this.alpha = 1;
			}.bind(this),100);
		});
		// this.button.on("touchend",function(){
		// 	this.alpha = 1;
		// 	// _this.
		// })
	}

	addPlayer(){
		
		this.stage.addChild(this.player);
	}

	/**
	 * deprected
	 */
	addBall(){
		this.ball = new Ball();
		this.stage.addChild(this.ball);
	}
}





module.exports = Controler;