

function scroll(block,track,txt,oContainer){
	    //1、触发的鼠标下移事件
    	block.onmousedown = function(e) {  
            e = e || event;  

            var disY = e.clientY - this.offsetTop;  
   
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

                var t = ev.clientY- disY;
                setTop(t);
            };  

            function fnUp() { 

                this.onmousemove = null;  
                this.onmouseup = null;  
                  
                if(this.releaseCapture){  
                    this.releaseCapture();  
                }        
            };  
            return false;  
        };
        //2.触发鼠标点击事件
        track.onclick = function(event){
   			var e = event || window.event;			
   			var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
   			var top = oContainer.offsetTop;

			var t = (e.clientY + sTop - top - block.offsetHeight / 2) ;
			setTop(t);    
		}
		//3、触发滚动事件
		addEvent(txt, 'mousewheel', mousewheel);  
		addEvent(txt, 'DOMMouseScroll', mousewheel);  
		addEvent(track, 'mousewheel', mousewheel);  
		addEvent(track, 'DOMMouseScroll', mousewheel);  
			
        function mousewheel(e) {  
            var ev = e || event, bDown = false;  
  
            bDown = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;  
                  
            if (bDown) {  
                setTop(block.offsetTop+10);  
            }else{  
                setTop(block.offsetTop-10);  
            }  
  
            //FF,绑定事件，阻止默认事件  
	        if (e.preventDefault) {  
	            e.preventDefault();  
	        }else{
	        	event.returnValue = false;
	        }
	        return false;  
        }
        
    	//4、上面两个事件都会触发，滚动条和文章改高度
        function setTop(t) {
            var down = track.offsetHeight - block.offsetHeight;  
            if (t < 0) {  
                t = 0;  
            } else if (t > down) {  
                t = down  
            }    
	        block.style.top = t + 'px';    
            var scale = t / down;  
            txt.style.top = -(txt.offsetHeight - oContainer.offsetHeight) * scale + 'px';  
        }  
        function addEvent(obj, oEvent, fn) {  
		    if (obj.attachEvent) {  
		        obj.attachEvent('on' + oEvent, fn);  
		    } else {  
		        obj.addEventListener(oEvent, fn, false);  
		    }  
		} 
    
}     