var Controler = require("./Controler.js")
var TWEEN = require("tween.js")
// var $ = window.$;
function Game(role,type,stage,renderer,ui){
	/**
	 * type 1: single
	 * 		2: dobule
	 */

	this.type = type;
	this.stage = stage;
	/**
	 * role 1: main
	 * 		2: second
	 */

	this.role = role;

	this.renderer = renderer;
	this.ui = ui;

	this.timer = null;
	this.state = null;

}


Game.prototype.init = function(){
	this.ui.addCrowd();

	// show distance times
	this.ui.addBG();
	// this.ui.addClouds();
	this.ui.addScore();
	this.ui.addTime();
	// this.ui.addCamera();
	this.ui.takePhoto();

	
	// this.ui.addFire();
	// this.ui.addPlayer(this.role);
	


	// var saucers = this.saucerPool.saucers;
	
	// for(var i= 0;i<saucers.length;i++){
	// 	this.stage.addChild(saucers[i]);
	// }


	this.controler = new Controler(this,this.role);
	this.update();
	
}



/**
 * !!!!!!!!!!!this again now not use at all 
 * [ready description]
 * @Author   yursile
 * @DateTime 2016-07-12T17:54:36+0800
 * @param    {[type]}                 again 
 */
Game.prototype.ready = function(again){
	var _this = this;
	this.state = "ready";
	var cdt = (this.role==1?"countDown":"countDown2_");
	var countDowns = [];
	for (let i=1; i < 5; i++)
	{
	     let texture = PIXI.Texture.fromFrame(cdt+i);
	     countDowns.push(texture);
	};

	this.countDown = new PIXI.extras.MovieClip(countDowns);
	this.countDown.animationSpeed = 0.018;
	this.countDown.position.x = 100;
	this.countDown.position.y = 350;



	this.stage.addChild(this.countDown);

	this.countDown.play();

	
	setTimeout(function(){
		_this.begin();
	},3000);
}

Game.prototype.readyToPlay = function(){
	var _this = this;
	console.log(this.role);
	console.log(window.Interact.roomID);
	window.Interact.socket.emit("zhan",{room_id:window.Interact.roomID,role:this.role==1?"main":"second"});
	window.Interact.socket.on("kezhan",function(){
		document.querySelector("#match_success").style.display = "none";

		_this.ready();
	})

}



Game.prototype.begin = function(fn){
	this.countDown.stop();
	this.stage.removeChild(this.countDown);
	this.state = "begin";



	// this.init();
	this.controler.start();

	//fire when click
	this.stage.interactive = true;
	// this.stage.on("touchstart",function(){
	// 	this.ui.player.fire();
	// 	setTimeout(function(){
	// 		this.ui.player.hold();
	// 	}.bind(this),200);
	// }.bind(this))

	// this.saucerPool.init();
	this.score = 0;
	//update distance and time

		//update clouds
	this.ui.update(TWEEN);

	// this.ui.crowd.update(TWEEN);
}




Game.prototype.update = function(){
	
	//test
	// update crowd

	// this.ui.update(TWEEN);


	TWEEN.update();



	// var saucerPool =  this.saucerPool;
	if(this.state == "begin" ){

		// var saucers = saucerPool.saucers;
		// for(var i= 0;i<saucers.length;i++){
		// 	saucers[i].move();
		// 	if(saucers[i].state == "miss"){
		// 		saucerPool.removeSaucer(saucers[i]);
		// 	}else if(saucers[i].state == "disapper"){
		// 		saucerPool.removeSaucer(saucers[i]);
		// 		this.ui.setScore(++this.score);
		// 	}
		// }

	
		/**
		 * if main player has not completed
		 */
		

	}
	// else if(this.state == "ready"){
	// 	this.renderer.render(this.stage);
	// }

	// this.renderer.render(this.stage);
	this.timer = webkitRequestAnimationFrame(this.update.bind(this));
	
	
	if(this.ui.state == "over"){
		this.over();
	}

	this.renderer.render(this.stage);

	/**
	 * 	if all player have completed;
	 */

	
}

Game.prototype.showGameover = function(){
	// this.overContainer = new PIXI.Container(0xF0F0F0);
	// this.overContainer.alpha = 0.5;
	// var overSprite = new PIXI.Sprite.fromFrame("gameover");
	// overSprite.position.x = 60;
	// overSprite.position.y = 450;
	// this.overContainer.addChild(overSprite);


	// this.stage.addChild(this.overContainer);
	// this.renderer.render(this.stage);
	// 
	document.querySelector(".gameover").style.display = "block";

}



