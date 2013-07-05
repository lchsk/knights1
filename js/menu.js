var mainWindow =0;

function menu(){
	mainWindow = new Messi('<a onclick="closes();" title="Back to the game"><img src="images/btn_back_to_game.png" title="Back to the game"/></a><br/><br/>'+
	'<a onclick="options();" title="Options"><img src="images/btn_option.png" title="options"/></a><br/><br/>'+
	'<a onclick="exit();" title="Exit"><img src="images/btn_exit.png" title="Exit"/></a>', 
		{
			title: 'Menu',		
			modal: true,
			closeButton: false,
			width: 'auto'
		}
		
	);
};

function closes(){
	mainWindow.hide();
};

function exit(){
	new Messi('Are you sure you want to give up?', 
		{
			title: 'EXIT',		
			modal: true,
			buttons: [
				{id: 0, label: '<IMG src="images/btn_ok.png" alt="Yes" title="Yes"/>', val: 'Y'}, 
				{id: 1, label: '<IMG src="images/btn_no.png" alt="No" title="No"/>', val: 'N'}
				],
			width: 'auto', 
			callback: 
				function(val) 
				{  
					if(val == 'Y')
					{
							window.location.href="index.php";
					}				
				}	
		}
		
	);
};

var optionTab = new Array();

function options(){
	new Messi(
		'<fieldset><legend>Speed of the viewscreen:</legend><div><div id="slider_speed"></div><div id="val_slider_speed"></div></div></fieldset>'	, 
		{
			title: 'Options',		
			modal: true,
			buttons: [
				{id: 0, label: '<IMG src="images/btn_ok.png" alt="Yes" title="Yes"/>', val: 'Y'}, 
				{id: 1, label: '<IMG src="images/btn_no.png" alt="No" title="No"/>', val: 'N'}
				],
			width: 'auto', 
			callback: 
				function(val) 
				{  
					if(val == 'Y')
					{
						View.move_speed = optionTab[0];
					}				
				}	
		}
		
	);
	createSlider(1,10,View.move_speed,"Current value: ","slider_speed",0);
};

function createSlider(min, max, curr, desc, div_id,id_option){
	document.getElementById("val_"+div_id).innerHTML = desc + curr;
	
	$( "#"+ div_id ).slider({ min: min,max: max, step: 1, value: curr,
		change: function( event, ui ) {
			document.getElementById("val_"+div_id).innerHTML = desc + ui.value;
			optionTab[id_option] = ui.value;
			} 
		}
	);
};

function continuee(){
	mainWindow.hide();
	window.location.href="index.php";
}