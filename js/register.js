String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

function checkRepeatPassword() {
	if ( document.getElementById ("passwordAgain").value == document.getElementById ("password").value) 
	{
		document.getElementById ("passwordAgainImg").src = "images/OK.png";
		document.getElementById ("passwordAgainLabel").innerHTML = "";
		ok =true;
	}
	else
	{
		document.getElementById ("passwordAgainImg").src = "images/NO.png";
		document.getElementById ("passwordAgainLabel").innerHTML = "Passwords are diffrents";
		ok =false;
	}
	return ok;
}

function checkPassword() {
	var len  = document.getElementById ("password").value.length;
	if ( len < 6 ) 
	{
		document.getElementById ("passwordImg").src = "images/NO.png";
		document.getElementById ("passwordLabel").innerHTML = "Password is too short(min 6)";
		ok =false;
	}
	else if ( len > 255)
	{	
		document.getElementById ("passwordImg").src = "images/NO.png";
		document.getElementById ("passwordLabel").innerHTML = "Password is too long (max 255)";
		ok =false;
	}
	else
	{
		document.getElementById ("passwordImg").src = "images/OK.png";
		document.getElementById ("passwordLabel").innerHTML = "";
		ok =true;
	}
	
	return ok;
}

function checkEmail() {
	var ele = document.getElementById ("email");
	var label = document.getElementById ("emailLabel");
	var img = document.getElementById ("emailImg");
	var ok = true;
	label.innerHTML = '';

	if(ele.value.fulltrim() != '')
	{
		/*if(!isSuportedInput('email'))
		{*/
			if (ele.value.fulltrim().length >255)
			{
				label.innerHTML = 'Email address is too long (max 255)';
				ok = false;
			}
			else if(ele.value.fulltrim().length < 7)
			{
				label.innerHTML = 'Email address is too long (min 7)';
				ok = false;
			}   
			else
			{
				var t = ele.value.fulltrim().indexOf("@");
				if(t == -1)
				{
					ok = false;						
				}
				else
				{
					var t2 = ele.value.fulltrim().indexOf("@",t+1);		
					
					if(t2 != -1)
					{
						ok = false;
					}
					else
					{
						t2 = ele.value.fulltrim().indexOf(".",t+1);
									
						if(t2 == -1)
						{
							ok = false;						
						}
						else
						{
							t = ele.value.fulltrim().indexOf(".",t2+1);
								
							if(t != -1)
							{
								ok = false;							
							}
						}
					}
				}
				
				if(!ok)
				{
					label.innerHTML = 'Email address is incorrect';
				}					
			}
		//}
	}
	else
	{
		label.innerHTML = 'Email address is incorrect';
		ok= false;
	}
	
	if(ok)
	{
		label.innerHTML = '';
		img.src = "images/OK.png";
	}
	else
	{		
		img.src = "images/NO.png";
	}
	
	return ok;
} 

function checkDate() {
	var ele = document.getElementById ("date");
	var label = document.getElementById ("dateLabel");
	var img = document.getElementById ("dateImg");
	var ok = true;
	
	if(isSuportedInput('date'))
	{
		if (ele.value.length != 10)
		{
			label.innerHTML = 'Your date of birth';
			ok = false;
		}
	}
	else
	{
		if (ele.value.length != 10)
		{
			label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
			ok = false;
		}
		else
		{
			var dataa = ele.value;
			var regData = /^\d{4}-[0-1]\d-[0-3]\d$/;
			ok = regData.test(dataa);
			
			if(ok)
			{
				var data = dataa.split("-");
				var rok = parseInt(data[0]);
				var miesiac = parseInt(data[1])-1;
				var dzien = parseInt(data[2]);
				
				if(dzien <1)
				{
				label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
					ok = false;
				} 
				else if(!(miesiac>=0 && miesiac <= 11))
				{
				label.innerHTML = 'Your date of birth in format: yyyy-mm-dd' ;
					ok = false;
				}
				else if(miesiac == 0 || miesiac == 2 || miesiac == 4 || miesiac == 6 || miesiac == 7 || miesiac == 9 || miesiac == 11)
				{
					if(dzien > 31)
					{
						label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
						ok = false;
					}
				}
				else if(miesiac == 3 ||miesiac == 5 ||miesiac == 8 ||miesiac == 10)
				{
					if(dzien > 30)
					{
						label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
						ok = false;
					}
				}
				else if(miesiac == 1)
				{
					if(rok%4 == 0 && rok%100 != 0 || rok%400 == 0)
					{
						if(dzien > 29)
						{
							label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
							ok = false;
						}
					}
					else
					{
						if(dzien > 28)
						{
						label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
							ok = false;
						}
					}
				}
			}
			else
			{			
				label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
			}
		}
	
		/*if(!ok)
		{	
			label.innerHTML = 'Your date of birth in format: yyyy-mm-dd';
		}*/
	}
	
	if(ok)
	{
		label.innerHTML =  '';
		img.src = "images/OK.png";
	}
	else
	{
		img.src = "images/NO.png";
	}
	
	return ok;
}

function isSuportedInput(type){
	var i = document.createElement("input");
	i.setAttribute("type", type);
	return i.type !== "text";
}

function checkUser() {
	var ele = document.getElementById ("user");
	var label = document.getElementById ("userLabel");
	var img = document.getElementById ("userImg");
	
	var len = ele.value.length;
	if ( len < 6 ) 
	{
		img.src = "images/NO.png";
		label.innerHTML = "Username is too short(min 6)";
		ok =false;
	}
	else if ( len > 255)
	{	
		img.src = "images/NO.png";
		label.innerHTML = "Username is too long (max 255)";
		ok =false;
	}
	else
	{
		img.src = "images/OK.png";
		label.innerHTML = '';
		ok =true;
		askAboutUserName(ele.value);
	}
	
	return ok;
}

function askAboutUserName(str){
	
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
			if(text.length > 2)
				document.getElementById ("userImg").src = "images/NO.png";
			else
				document.getElementById ("userImg").src = "images/OK.png";
			
			document.getElementById ("userLabel").innerHTML = text;			
		}
	};
	var parameters="q="+str;
	xmlHttp.open("POST","queryDB/checkUser.php",true);
	xmlHttp.setRequestHeader("Content-type", 
        "application/x-www-form-urlencoded"); 
    xmlHttp.setRequestHeader("Content-length", 
        parameters.length); 
		    xmlHttp.setRequestHeader("Connection", "close");  
	
	xmlHttp.send(parameters);
 }
 
function clickRegister() {
	var ok = canReg();
	if( !ok) {
		alert('Registry is possible only after fill all fields correct data');
		return false;
	}else {
		return true;
	}	
}

function canReg(){

	var a = checkRepeatPassword();
	var b = checkPassword();
	var c = checkEmail();
	var d = checkDate();
	var e = checkUser();
	
	if(a == true && b == true  && c == true  && d == true  && e == true ) {
			
		return true;
	} else {
		return false;
	}		
}

function canChangePassword() {
	var a = checkRepeatPassword();
	var b = checkPassword();
	
	if(a == true && b == true) {			
		return true;
	} else {
		return false;
	}
}








































