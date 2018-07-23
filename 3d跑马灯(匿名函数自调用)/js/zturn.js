//轮播图一般有两个index:
//一个是队列自己的index;还有一个是每次它要去到位置的index值(位置是-1;位置是5啦啦啦);
//要去到位置的index值:i:
//		一般由原来的index,队列的长度,上次点击的index(那几个位置index的值每次赋在不同的index:控制它们的位置)


(function(win,doc,undefined){
 	var zturn = function(turn){
 		this.turn = turn;
 		this.zturn = $("#"+turn.id);
 		this.X = 0;//卡片index索引，每次把它放在0的位置
 		this.zturnitem = this.zturn.children(".zturn-item");
 		this.num_li = this.zturnitem.length;//轮播元素个数 zturnPy为每个的偏移量
 		this.zturnPy = turn.Awidth/(this.num_li - 1)  ;
 		this.init();
   		this.turn_();
   		return this;
 	}
 	zturn.prototype={
   		constructor:zturn,
 		init:function(){
	 		var _self = this;
			this.zturnitem.each(function(index,element){
//				相当于队列：left是50%，确定一下是中间位置
//						中间的index是0，左边是负,右边是正
				
					var rt = 1//用rt来判断：1:右侧：-1：左侧
					
//					负值:左边是负;当大于右边的队列的时候也弄成负;
					if((index - _self.X) > _self.num_li/2 || (index - _self.X) < 0 && (index - _self.X) > (-_self.num_li/2)){ 
						rt = -1;
					}
					
					//2、第几个顺序：i:是左或者右的第几个
					//关联到，放大大小，透明度，z-index,margin-left
					var i = Math.abs(index - _self.X);//取绝对值
					
					
//					把index队列有两种可能排序:
//						一种是大于队列的,把多余的它们放到负值那一边
//						一种是小于队列的,把多余的放到大于的那一边
					if(i > _self.num_li/2){
						i = parseInt(_self.X) + parseInt(_self.num_li) - index;
					}
					//如果最左边的值继续减去原来零点index后，越来越左，重新设置i值
					if((index - _self.X) < (-_self.num_li/2)){
						i = _self.num_li + index-_self.X;
					}
					$(this).css({
						'position':'absolute',
						'left': '50%',
						'margin-left':-_self.turn.width/2 + _self.zturnPy*rt*i + "px",
						'z-index':_self.num_li - i, 
						'opacity': Math.pow(_self.turn.opacity,i),
						'transform':'scale('+ Math.pow(_self.turn.scale,i) +')',
						'-webkit-transform':'scale('+Math.pow(_self.turn.scale,i)+')',
						'-webkit-transform':'scale('+Math.pow(_self.turn.scale,i)+')',
						'-moz-transform':'scale('+Math.pow(_self.turn.scale,i)+')',
						'-ms-transform':'scale('+Math.pow(_self.turn.scale,i)+')',
						'-o-transform':'scale('+Math.pow(_self.turn.scale,i)+')'
					})
//					$(this).attr("data_n",index)
			})
 		},
   		turn_:function(){
   		 	var _self = this
   		 	this.zturnitem.click(function(){	 			
   		 		_self.X = $(this).index();
   		 		_self.init()
   		 	})
   		},
// 		prev_:function(){
// 		 		var _self = this
// 		 		this.X--
//				if(this.X < 0){ 
//					this.X = this.num_li-1
//				}
// 		 		this.init()
// 		},
// 		next_:function(){
// 		 		var _self=this
// 		 		this.X++
//				if(this.X >= this.num_li){
//					this.X=0
//				}
// 		 		this.init()
// 		}
 } 	
   	win.zturn = zturn;
}(window,document))			