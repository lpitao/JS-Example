function addEvent(obj, oEvent, fn) {  
    if (obj.attachEvent) {  
        obj.attachEvent('on' + oEvent, fn);  
    } else {  
        obj.addEventListener(oEvent, fn, false);  
    }  
} 
function addScroll(){
	this.init.apply(this,arguments);
}
addScroll.prototype={
	init:function(block,track,txt,oContainer){
		var block      = document.getElementById(block);
		var track      = document.getElementById(track);
		var txt        = document.getElementById(txt);
		var oContainer = document.getElementById(oContainer);

		this.tragScroll(block,track,txt,oContainer);
		this.wheelChange(block,track,txt,oContainer);
		this.clickScroll(block,track,txt,oContainer);
	},
	setTop:function(t,block,track,txt,oContainer){
            var down = track.offsetHeight - block.offsetHeight;  
            if (t < 0) {  
                t = 0;  
            } else if (t > down) {  
                t = down  
            }    
	        block.style.top = t + 'px';    
            var scale = t / down;  
            txt.style.top = -(txt.offsetHeight - oContainer.offsetHeight) * scale + 'px';  
    },
    //拖动滚动条
    tragScroll:function(block,track,txt,oContainer){
    	var othis = this;
        block.onmousedown = function(e) {  
            e = e || event;
            var _this = this;

            var disY = e.clientY - _this.offsetTop;  
   
            if(block.setCapture){  
                block.onmousemove=fnMove;  
                block.onmouseup=fnUp;  
                block.setCapture();  
            }else{  
                document.onmousemove=fnMove;  
                document.onmouseup=fnUp;  
            }  
              
            function fnMove(ev) {  
                ev = ev || event;  		
				_this.style.background = "black"; 
                var t = ev.clientY- disY;
                othis.setTop(t,block,track,txt,oContainer);  
            };  

            function fnUp() { 
            	var uthis = this;
            	
            	_this.style.background = "white";
                uthis.onmousemove = null;  
                uthis.onmouseup = null;  
                  
                if(uthis.releaseCapture){  
                    uthis.releaseCapture();  
                }  
            };  
            return false;  
        };

	},
    //鼠标滚轮滚动，滚动条滚动
    wheelChange:function(block,track,txt,oContainer){
        addEvent(txt, 'mousewheel', mousewheel);  
		addEvent(txt, 'DOMMouseScroll', mousewheel);  
		addEvent(track, 'mousewheel', mousewheel);  
		addEvent(track, 'DOMMouseScroll', mousewheel);  
		var othis = this;
	
        function mousewheel(e) {  
            var ev = e || event, bDown = false;  
  
            bDown = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;  

            if (bDown) {  
                othis.setTop(block.offsetTop+10,block,track,txt,oContainer);  
            }else{  
                othis.setTop(block.offsetTop-10,block,track,txt,oContainer);  
            }  
  
            //FF,绑定事件，阻止默认事件  
	        if (e.preventDefault) {  
	            e.preventDefault();  
	        }else{
	        	event.returnValue = false;
	        }
	        return false;  
        }
	},
    clickScroll:function(block,track,txt,oContainer){
    	var othis = this;
        track.onclick = function(e){
   			var e = e || event;			
   			var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
   			var top = oContainer.offsetTop;
			var t = (e.clientY + sTop - top - block.offsetHeight / 2) ;
			othis.setTop(t,block,track,txt,oContainer);    
		}
	}
}   