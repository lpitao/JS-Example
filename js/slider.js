function slider(banner,order,ctrl,leftPx){			
	//1、初始化每一图
    var imgLis = banner.children("li");
    //将放置图片的容器ul里第一份”li“复制一份，追加到ul后面
    imgLis.first().clone().appendTo(banner);
    banner.width(imgLis.width()*(imgLis.length+1));
    
    //2、初始化每一点
    //创建控制小圆点
    for(i=0;i<imgLis.length;i++){
        $('<i order='+i+'></i>').appendTo(order);
    }
    var dotLis = order.children("i");
    //在第一个小圆点添加类名“on”
    dotLis.eq(0).addClass('on');
    
    //3、初始化左右按钮
    var prev = ctrl.children().first();
    var next = ctrl.children().last();
	
	//4、函数需要初始化变量
    var num = 0;
    var timer = null;
    //状态预设，是为防止用户连续点击左右按钮，导致短时间内图片切换频率过高而犯神经，程序反应不来
    var state = true;
    //初始化结束
    
    function play(){
        //从左向右时，判断num，卡到这里，闪现和下一步走(改变index)
        if(num < 0){
            num = imgLis.length-1;
            banner.css({left:-imgLis.length*leftPx+'px'});
        }
        //从右向左时，判断num，num大了两个，让它缓慢的展现首个（已经放过）
        //卡到这里，闪现和下一步走(改变index)
        if(num > imgLis.length ){
        	//正常缓慢，从6到1
            num = 1;
            //闪现
            banner.css({left:'0'});
        }
        
        var numPx = num*leftPx;
        banner.animate({left:-numPx+'px'},function(){
            state = true;
        });
         //焦点
        dotLis.removeClass('on');
        dotLis.eq(num).addClass('on');
        if(num >= imgLis.length){
            dotLis.first().addClass('on');
        }
    }

    //1、自动播放
    clearInterval(timer);
    function autoPlay(){
        timer = setInterval(function(){
            num++;
            play();
        },5000);
    }
    //2、添加鼠标移入暂停，移出继续事件
    banner.parent().mouseover(
        function(){
            clearInterval(timer);
            timer = null;
        }
    ).mouseout(
        function(){
            autoPlay();
        }
    );
    //3、给左右按钮添加点击事件
    prev.click(function(){
        if(state == true){
            state = false;
            num--;
            play();                    
        }
    });
    next.click(function(){
        if(state == true){
            state = false;
            num++;
            play();
        }
    });
    //4、给焦点添加点击事件
    dotLis.click(function(){
        num = $(this).index()
        play();
    });
    autoPlay();
}