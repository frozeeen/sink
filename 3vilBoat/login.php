<?php
	session_start();

	function _return($msg, $status = 200){
		http_response_code($status);
		echo $msg;
		exit;
	}

	# Reset the number of login
	if( isset( $_GET['reset'] ) ){
		$_SESSION['count'] = 0;
		_return("Reset successful");
	}
	
	# Count the number of login
	if( isset( $_POST['handle'] ) && isset( $_POST['password'] ) ){
		$_SESSION['count'] = isset( $_SESSION['count'] ) ? $_SESSION['count']++ : 1;
		_return("Got a fish named `" . $_POST['handle'] . "` and password `". $_POST['password'] ."`!");
	}else{
		_return("Invalid", 500);
	}
?>