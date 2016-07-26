var	REAR_OFFSET = 0.128;
var	MIDDLE_OFFSET = 0.158;
var	FAR_OFFSET = 0.198;

class CrowdFactory{

	constructor(role,stage,camera){
		this.role = role
		// this.role = 2;
		this.stage = stage;
		this.camera = camera;
		this.init();
	}


	init(){
		this.addFar();
		this.stage.addChild(this.camera);
		this.addMiddle();
		this.addRear();
	}


	addFar(){
		if(this.role == 1){
			this.far = new PIXI.extras.TilingSprite.fromFrame("m_far",640,354)
		}else{
			this.far = new PIXI.extras.TilingSprite.fromFrame("s_far",640,354)
		}

		this.far.position.x = 0;
		this.far.position.y = 80;
		this.far.tilePosition.x = 0;
		this.far.tilePosition.y = 0;
		this.stage.addChild(this.far)
	}

	

	

	addMiddle(){
		if(this.role == 1){
			this.middle = new PIXI.extras.TilingSprite.fromFrame("m_m",640,168)
		}else{
			this.middle = new PIXI.extras.TilingSprite.fromFrame("s_m",640,168)
		}
		this.middle.position.x = 0;
		this.middle.position.y = 250;
		this.middle.tilePosition.x = 0;
		this.middle.tilePosition.y = 0;
		this.stage.addChild(this.middle);
	}


	addRear(){
		if(this.role == 1){
			this.rear = new PIXI.extras.TilingSprite.fromFrame("m_rear",640,131)
		}else{
			this.rear = new PIXI.extras.TilingSprite.fromFrame("s_rear",640,131)
		}
		this.rear.position.x = 0;
		this.rear.position.y = 330;
		this.rear.tilePosition.x = 0;
		this.rear.tilePosition.y = 0;
		this.stage.addChild(this.rear);
	}


	update(TWEEN){
		var tween = new TWEEN.Tween(this.rear.tilePosition);
		tween.to({x:-80},3000);
		tween.repeat(Infinity);
		tween.yoyo(true);
		tween.start();
	


		var tween2 = new TWEEN.Tween(this.middle.tilePosition);
		tween2.to({x:-60},3333);
		tween2.repeat(Infinity);
		tween2.yoyo(true);
		tween2.start();


		var tween3 = new TWEEN.Tween(this.far.tilePosition);
		tween3.to({x:-40},5000);
		tween3.repeat(Infinity);
		tween3.yoyo(true);
		tween3.start();

		// this.rear.tilePosition.x -= REAR_OFFSET;
		// this.middle.tilePosition.x -= MIDDLE_OFFSET;
		// this.far.tilePosition.x -= FAR_OFFSET;
	
	}
}


module.exports = CrowdFactory;