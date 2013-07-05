var t;
var ret;

function login() {	
	
	t = true;
	var xmlHttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttp.onreadystatechange=function()
	{
		if (xmlHttp.readyState==4 && xmlHttp.status==200)
		{
			var text =xmlHttp.responseText;
				alert('ala');
			if(text.length > 2)
			{			
				ret = false;
				//document.getElementById ("error").innerHTML = 'Incorrect pair user/password, try again.';
				alert('ala');
			}
			else
			{
				ret = true;
			}
			t = false;
		}
	}
	var q = document.getElementById ("userName").value;
	var pass = document.getElementById ("password").value;
	var parameters="q="+str+"&pass="+pass;
	xmlHttp.open("POST","queryDB/checkUser.php",true);
	xmlHttp.setRequestHeader("Content-type", 
        "application/x-www-form-urlencoded"); 
    xmlHttp.setRequestHeader("Content-length", 
        parameters.length); 
		    xmlHttp.setRequestHeader("Connection", "close");  
	
	xmlHttp.send(parameters);
	
	return ret;
}

function logout() {
	session_start();
	session_destroy();
	setTimeout(function(){top.location.href="index.php"},1);
}

window.addEventListener("beforeunload",  function(e) {
	//usuwamy grê która siê nie rozpocze³a a na któr¹ czekamy
	
	var confirmationMessage = "\o/";
 
	(e || window.event).returnValue = confirmationMessage;     //Gecko + IE
	return confirmationMessage;      
};