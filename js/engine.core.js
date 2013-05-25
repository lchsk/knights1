

var current_game = {
    player1_login : '',
    player2_login : '',

    player1_side_id : GameSide.KNIGHTS,
    player2_side_id : GameSide.SKELETONS,

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
    
    
    tiles_drawing_time : 0
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

var mouse_pos = {};

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

/**
* Handling mouse click
* 
* @param event
*/
function handle_mouse_click(event)
{
    if (event.button == 0)
        lmb_click(event);
    else if (event.button == 2)
        rmb_click(event);
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
        if (units[i] && units[i].what == 'unit')
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




