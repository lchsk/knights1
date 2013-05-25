

var BuildingType = {
    MAIN : 0,
    FARM : 1,
    MATERIAL : 2,
    TOWER : 3,
    BARRACKS : 4,
    GOLDMINE : 5
}


var BuildingClass = function(side, name, type, strength, size, tilesheet_pos, label, construction_time){
    
    /**
    * 0 - NPC, 1 - Knights, 2 - Skeletons
    */
    var _side = side;

    this.GetSide = function(){
        return _side;
    }
    
    /**
    * farm...
    */
    var _label = label;

    this.GetLabel = function(){
        return _label;
    }

    /**
    * TOWNHALL, BARRACKS etc.
    */
    var _name = name;

    this.GetName = function(){
        return _name;
    }

    /**
    * Building's type: main, tower etc.
    * 
    */
    var _type = type;

    this.GetType = function(){
        return _type;
    }

    /**
    * Ability to endure opponent's attack
    * [0 - 100]
    */
    var _strength = strength;

    this.GetStrength = function(){
        return _strength;
    }
    
    /**
    * Building size in tiles
    * eg. [4, 4]
    */
    this.size = size;
    
    /**
    * Tiles rows of the building that will be drawn first (before units)
    * eg. [1] - first row
    */
    this.rows_top_layer = null;
    
    /**
    * Position on the tilesheet
    * eg. [3, 4]
    */
    this.tilesheet_pos = tilesheet_pos;
    
    /**
    * Building construction time
    * [sec]
    */
    this.construction_time = construction_time;

}

/**
* Skeletons
*/
building_skeletons_main = new BuildingClass(GameSide.SKELETONS, "Necropolis", BuildingType.MAIN, 80, [3, 2], [11, 29], 'necropolis', 10);
building_skeletons_farm = new BuildingClass(GameSide.SKELETONS, "Temple", BuildingType.FARM, 40, [3, 3], [14, 28], 'temple', 30);
building_skeletons_woodcutter = new BuildingClass(GameSide.SKELETONS, "Mason", BuildingType.MATERIAL, 30, [2, 2], [18, 28], 'mason', 20);
building_skeletons_tower = new BuildingClass(GameSide.SKELETONS, "Tower", BuildingType.TOWER, 100, [2, 2], [21, 28], 'stower', 25);
building_skeletons_barracks = new BuildingClass(GameSide.SKELETONS, "Barracks", BuildingType.BARRACKS, 90, [3, 3], [23, 28], 'sbarracks', 45);
building_skeletons_mine = new BuildingClass(GameSide.SKELETONS, "Gold Mine", BuildingType.GOLDMINE, 45, [3, 3], [26, 28], 'sgoldmine', 30);

// = new UnitClass(GameSide.SKELETONS, "Worker", false, 100, UnitType.WORKER, 30, 0);

/**
* Knights
*/

building_knights_main = new BuildingClass(GameSide.KNIGHTS, "Town Hall", BuildingType.MAIN, 80, [3, 3], [11, 25], 'townhall', 10);
building_knights_farm = new BuildingClass(GameSide.KNIGHTS, "Farm", BuildingType.FARM, 40, [4, 3], [14, 25], 'farm', 30);
building_knights_tower = new BuildingClass(GameSide.KNIGHTS, "Tower", BuildingType.TOWER, 100, [1, 2], [18, 25], 'ktower', 25);
building_knights_barracks = new BuildingClass(GameSide.KNIGHTS, "Barracks", BuildingType.BARRACKS, 90, [4, 3], [19, 25], 'kbarracks', 45);
building_knights_woodcutter = new BuildingClass(GameSide.KNIGHTS, "Woodcutter", BuildingType.MATERIAL, 30, [2, 2], [23, 25], 'woodcutter', 2);
building_knights_mine = new BuildingClass(GameSide.KNIGHTS, "Gold Mine", BuildingType.GOLDMINE, 45, [3, 3], [26, 24], 'kgoldmine', 30);


/**
* Create every building with this class
* 
* @param building_class
*/
var Building = function(building_class){

    this.what = 'building';
    
    /**
    * Building's class i.e. one of the objects from above
    */
    this.building_class = building_class;

    var health = 100;
    
    this.construction_progress = 5;

    this.visible = true;

    this.x = 0;
    this.y = 0;
    
    // unit class instance attached to this building
    this.worker = null;

    this.DrawBuilding = function(){
        //return (this.visible == true && this.GetHealth() > 0);
        return this.visible;
    }

    this.GetRect = function(){
        return [this.x * 32, this.y * 32, this.x * 32 + this.x + this.building_class.size[0] * config.tile_width, this.y * 32 + this.y + this.building_class.size[1] * config.tile_height];
    }
    
    /**
    * Returns building health
    */
    this.GetHealth = function(){
        return (health * this.building_class.GetStrength()) / (100 * this.building_class.GetStrength()) * 100;
    }
}