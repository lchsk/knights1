<?php
    require('../config.php');
    
    $config = Config::GetInstance();
?>

<?php
	try {		
		global $config;
		
		if(isset($_POST["q"]))
		{
			$q=$_POST["q"];
			$con = mysql_connect( $config->DB_ADDRESS,  $config->DB_USERNAME,  $config->DB_PASSWORD);
			if (!$con)
			{
				die('Could not connect: ' . mysql_error());
			}

			mysql_select_db( $config->DB_NAME, $con);

			$sql="SELECT count(*) count FROM player WHERE login = '".$q."'";
		

			$result = mysql_query($sql) or die("Incorrect UserName"); ;

			while($rek = mysql_fetch_array($result))
			{
				if($rek['count'])			
					echo 'This UserName is busy';
			}
			 
			mysql_close($con);
		}
	 
	} catch (Exception $e) {
		echo 'Problem with connect to DB';
	}
 ?>