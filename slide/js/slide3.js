//面向对象函数特别在于,
//非实例属性(对象属性)不可以用在实例方法(原型方法)
function slider(){
	this.banner    = arguments[0] || 0;
	this.bannerUl  = arguments[1] || 0;
	this.$bannerUl = arguments[2] || 0;
	this.order     = arguments[3] || 0;
	this.prev      = arguments[4] || 0;
	this.next      = arguments[5] || 0;
	this.auto      = arguments[6] || 0;
	
	
	//初始化下面要用到的全局变量
	this.timer = null;
	this.timerTwo = null;
	this.Index = 0;
	this.perWidth = this.bannerUl.children[0].offsetWidth;
	this.bannerLength = this.bannerUl.children.length;//从前的轮播图片数目
	
	//初始化画布
	//1、添加图片,制造假象
	this.lastBannerLi = this.bannerUl.children[0].cloneNode(true);
	this.bannerUl.appendChild(this.lastBannerLi);
	this.bannerLengthNew = this.bannerUl.children.length;
	
	//2、ul给定宽度
	this.bannerUl.style.width = this.perWidth * this.bannerLengthNew + 'px';
	
	//3、画小原点
	if(this.order){
		for(var i = 0; i < this.bannerLength; i++){
			this.orderI = document.createElement("i");
		 	this.order.appendChild(this.orderI)
		}
		//给定小圆点宽度
		this.order.style.width = this.orderI.offsetWidth * this.bannerLength * 1.5 + 'px';
		//初始化小圆圈的样子
		this.order.children[0].classList.add('on');
	}

	
//	三个方面:
//	一个是,最最重要的play动画,可以让轮播图看起来滚来滚去,
//		全局变量index++来自于两个方面:一个是setinterval();另一个是next();完全不影响
//	二是,clearinterval(),通过捕获事件onmouseenter()
//	三是,简单的通过this.index调用
//	
//	特别的是:animate()在它之后不可以更爱里面的参数
//	
//	绕来绕去脑补小图画是:
//			index++后,当从最后点击到1,之后再点击的时候,index超过+1的index,于是下一次运行起始位置把index设置为1而不是0,这样下面的动画可以动
//			index--后,当从1点击到最后,index设置为+1的,这样下面动起来是正常的,一开始设置的起始位置是+2的
	
	if(this.auto){
		this.autoPlay();
	}
	
	this.pClickMouse();
}
//根据全局index向左向右滑动
slider.prototype.play = function(){
	var _self = this;
	//当index是正常的index的+2的时候就不正常,不可以了
	if(_self.Index == _self.bannerLengthNew){
		_self.Index = 1;
		//直接让它去0点
		_self.bannerUl.style.left = -_self.perWidth * (_self.Index-1) + 'px';
		
	}
	//当index减来减去比0小的时候呢,就不行了
	if(_self.Index < 0){
		_self.Index = _self.bannerLength - 1;
		//index给的值是正常的末尾的index,但是真正定位的时候就是+1的index
		//直接让它去末尾，但是animated移动的index呢要减小，操作相当于添加一个尾部图片
		_self.bannerUl.style.left = -_self.perWidth * (_self.Index+1) + 'px';
	}
	//如果在animate之后更改animate里的参数，会出现紊乱，似乎之后设置的参数并没有用
	this.$bannerUl.animate({
		left : -_self.perWidth * _self.Index + 'px'
	})
	
	if(_self.order){
		for(var i = 0; i < _self.bannerLength;i++){
			_self.order.children[i].setAttribute('class','');
		}
		//index走到这里的时候已经不会出现小于0,和大于正常结尾index+2的index了
		//所以嘞，把稍微不正常的index+1解决一下
		if(_self.Index > _self.bannerLength - 1){
			_self.order.children[0].classList.add('on');
		}else{
			_self.order.children[_self.Index].classList.add('on')
		}
	}
}

//自动播放函数
slider.prototype.autoPlay = function(){
	var _self = this;
	clearInterval(this.timer);
	this.timer = setInterval(function(){
		_self.Index++;
		_self.play();
	},5000)
}

	

slider.prototype.pClickMouse = function(){
	var _self = this;
	if(_self.prev || _self.next){
		_self.prev.onclick = function(){
			_self.Index--;
			_self.play();
		}
		_self.next.onclick = function(){
			_self.Index++;
			_self.play();
		}
		//onmouseenter从父亲到孩子传播，无论，onclick,onmouseover
		this.banner.onmouseenter = function(e){
			clearInterval(_self.timer);
			_self.prev.style.display = "block";
			_self.next.style.display = "block";
		}
		this.banner.onmouseleave = function(){
			_self.autoPlay();
			_self.prev.style.display = "none";
			_self.next.style.display = "none";
		}
	}



	//for循环一开始读的文档，onmouseover,functions以上的内容都可以写下来，function后面的内容需要运行起来，不能用i
	if(_self.order){
		for(var i = 0; i < _self.bannerLength;i++){
			_self.order.children[i].index = i;
			_self.order.children[i].onmouseenter = function(){
				_self.Index = this.index;
				_self.play();
			}
		}
	}
	
}
	
	
