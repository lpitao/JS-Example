var upSlider = function(){
	this.ID = document.getElementById(arguments[0]);
	this.Step = arguments[1];
	this.WaitTime = arguments[2];
	this.timer = arguments[3];
	this.distance = arguments[4];
	this.stopTime = arguments[5];
	this.ClientScroll = this.ID.scrollHeight; //带滚动条的高度
	this.ID.innerHTML += this.ID.innerHTML;
	this.CTL = 0;
	this.stop = 0;
	this.Start();//对象调用
}
//原型函数中不能用对象变量，只能将对象作为变量传进去,也不能直接调用对象方法。
//变幻过的对象引用也不行
upSlider.prototype.Start = function(){
	var sliObj = this;
	//开始,调用，
	//因为原型方法不能引用,哪怕是对象调用也不可以
	this.StartID = function() { 
		//调用另一个原型函数，用对象调用
		sliObj.Scroll(); 
	}
	//初始化第一次暂停的时间
    this.TimeO = setTimeout(function(){
		sliObj.TimerID = setInterval(sliObj.StartID, sliObj.timer);
	},sliObj.stopTime)
	
	
//	动画效果往前跑setInterval(),在setInterval()里面定义超过某个时间便清除动画
//	延时启动某个动画
//  先清除后启动
	this.Pause = function(){
		clearTimeout(sliObj.TimeO); 
		clearInterval(sliObj.TimerID); 
		sliObj.TimeO = setTimeout(function(){
//			clearInterval(sliObj.TimerID); 
			sliObj.CTL = 0; //每次把加好的步长清零
			sliObj.TimerID = setInterval(sliObj.StartID, sliObj.timer); 
		}, sliObj.WaitTime);
	}
	this.ID.onmouseover = function() { 
			if(sliObj.TimeO){
				clearTimeout(sliObj.TimeO);
			}
			clearInterval(sliObj.TimerID);
	}
	//鼠标移开的时候，如果是步数特别大的时候，像正常的时候启动，如果步数不够，补充动起来，再往下运动
	this.ID.onmouseout = function() { 
			if(this.CTL >= this.distance){
				sliObj.Pause();
			}else{
				sliObj.TimerID = setInterval(sliObj.StartID, sliObj.timer); 
				sliObj.TimeO = setTimeout(function(){
					clearInterval(sliObj.TimerID); 
					sliObj.CTL = 0; //每次把加好的步长清零
					sliObj.TimerID = setInterval(sliObj.StartID, sliObj.timer); 
				}, sliObj.WaitTime);
			}
			
	}
}
upSlider.prototype.Scroll = function(){
	this.CTL += this.Step;
	if(this.CTL >= this.distance && this.WaitTime > 0){
		this.ID.scrollTop += this.distance + this.Step - this.CTL;	
		this.Pause();
//		return;
	}else{
		if (this.ID.scrollTop >= this.ClientScroll) {
			this.ID.scrollTop -= this.ClientScroll; 
		}	
		this.ID.scrollTop += this.Step;//让它走起来
	}
}