Game.prototype.over = function(){
	this.state = "over";
	var _this = this;

	webkitCancelAnimationFrame(this.timer);
	this.timer = null;
	console.log("over");

	//show gameover
	
	this.showGameover();


	/**
	 * post this time and role
	 * 		wait the server return other time;
	 */


	if(this.type == 2){
	 	this.renderer.render(this.stage);

	 	window.Interact.socket.emit("completeTime",{room_id:window.Interact.roomID,role:this.role,time:this.ui.getScore()});
	 	window.Interact.socket.on("completed",function(data){

	 		_this.otherScore = data.time;

	 		_this.stage.removeChildren();

			// setTimeout(function(){
			// 	// this.renderer.render(this.navStage)
			// }.bind(_this),2000);

			_this.showResult();
	 	})
	}else{

	 	this.stage.removeChildren();
			

		this.showResult();
	}

}

Game.prototype.getPerson = function(arr){
	var l = arr.length;
	return arr[Math.floor(Math.random()*l)];
}

Game.prototype.showResult = function(){

	var main_player_score = this.ui.score;

	var level1 = ["王义夫",'许海峰','杜丽','庞伟'];
	var level2 = ['黄忠','许三多','后羿','小李广花荣'];
	var level3 = ['特种兵','雪豹突击队'];


	var otherScore = this.otherScore;

	//comment
	var comment = "";
	var totalNum = this.saucerPool.totalNum;
	// if(this.type == 1){

		if(main_player_score>totalNum*0.9){
			comment = "你在穿杨射柳的比赛中击中XX飞碟，枪法堪比"+this.getPerson(level1);
		}else if(main_player_score>=totalNum*0.7&&main_player_score<totalNum*0.9){
			comment = "你在穿杨射柳的比赛中击中XX飞碟，枪法堪比"+this.getPerson(level2);
		}else if(main_player_score>=totalNum*0.6&&main_player_score<totalNum*0.7){
			comment = "你在穿杨射柳的比赛中击中XX飞碟，枪法堪比"+this.getPerson(level3);
		}else if(main_player_score>=totalNum*0.3&&main_player_score<totalNum*0.6){
			comment = "你在穿杨射柳的比赛中击中XX飞碟，枪法还需多加练习⋯⋯"
		}
		else{
			comment = "你在穿杨射柳的比赛中击中XX飞碟，这枪法简直没谁了⋯⋯"
		}


	// }

	if(this.type==2) {
		document.querySelector(".second_s").style.display = "block";
		document.querySelector("#second_num").innerHTML = otherScore+"枚";
		document.querySelector(".doc").className = "doc double_p";
	}

	document.querySelector(".doc").innerHTML = comment;
	document.querySelector("#main_num").innerHTML = main_player_score+"枚";



	setTimeout(function(){
		document.querySelector(".gameover").style.display = "none";
		document.getElementById("result").style.display = "block";
		document.getElementById("gameWrapper").style.display = "none";
	},500)
}


Game.prototype.getRank = function(){
	var array = [];
	var _this = this;
	if(this.type == 1){
		array.push({
			name:_this.role ==1?"main":"second",
			time:_this.ui.getTime()
		});
		array.push({
			name:"npc",
			time:PlayerFactory.FAST_TIME
		});
		array.push({
			name:"npc",
			time:PlayerFactory.NORMAL_TIME
		});
	}else if(this.type == 2){
		array.push({
			name:"main",
			time:_this.role == 1 ? _this.ui.getTime():_this.otherScore
		});
		array.push({
			name:"second",
			time:_this.role == 2 ? _this.ui.getTime():_this.otherScore
		});
		array.push({
			name:"npc",
			time:PlayerFactory.NORMAL_TIME
		});
	}

	

	var swap = {};
	for(var i=1;i<array.length;i++){
		if(array[i].time < array[0].time){
			swap.time = array[i].time;
			array[i].time = array[0].time;
			array[0].time = swap.time; 

			swap.name = array[i].name;
			array[i].name = array[0].name;
			array[0].name = swap.name; 
		}

	}


	if(array[1].time>array[2].time){
		swap.time = array[1].time;
		array[1].time = array[2].time;
		array[2].time = swap.time; 

		swap.name = array[1].name;
		array[1].name = array[2].name;
		array[2].name = swap.name; 
	}

	return array;
}






module.exports = Game;