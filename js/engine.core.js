

var current_game = {
    player1_login : game_data.player1_login,
    player2_login : game_data.player2_login,

    player1_side_id : game_data.player1_side_id,
    player2_side_id : game_data.player2_side_id,

    gold : 0,

    // mana for skeletons
    food : 0,

    // building materials (timber / stone)
    material : 0,
    
    // building constructing started, user chooses where to put the building
    constructing : false,
    building_built_class : null,
    building_built_name : '',
    construction_allowed : false,
    construction_x : 0,
    construction_y : 0,
    
    
    // not sure if used
    tiles_drawing_time : 0,
    
    // units training
    max_units_in_training : 3,
    
    // holds time till next unit in queue is ready
    unit_training_ms : 0
}



/**
* Array holding all units
* 
* @type Array
*/
var units = [];

var graph = {};

/**
* Array holding units selected by the user
* 
* @type Array
*/
var selected_units = [];

var animations = [];


var Engine = Engine || (function(){
        return {
            init : function(w, h) {

                var div = document.createElement("div");
                div.id = "canvas-wrap";

                var div_overlay = document.createElement("div");
                div_overlay.id = "overlay";

                this.canvas = document.createElement("canvas");
                this.ctx = this.canvas.getContext("2d");
                this.canvas.width = w;
                this.canvas.height = h;
                //this.canvas.zIndex = 0;
                //this.canvas.position = "relative";
                this.canvas.addEventListener("mousedown", handle_mouse_click, false);
                this.canvas.addEventListener("mousemove", handle_mouse_move, false);
                this.canvas.addEventListener("mouseup", handle_mouse_up, false);

                div.appendChild(this.canvas);
                div.appendChild(div_overlay);
                document.body.appendChild(div);

                this.ctx.fillStyle = "rgb(250, 250, 250)";
                this.ctx.font = "11px Tahoma";
                this.ctx.textAlign = "left";
                this.ctx.textBaseline = "top";
            }



        }
    }());

Engine.init(config.view_width, config.view_height);

function reset_font()
{
    Engine.ctx.fillStyle = "rgb(250, 250, 250)";
    Engine.ctx.font = "11px Tahoma";
    Engine.ctx.textAlign = "left";
    Engine.ctx.textBaseline = "top";
}

function set_font (name, size, color, style)
{
    Engine.ctx.fillStyle = "rgb(" + color + ")";
    Engine.ctx.font = style + " " + size + "px " + name;
    Engine.ctx.textAlign = "left";
    Engine.ctx.textBaseline = "top";
}

/**
* Returns mouse position after event
* 
* @param event
* 
* @returns {Object}
*/
function get_mouse_pos(event)
{
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}

HTMLCanvasElement.prototype.relMouseCoords = get_mouse_pos;

/**
* Block context menu
* 
* @type Document
*/
document.oncontextmenu = function(){
    return false;
}


var View = View || (function(){
        return {
            init : function(w, h) {
                this.x = 0;
                this.y = 0;
                this.width = w;
                this.height = h;

                this.move_dir = -1;
                this.move_speed = 2;
            },
            move : function(){

                switch(this.move_dir)
                {
                    case 0: 
                        if(this.y > 0)
                            this.y -= this.move_speed; 
                        break;

                    case 1: 
                    if(this.y > 0 && this.x < config.view_max_x)
                        {
                        this.y -= this.move_speed; 
                        this.x += this.move_speed;
                    } 
                    break;

                    case 2: 
                        if(this.x < config.view_max_x)
                            this.x += this.move_speed; 

                        break;

                    case 3: 
                    if(this.x < config.view_max_x && this.y < config.view_max_y)
                        {
                        this.y += this.move_speed; 
                        this.x += this.move_speed;
                    }

                    break;

                    case 4: 
                        if(this.y < config.view_max_y)
                            this.y += this.move_speed; 
                        break;

                    case 5: 
                    if(this.x > 0 && this.y < config.view_max_y)
                        {
                        this.y += this.move_speed; 
                        this.x -= this.move_speed;
                    }

                    break;

                    case 6: 
                        if(this.x > 0) 
                            this.x -= this.move_speed; 
                        break;

                    case 7: 
                    if(this.x > 0 && this.y > 0)
                        {
                        this.y -= this.move_speed; 
                        this.x -= this.move_speed; 
                    }
                    break;
                }

            }
        }
    }());

View.init(config.view_width, config.view_height);



/*var GameMap = GameMap || (function(){
return {
init : function(w, h) {
this.width = w;
this.height = h;
}
}
}());*/

// holds .x, .y
var mouse_pos = {};

var mouse_state = {
    left: false,
    right : false
}

