



var MaterialClass = function(supply, tilesheet_pos, size, type){
    
    /**
    * How much stone can u get
    * 
    */
    var _supply = supply;

    this.GetSupply = function(){
        return _supply;
    }
    
    this.type = type; // material type (stone, timber)
    
    /**
    * Size in tiles
    * eg. [4, 4]
    */
    this.size = size;
    
    /**
    * Position on the tilesheet
    * eg. [3, 4]
    */
    this.tilesheet_pos = tilesheet_pos;
}

/*
var stone_class_1 = new MaterialClass(30, [8, 0], [1, 1]);
var stone_class_2 = new MaterialClass(30, [8, 1], [1, 1]);
var stone_class_3 = new MaterialClass(30, [8, 2], [1, 1]);
var stone_class_4 = new MaterialClass(30, [9, 1], [1, 1]);
var stone_class_5 = new MaterialClass(30, [9, 2], [1, 1]);
var stone_class_6 = new MaterialClass(30, [9, 3], [1, 1]);
var stone_class_7 = new MaterialClass(30, [10, 2], [1, 1]);

var tree_class_1 = new MaterialClass(30, [9, 8], [1, 1]);
var tree_class_2 = new MaterialClass(60, [9, 9], [1, 1]);
var tree_class_3 = new MaterialClass(30, [10, 10], [1, 1]);
var tree_class_4 = new MaterialClass(30, [11, 10], [1, 1]);
*/
var Materials = {
    
  'stone_class_1' : new MaterialClass(30, [8, 0], [1, 1], 'stone'),
  'stone_class_2' : new MaterialClass(30, [8, 1], [1, 1], 'stone'),
  'stone_class_3' : new MaterialClass(30, [8, 2], [1, 1], 'stone'),
  'stone_class_4' : new MaterialClass(30, [9, 1], [1, 1], 'stone'),
  'stone_class_5' : new MaterialClass(30, [9, 2], [1, 1], 'stone'),
  'stone_class_6' : new MaterialClass(30, [9, 3], [1, 1], 'stone'),
  'stone_class_7' : new MaterialClass(30, [10, 2], [1, 1], 'stone'),
  
  'tree_class_1' : new MaterialClass(30, [9, 8], [1, 1], 'tree'),
  'tree_class_2' : new MaterialClass(60, [9, 9], [1, 1], 'tree'),
  'tree_class_3' : new MaterialClass(30, [10, 10], [1, 1], 'tree'),
  'tree_class_4' : new MaterialClass(30, [11, 10], [1, 1], 'tree'),
  
    
};


var Material = function(material_class, x, y){

    this.what = 'material';
    
    this.hash = random_str(); 

    this.material_class = material_class;
    
    this.supply = this.material_class.GetSupply();

    this.visible = true;

    // position on a map [tiles]
    this.x = x;
    this.y = y;

    this.GetRect = function(){
        return [this.x * 32, this.y * 32, this.x * 32 + this.x + this.material_class.size[0] * config.tile_width, this.y * 32 + this.y + this.material_class.size[1] * config.tile_height];
        //return [this.x * 32, this.y * 32, this.x * 32 + config.tile_width, this.y * 32 + config.tile_height];
    }

}