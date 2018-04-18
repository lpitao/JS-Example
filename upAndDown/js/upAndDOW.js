	function Marquee() { 
		this.ID = document.getElementById(arguments[0]); 
		this.Direction = arguments[1]; 
		this.Step = arguments[2]; 
		this.Width = arguments[3]; 
		this.Height = arguments[4]; 
		this.Timer = arguments[5]; 
		this.WaitTime = arguments[6]; 
		this.StopTime = arguments[7]; 
		if (arguments[8]) { 
			this.ScrollStep = arguments[8]; 
		} else { 
			this.ScrollStep = this.Direction > 1 ? this.Width : this.Height; 
		}
		
		this.CTL = this.StartID = this.Stop = this.MouseOver = 0; 
		this.ID.style.overflowX = this.ID.style.overflowY = "hidden"; 
		this.ID.noWrap = true; 
		this.ID.style.width = this.Width + 'px'; 
		this.ID.style.height = this.Height + 'px'; 
		this.ClientScroll = this.Direction > 1 ? this.ID.scrollWidth : this.ID.scrollHeight; 
		this.ID.innerHTML += this.ID.innerHTML; 
		this.Start(this, this.Timer, this.WaitTime, this.StopTime); 
	} 
	
	Marquee.prototype.Start = function(msobj, timer, waittime, stoptime) { 
		//scroll 调用pause()，pause()->setTimeout->setInterval()又会调用scroll
		//1、在scroll()中调用pause()
		//2、pause()调用setInterval(scroll)=>setTimeout( setInterval(scroll中有pause) )
		//3、continue调用pause()=>setInterval(scroll中有pause)
		//滚着调用变成动画
		msobj.StartID = function() {
			msobj.Scroll(); 
		}
		msobj.Continue = function() { 
			if (msobj.MouseOver == 1) { 
				//它步长够的时候，一直一直重复等待，不清除
				setTimeout(msobj.Continue, waittime); 
			}else { 
				clearInterval(msobj.TimerID);
				msobj.CTL = msobj.Stop = 0; 
				msobj.TimerID = setInterval(msobj.StartID, timer); 
			}
		} 
		msobj.Pause = function() { 
			msobj.Stop = 1; 
			clearInterval(msobj.TimerID); 
			setTimeout(msobj.Continue, waittime); 
		}
		//1、初次调用setTimeout()中的begin
		//2、begin中setInterval->scroll动画动起来
		//另外，
		//如果onmouseover,onmouseout,另一个轮回滚动
		//断掉那个闭合的动画，一种是在setTimeout,另一种是在setInterval断掉
		//1、onmouseover:
		//mouseover断点和setTimeout:
		//				清除掉之前的的setInterval()，setTimeout则是持续调用一个setTimeout()
		//		        onmouseover的时候，直接设置MouseOver = 1;onmouseout的时候，直接设置MouseOver = 0;
		//              (没有在pause->setTimeout()里面改;在pause()下面的的continue->setInterval()里面改)	 
		//				
		//2、onmouseout:
		//断点setInterval()，if(msobj.Stop == 0)再次启动一个setInterval->scroll
        //		                                 在平时的时候,setInterval()设置msobj.Stop = 0;setTimout()设置msobj.Stop = 1
		//断点setTimeout()，直接利用原来setTimeout(setInterval())
		//
		

		msobj.Begin = function() { 
			msobj.TimerID = setInterval(msobj.StartID, timer); 
			msobj.ID.onmouseover = function() { 
				msobj.MouseOver = 1; 
				clearInterval(msobj.TimerID); 
			}
			msobj.ID.onmouseout = function() { 
				msobj.MouseOver = 0; 
				if (msobj.Stop == 0) { 
					clearInterval(msobj.TimerID); 
					msobj.TimerID = setInterval(msobj.StartID, timer); 
				} 
			}
		} 
		
		
		setTimeout(msobj.Begin, stoptime); 
	} 
	Marquee.prototype.Scroll = function() { 
		switch (this.Direction) { 
			case 0: 
				this.CTL += this.Step; 
				if (this.CTL >= this.ScrollStep && this.WaitTime > 0) { 
					this.ID.scrollTop += this.ScrollStep + this.Step - this.CTL; 
					this.Pause();
					return;
				}else { 
					if (this.ID.scrollTop >= this.ClientScroll) 
						this.ID.scrollTop -= this.ClientScroll; 
					this.ID.scrollTop += this.Step; 
				}
				break; 
			case 1: 
				this.CTL += this.Step; 
				if (this.CTL >= this.ScrollStep && this.WaitTime > 0) { 
					this.ID.scrollTop -= this.ScrollStep + this.Step - this.CTL; 
					this.Pause();
					return; 
				}else { 
					if (this.ID.scrollTop <= 0) 
						this.ID.scrollTop += this.ClientScroll; 
					this.ID.scrollTop -= this.Step; 
				}
				break; 
			case 2: 
				this.CTL += this.Step; 
				if (this.CTL >= this.ScrollStep && this.WaitTime > 0) { 
					this.ID.scrollLeft += this.ScrollStep + this.Step - this.CTL; 
					this.Pause();
					return; 
				}else { 
					if (this.ID.scrollLeft >= this.ClientScroll) 
						this.ID.scrollLeft -= this.ClientScroll; 
					this.ID.scrollLeft += this.Step; 
				}
				break; 
			case 3: 
				this.CTL += this.Step; 
				if (this.CTL >= this.ScrollStep && this.WaitTime > 0) { 
					this.ID.scrollLeft -= this.ScrollStep + this.Step - this.CTL; 
					this.Pause();
					return; 
				}else { 
					if (this.ID.scrollLeft <= 0) 
						this.ID.scrollLeft += this.ClientScroll; 
					this.ID.scrollLeft -= this.Step; 
				}
				break; 
		} 
	} 