function handle_mouse_move(event)
{
    var pos = Engine.canvas.relMouseCoords(event);
    mouse_pos = pos;

    View.move_dir = -1;
    var rp = 0.95;
    var lp = 0.05;

    if(pos.x > Math.round(config.view_width * rp)) // right edge
    {
        View.move_dir = 2;
    }
    else if(pos.x < Math.round(config.view_width * lp)) // left
        {
        View.move_dir = 6;
    }
    else if(pos.y < Math.round(config.view_height * lp)) // top
        {
        View.move_dir = 0;
    }
    else if(pos.y > Math.round(config.view_height * rp)) // bottom
        {
        View.move_dir = 4;
    }

    if(pos.x > Math.round(config.view_width * rp) && pos.y < Math.round(config.view_height * lp)) // right-top
        {
        View.move_dir = 1;
    }
    else if(pos.x < Math.round(config.view_width * lp) && pos.y < Math.round(config.view_height * lp)) // left-top
        {
        View.move_dir = 7;
    }
    else if(pos.x < Math.round(config.view_width * lp) && pos.y > Math.round(config.view_height * rp)) // left-bottom
        {
        View.move_dir = 5;
    }
    else if(pos.x > Math.round(config.view_width * rp) && pos.y > Math.round(config.view_height * rp)) // right-bottom
        {
        View.move_dir = 3;
    }


}

function ajax_read_callback(data)
{
    var message = data.split('||');
    
    var type = $.trim(message[0]);
    
    
    
    // new building
    if (type == 'add_building')
    {
        var json = $.parseJSON(message[1]);
        
        if (json.use_class == 'stower')
            var b = new Building(building_skeletons_tower);
        else if (json.use_class == 'necropolis')
            var b = new Building(building_skeletons_main);
        else if (json.use_class == 'temple')
            var b = new Building(building_skeletons_farm);
        else if (json.use_class == 'mason')
            var b = new Building(building_skeletons_woodcutter);
        else if (json.use_class == 'sbarracks')
            var b = new Building(building_skeletons_barracks);    
        else if (json.use_class == 'sgoldmine')
            var b = new Building(building_skeletons_mine);
            
        else if (json.use_class == 'townhall')
            var b = new Building(building_knights_main);
        else if (json.use_class == 'farm')
            var b = new Building(building_knights_farm);
        else if (json.use_class == 'ktower')
            var b = new Building(building_knights_tower);
        else if (json.use_class == 'kbarracks')
            var b = new Building(building_knights_barracks);
        else if (json.use_class == 'woodcutter')
            var b = new Building(building_knights_woodcutter);
        else if (json.use_class == 'kgoldmine')
            var b = new Building(building_knights_mine);
            
        b.x = json.x;
        b.y = json.y;
        b.hash = json.hash;

        units.push(b);
        
        current_map.b_tiles = buildings_tiles();
        update_build_map();
        build_graph();
    }
    else if (type == 'add_unit')
    {
        
        var json = $.parseJSON(message[1]);
        
        if (json.use_class == 'sworker')
            var u = new Unit(unit_skeletons_worker);
        else if (json.use_class == 'swarrior')
            var u = new Unit(unit_skeletons_warrior);
        else if (json.use_class == 'sarcher')
            var u = new Unit(unit_skeletons_archer);
        else if (json.use_class == 'sknight')
            var u = new Unit(unit_skeletons_knight);
        else if (json.use_class == 'smonk')
            var u = new Unit(unit_skeletons_monk);    
            
        else if (json.use_class == 'kworker')
            var u = new Unit(unit_knights_worker);
        else if (json.use_class == 'kwarrior')
            var u = new Unit(unit_knights_warrior);
        else if (json.use_class == 'karcher')
            var u = new Unit(unit_knights_archer);
        else if (json.use_class == 'kknight')
            var u = new Unit(unit_knights_knight);
        else if (json.use_class == 'kpaladin')
            var u = new Unit(unit_knights_paladin);
            
        u.x = json.x;
        u.y = json.y;
        u.hash = json.hash;

        units.push(u);
    }
    else if (type == 'move_unit')
    {
        var json = $.parseJSON(message[1]);
        
        for (u in units)
        {
            if (units[u] && units[u].what == 'unit')
            {
                //console.log (json.hash + " " + units[u].hash);
                
                if (units[u].hash == json.hash)
                {
                    units[u].set_new_road(json.path);
                }
            }
        }
    }
    // moving multiple units
    else if (type == 'move_units')
    {
        var json = $.parseJSON(message[1]);
        var arr = json.arr;
        
        for (u in units)
        {
            if (units[u] && units[u].what == 'unit')
            {
                for (i in arr)
                {
                    if (units[u].hash == arr[i].hash)
                    {
                        units[u].set_new_road(arr[i].path);
                    }
                }
            }
        }
    }
    
    else if (type == 'del_building')
    {
        var json = $.parseJSON(message[1]);
        
        for (u in units)
        {
            if (units[u] && units[u].what == 'building')
            {       
                if (units[u].hash == json.hash)
                {
                    animations.push(new Animation(anim_explosion_1, units[u].x * config.tile_width, units[u].y * config.tile_width));
                    
                    delete units[u];
                    
                    current_map.b_tiles = buildings_tiles();
                    update_build_map();
                    build_graph();
                    
                }
            }
        }
    }
    
    else if (type == 'del_unit')
    {
        var json = $.parseJSON(message[1]);
        
        for (u in units)
        {
            if (units[u] && units[u].what == 'unit')
            {       
                if (units[u].hash == json.hash)
                {  
                    units[u].fighting = false;
                    units[u].dying = true;
            
                    units[u].current_dir = 0;
                }
            }
        }
    }
}

