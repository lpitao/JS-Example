<?php
	/**
	 * ajax注册程序
	 * @author webbc
	 */
	header('Content-type:text/html;charset=utf-8');
	if(trim($_POST['username']) == '' || trim($_POST['email']) == ''){
	    echo '内容填写不完整';
	}else{
	    print_r($_POST);
	    echo '注册成功';
	}
?>