var TWEEN  = require("tween.js");


/**
 * beans:
 * @type 
 * @DateTime 2016-07-18T10:12:06+0800
 */
function Page1(){
	//initial type 
	this.type = 1;
	// this.game = 
	this.bindEvt();
	this.startBtn = document.querySelector(".start");
}

Page1.prototype.bindEvt = function(){
	var _this = this;
	document.querySelector(".single").addEventListener("click",this.showSingle.bind(this),false);

	document.querySelector(".double").addEventListener("click",this.showDouble.bind(this),false);

}



Page1.prototype.showSingle = function(){
	document.querySelector(".double").className = "double";
	document.querySelector(".single").className = "active single";
	this.type = 1;
}

Page1.prototype.showDouble = function(){
	document.querySelector(".single").className = "single";
	document.querySelector(".double").className = "active double";
	this.type = 2;
}

Page1.prototype.emitEvt = function(ele,type){
  	var evt = document.createEvent("MouseEvents");  
    evt.initEvent("click", true, true);  
    ele.dispatchEvent(evt); 
}

Page1.prototype.hide = function(){
	document.querySelector(".page1").style.display = "none";
}






module.exports = Page1;



