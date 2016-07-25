var Saucer = require("./Saucer.js");


var TOP = -200;
var BOTTOM = 0;
var RIGHT = 640;
var LEFT  = 0;

function SaucerPool(stage){
	this.stage = stage;
	this.saucers = [];
	this.totalNum = 0;
}


SaucerPool.prototype.init = function(){
	this.index = 1;
	this.batch();


	setTimeout(function(){
		clearTimeout(this.batchTimer);
		this.batchTimer = null;
		this.index = 1;
	}.bind(this),15000);
}

SaucerPool.prototype.batch = function(){

	for(var i=0;i<this.index;i++){
		this.addSaucer();
	}
	this.index++;
	this.batchTimer = setTimeout(function(){
		this.batch();
	}.bind(this),2000)
}

SaucerPool.prototype.addSaucer = function(){
	var coordinate = this.generateRandom();
	// console.log(x);
	var saucer = new Saucer(coordinate.x,coordinate.y,this.stage);
	this.saucers.push(saucer);
	this.stage.addChild(saucer);
	this.totalNum++;
}

SaucerPool.prototype.removeSaucerByIndex = function(index){
	this.saucers.slice(index,1);
}

SaucerPool.prototype.removeSaucer = function(saucer){
	var l = this.saucers.length;
	for(var i=0;i<l;i++){
		if (this.saucers[i] === saucer){
			this.stage.removeChild(saucer);
			this.saucers.splice(i,1);
			saucer = null;

			break;
		}
	}
}


SaucerPool.prototype.generateRandom = function(){
	// var y = BOTTOM - Math.floor(Math.random()*TOP);
	// var x = RIGHT - Math.floor(Math.random()*LEFT);
	var y =  Math.floor(Math.random()*TOP);
	var x =  Math.floor(Math.random()*RIGHT);
	return {x:x,y:y};
}

SaucerPool.prototype.within = function(min,max){
	return (max - Math.floor(Math.random()*min));
}

module.exports = SaucerPool;