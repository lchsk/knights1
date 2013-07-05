
var Config = Config || function(){
    
    var that = this;
    
    this.PATH = 'http://localhost/knights/';
    this.IMAGES_PATH = 'http://localhost/knights/images/';
    
    /**
    * Number of columns in tilesheet image
    */
    this.tilesheet_columns = 45;

    /**
    * Map size in tiles
    */
    this.map_tiles_w = 1;
    this.map_tiles_h = 1;

    /**
    * Tile size in pixels
    */
    this.tile_width = 32;
    this.tile_height = 32;

    /**
    * Map size in pixels
    */
    this.map_width = this.map_tiles_w * this.tile_width;
    this.map_height = this.map_tiles_h * this.tile_height; 


    /**
    * Viewscreen size in pixels
    */
    this.view_width = 704;
    this.view_height = 512;

    /**
    * View size in tiles
    */
    this.view_tiles_w = Math.floor(this.view_width / this.tile_width) + 1;
    this.view_tiles_h = Math.floor(this.view_height / this.tile_height) + 1;

    /**
    * Wanted FPS
    */
    this.fps = 50;

    /**
    * Miliseconds per frame during animation
    */
    this.ms = 1000 / this.fps;
    
    this.update = function(){
        that.map_width = that.map_tiles_w * that.tile_width;
        that.map_height = that.map_tiles_h * that.tile_height;  
        
        /**
        * Maximum x and y coordinates for top-left corner of the viewscreen
        */
        this.view_max_x = this.map_width - this.view_width - 1;
        this.view_max_y = this.map_height - this.view_height - 1;  
		
    }
	
	this.inverse_button =0;
}


var config = new Config();
config.update();

//Config.init();