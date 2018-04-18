function drop(slider,slide){
	this.minheight = 20;
	this.maxheight = 100;
	this.time = 1000;
	this.timer = null;
	this.toggled = false;
	
	this.slider = document.getElementById(slider);
	this.controler = document.getElementById(slide);
	this.slider.style.height = this.minheight + 'px';
	
	this.go()
}
drop.prototype.go = function(){
	var _self = this;
	this.controler.onclick = function(){
//		会改变的值，第一个是点击的时候时间
//		第二个改变的来回的值
//		第三个改变后的高度
		_self.initTime = (new Date()).getTime();
		_self.endHeight = (_self.toggled =!_self.toggled) ? _self.maxheight: _self.minheight;
		_self.initHeight = parseInt(_self.slider.style.height);
		_self.dispHeight = _self.endHeight - _self.initHeight;
		
		_self.timer = setInterval(function(){
			_self.dispTime = (new Date()).getTime() - _self.initTime;
			if(_self.dispTime < 1000){
				_self.slider.style.height = _self.initHeight + Math.floor(_self.dispHeight * _self.dispTime/1000) + 'px';
			}else{
				_self.slider.style.height = _self.endHeight + 'px';
				clearInterval(_self.timer)
			}
		},30)
		return false;
	}
}