/**
* Handling mouse click
* 
* @param event
*/
function handle_mouse_click(event)
{
    if (event.button == 0)
    {
        mouse_state['left'] = true;
        lmb_click(event); 
    }
    else
    {
        mouse_state['left'] = false;
    }
        
    if (event.button == 2)
    {
        mouse_state['right'] = true;
        rmb_click(event);
    }
    else
    {
        mouse_state['right'] = false;
    }
    
    if (event.button == 1)
    {
        var url = config.PATH + 'index.php?id=read';
        
        $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash1 } }).done(ajax_read_callback);
        
        /* 
        if (current_game.player1_side_id == GameSide.KNIGHTS)
        {
            current_game.player1_side_id = GameSide.SKELETONS;
            current_game.player2_side_id = GameSide.KNIGHTS;
        }
        else
        {
            current_game.player2_side_id = GameSide.SKELETONS;
            current_game.player1_side_id = GameSide.KNIGHTS;
        }
    */
    }
        
}

/**
* Sending queries for updates in multiplayer game
* 
*/
function query_server()
{
    var url = config.PATH + 'index.php?id=read';
        
    $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash1 } }).done(ajax_read_callback);
}

function handle_mouse_up(event)
{
    mouse_state['left'] = false;
    mouse_state['right'] = false;
}

/**
* Handling left mouse button click
* 
* @param event
*/
function lmb_click(event)
{
    event.preventDefault();

}

/**
* Handling right mouse button click
* 
* @param event
*/
function rmb_click(event)
{
    event.preventDefault();

}

/**
* Units selection rectangle
* 
* @type Object
*/
var SelectionRect = {
    
    // should draw selection rectangle?
    on : false,
    
    // was mouse btn clicked last frame?
    last_frame_on : false,
    
    start_x : 0,
    start_y : 0,
    end_x : 0,
    end_y : 0
}


/**
* Select unit after click
* 
* @param x
* @param y
*/
function select_units(x, y)
{
    
    selected_units.length = 0; 
  

    for (var i = 0; i < units.length; ++i)
    {   
        if (units[i] && units[i].what == 'unit' && units[i].visible)
        {
            if (units[i].unit_class.GetSide() == current_game.player1_side_id)
            {
                if (Calc.in_rect(x + View.x, y + View.y, units[i].GetRect()))
                {
                    selected_units.push (units[i]);

                    return true;
                }    
            }
        }
    }

    return false;
}

/**
* Selecting multiple units using selection rect
* 
*/
function select_multiple_units()
{
    //console.log('selecting multiple units...');
    selected_units.length = 0;
    
    var rect = [
        SelectionRect.start_x, SelectionRect.start_y, SelectionRect.end_x, SelectionRect.end_y
    ];
	
	// select units from every sie
	if(rect[0] > rect[2])
	{
		var temp = rect[0];
		rect[0] = rect[2];
		rect[2] = temp;
	}
	if(rect[1] > rect[3])
	{
		var temp = rect[1];
		rect[1] = rect[3];
		rect[3] = temp;
	}
	//select item from all tile
	rect[0] -= (config.tile_width +1 );
	rect[1] -= (config.tile_height+1);
	rect[2] += 1;
	rect[3] += 1;
<<<<<<< HEAD

=======
    
>>>>>>> 62ba6d7777b8585f1e5bd52e65b7b995d1a3cd73
    var count = 0;
    
    for (var i = 0; i < units.length; ++i)
    {   
        if (units[i] && units[i].what == 'unit' && units[i].visible)
        {
            if (units[i].unit_class.GetSide() == current_game.player1_side_id)
            {  
                
                //console.log(units[i].x + " " + units[i].y);
                if (Calc.in_rect(units[i].x, units[i].y, rect))
                {
                    // up to 5 units can be selected
                    if (count < 5)
                    {
                        selected_units.push(units[i]);
                        count ++;
                    } 
                }    
            }
        }
    }
    
    console.log(count);
    
    //return false;
}

/**
* Select single building with a mouse click
* 
* @param x
* @param y
*/
function select_building(x, y)
{
    selected_units.length = 0; 

    
    for (var i = 0; i < units.length; ++i)
    {   
        if (units[i] && units[i].what == 'building')
        {
            if (units[i].building_class.GetSide() == current_game.player1_side_id)
            {
                if (Calc.in_rect(x + View.x, y + View.y, units[i].GetRect()))
                {
                    selected_units.push (units[i]);

                    return true;
                }    
            }
        }
    }

    return false;
}




