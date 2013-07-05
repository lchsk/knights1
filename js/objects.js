



var Object = function(){

    this.what = 'mouintain';
    
    /**
    * Building's class i.e. one of the objects from above
    */
    this.building_class = building_class;

    var health = 100;
    
    this.construction_progress = 5;

    this.visible = true;

    this.x = 0;
    this.y = 0;

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