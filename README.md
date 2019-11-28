# JS-Example

1、可以自定义时间暂停下来的动画

a、setTimeout->(调用)setInterval()->步长函数(调用)：setTimeout可以实现初始化等待时间；

b、步长函数->(调用)重新启动setTimeout函数->（调用）setInterval()->步长函数:重新启动setTimeout函数可以实现每次自定义动画时间


2、轮播图一般有两个index:

a、一个是队列自己的index;

b、还有一个是每次它要去到位置的index值(位置是-1;位置是5啦啦啦);

c、要去到位置的index值:i:一般由原来的index,队列的长度,上次点击的index(那几个位置index的值每次赋在不同的index:控制它们的位置)


