
var GameState = {
    
    // all is loaded - game on!
    loaded : false,
    
    map_loaded : false,
    sprites_loaded : false,
    
    // gotta count by hand :/
    sprites_number : 22,
    // number of sprites already loaded
    sprites_ready : 0,
    
    // loading screen
    screen : new Image(),
    screen_ready : false,
    
    
    
}
GameState.screen.src = config.IMAGES_PATH + 'loading_screen.png';
GameState.screen.onload = function(){
    GameState.screen_ready = true; 
    load_sprites();
};

var load_game = function(){
    
    //console.log(GameState.sprites_ready);
    
    if (GameState.map_loaded == true && GameState.sprites_loaded == true)
    {
        GameState.loaded = true;
    }
    
    // mark that the map is loaded
    if (GameState.sprites_ready == GameState.sprites_number)
        GameState.sprites_loaded = true; 
}

var draw_load_screen = function(){
    
    // background
    Engine.ctx.beginPath();
    Engine.ctx.fillStyle = 'rgb(102, 102, 101)';
    Engine.ctx.rect(0, 0, config.view_width, config.view_height);
    
    Engine.ctx.fill(); 
    //Engine.ctx.stroke();
    
    var x = 0;
    var y = (config.view_height - 250) / 2;
    
    // line 1
    Engine.ctx.strokeStyle = 'rgb(0, 0, 0)';
    Engine.ctx.moveTo(0, y);
    Engine.ctx.lineTo(config.view_width, y);
    Engine.ctx.stroke();
    
    // line 2
    Engine.ctx.moveTo(0, y + 250);
    Engine.ctx.lineTo(config.view_width, y + 250);
    Engine.ctx.stroke();
    
    if (GameState.screen_ready == true)
    {
        Engine.ctx.drawImage(GameState.screen, x, y);    
    }
    
    // loading stats
    set_font("Tahoma", 12, "255, 255, 255", "normal");
    var pct = Math.round(GameState.sprites_ready / GameState.sprites_number * 100);
    
    var str_pct = pct + '%';
    
    Engine.ctx.fillText(str_pct, 550, 320);
    
    // progress bar
    Engine.ctx.beginPath();
    Engine.ctx.rect(590, 320, pct, 16);
    Engine.ctx.fillStyle = 'white';
    Engine.ctx.fill();
    Engine.ctx.strokeStyle = 'white';
    Engine.ctx.stroke();
}

var Direction = {
    N : 0,

    E : 2,

    S : 4,

    W : 6
}

var GameSide = {
    NPC : 0,
    KNIGHTS : 1,
    SKELETONS : 2
}

/**
* Computes key of a tile
* 
* @param m
* @param n
*/
var get_tile_key = function (m, n){
    return n * config.map_tiles_w + m;
}

/**
* Returns tile position in matrix if given tile key
* 
* @param key
* 
* @returns {Array}
*/
var get_tile_by_key = function(key){
    return [ Math.floor(key / config.map_tiles_w), key % config.map_tiles_w ];
}

/**
* Given coordinates in pixels returns tile pos in matrix
* 
* @param x
* @param y
*/
var get_tile = function (x, y){
    return [ Math.floor(x / config.tile_width), Math.floor(y / config.tile_height) ];
}

/**
* Returns tile key if given array with positions in matrix
* 
* @param mat_arr
*/
var get_tile_key_mat = function (mat_arr){
    return get_tile_key (mat_arr[0], mat_arr[1]);
}

/**
* Returns position of a tile in a tilesheet
* 
* @param tilesheet_x
* @param tilesheet_y
*/
var get_tilesheet_tile = function (tilesheet_x, tilesheet_y){
    
    return tilesheet_y * config.tilesheet_columns + tilesheet_x;
}


/**
* Returns tile rectangle
* 
* @param tile_key
*/
var get_tile_rect = function (tile_key){

    var pos = get_tile_by_key (tile_key);

    var ret = [];

    ret.push(pos[0] * config.tile_width);
    ret.push(pos[1] * config.tile_height);
    ret.push(pos[0] * config.tile_width + config.tile_width);
    ret.push(pos[1] * config.tile_height + config.tile_height);

    return ret;
}

function get_w()
{
    return $(window).width();
}

function get_h()
{
    return $(window).height();
}



/**
* Draws a rounded rectangle using the current state of the canvas. 
* If you omit the last three params, it will draw a rectangle 
* outline with a 5 pixel border radius 
* @param {CanvasRenderingContext2D} ctx
* @param {Number} x The top left x coordinate
* @param {Number} y The top left y coordinate 
* @param {Number} width The width of the rectangle 
* @param {Number} height The height of the rectangle
* @param {Number} radius The corner radius. Defaults to 5;
* @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
* @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
*/
function roundRect(ctx, x, y, width, height, radius, fill, stroke, fill_color, stroke_color) 
{
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) 
    {
        ctx.fillStyle = stroke_color;
        ctx.stroke();
    }
    if (fill) 
    {
        ctx.fillStyle = fill_color;
        ctx.fill();
    }        
}

