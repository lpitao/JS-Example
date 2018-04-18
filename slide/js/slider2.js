function slider(banner,bannerU,order,prev,next){
	var banner = document.querySelector("."+banner);
	var bannerUl = document.querySelector("."+bannerU);
	var order  = document.querySelector("."+order);
	var prev   = document.querySelector("."+prev);
	var next   = document.querySelector("."+next);
	
	//初始化下面要用到的全局变量
	var timer = null;
	var timerTwo = null;
	var Index = 0;
	var perWidth = bannerUl.children[0].offsetWidth;
	var bannerLength = bannerUl.children.length;//从前的轮播图片数目
	
	//初始化画布
	//1、添加图片,制造假象
	var lastBannerLi = bannerUl.children[0].cloneNode(true);
	bannerUl.appendChild(lastBannerLi);
	var bannerLengthNew = bannerUl.children.length;
	
	//2、ul给定宽度
	bannerUl.style.width = perWidth * bannerLengthNew + 'px';
	
	//3、画小原点
	for(var i = 0; i < bannerLength; i++){
		var orderI = document.createElement("i");
	 	order.appendChild(orderI)
	}
	//给定小圆点宽度
	order.style.width = orderI.offsetWidth * bannerLength * 1.5 + 'px';
	//初始化小圆圈的样子
	order.children[0].classList.add('on');
	
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
			
			
	//自动播放函数
	function autoPlay(){
		clearInterval(timer);
		timer = setInterval(function(){
			Index++;
			play(Index);
		},5000)
	}

	
	//根据全局index向左向右滑动
	function play(){
		//当index是正常的index的+2的时候就不正常,不可以了
		if(Index == bannerLengthNew){
			Index = 1;
			console.log(Index)
			//直接让它去0点
			bannerUl.style.left = -perWidth * (Index-1) + 'px';
			
		}
		//当index减来减去比0小的时候呢,就不行了
		if(Index < 0){
			Index = bannerLength - 1;
			//index给的值是正常的末尾的index,但是真正定位的时候就是+1的index
			//直接让它去末尾，但是animated移动的index呢要减小，操作相当于添加一个尾部图片
			bannerUl.style.left = -perWidth * (Index+1) + 'px';
		}
		//如果在animate之后更改animate里的参数，会出现紊乱，似乎之后设置的参数并没有用
		$("." + bannerU).animate({
			left : -perWidth * Index + 'px'
		})

		for(var i = 0; i < bannerLength;i++){
			order.children[i].setAttribute('class','');
		}
		//index走到这里的时候已经不会出现小于0,和大于正常结尾index+2的index了
		//所以嘞，把稍微不正常的index+1解决一下
		if(Index > bannerLength - 1){
			order.children[0].classList.add('on');
		}else{
			order.children[Index].classList.add('on')
		}
	}
	
	
	prev.onclick = function(){
		Index--;
		play(Index);
	}
	next.onclick = function(){
		Index++;
		console.log(Index)
		play(Index);
	}
	
	//onmouseenter从父亲到孩子传播，无论，onclick,onmouseover
	banner.onmouseenter = function(e){
		clearInterval(timer);
		prev.style.display = "block";
		next.style.display = "block";
	}
	banner.onmouseleave = function(){
		autoPlay();
		prev.style.display = "none";
		next.style.display = "none";
	}

	//for循环一开始读的文档，onmouseover,functions以上的内容都可以写下来，function后面的内容需要运行起来，不能用i
	for(var i = 0; i < bannerLength;i++){
		order.children[i].index = i;
		order.children[i].onmouseenter = function(){
			Index = this.index;
			play();
		}
	}	
	autoPlay()
}


//animate()
//			clearTimeout(timer);
//			timer = setTimeout(function(){
//				var step = 0;
//				//var i = bannerUl.children.length;
//				//bannerUl.style.left = -bannerUl.children[0].offsetWidth * i + 'px';
//				if(bannerUl.offsetLeft == -bannerUl.children[0].offsetWidth*Index){
//						clearInterval(timerTwo)
//				}
//				clearInterval(timerTwo)
//				timerTwo = setInterval(function(){
//					step -= 1;
//					bannerUl.style.left = bannerUl.offsetLeft - 2 + 'px';
//					
//				},30)
//			},5000)