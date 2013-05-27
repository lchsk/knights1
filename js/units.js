

var UnitType = {
    WORKER : 0,
    WARRIOR : 1,
    ARCHER : 2,
    KNIGHT : 3,
    SPECIAL : 4
}


var UnitClass = function(side, name, is_warrior, speed, type, strength, attack){
    
    /**
    * 0 - NPC, 1 - Knights, 2 - Skeletons
    */
    var _side = side;

    this.GetSide = function(){
        return _side;
    }

    /**
    * Warrior, Knight etc.
    */
    var _name = name;

    this.GetName = function(){
        return _name;
    }

    /**
    * True if this unit can fight
    * 
    */
    var _is_warrior = is_warrior;

    this.IsWarrior = function(){
        return _is_warrior;
    }

    /**
    * Speed of movement
    * [0 - 100]
    */
    var _speed = speed;

    this.GetSpeed = function(){
        return _speed;
    }

    /**
    * Unit's type: worker, warrior etc.
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
    * Power of unit's attack abilities
    * [0 - 100]
    */
    var _attack = attack;

    this.GetAttack = function(){
        return _attack;
    }

    this.image = new Image();

    this.walkcycle = new Image();

}

/**
* Skeletons
*/

unit_skeleton_worker = new UnitClass(GameSide.SKELETONS, "Worker", false, 100, UnitType.WORKER, 30, 0);
unit_skeleton_worker.image.src = config.IMAGES_PATH + 'skeleton.png';
unit_skeleton_worker.walkcycle.src = config.IMAGES_PATH + 'skeleton_worker_walk.png';

/**
* Knights
*/

unit_knights_worker = new UnitClass(GameSide.KNIGHTS, "Worker", false, 0.8, UnitType.WORKER, 30, 0);
unit_knights_worker.walkcycle.src = config.IMAGES_PATH + 'knights_worker_walk32.png';

unit_knights_knight = new UnitClass(GameSide.KNIGHTS, "Knight", false, 0.8, UnitType.KNIGHT, 30, 0);
unit_knights_knight.walkcycle.src = config.IMAGES_PATH + 'knights_knight_walk32.png';


/**
* With this class create every single unit in the game
* 
* @param unit_class
*/
var Unit = function(unit_class){

    var that = this;
    
    this.what = 'unit';
    
    /**
    * Unit's class i.e. one of the objects from above
    * 
    */
    this.unit_class = unit_class;

    this.health = 100;

    this.visible = true;

    /**
    * Coordinates of the top-left corner of the image
    */
    this.x = 0;
    this.y = 0;

    this.width = 64;
    this.height = 64;
    
    this.size = 32;
    
    //this.center = { x: this.x - this.width / 2, y: this.y - this.height / 2}

    /**
    * Coordinates of the center of the unit
    */
    this.GetCenterX = function(){
        return this.x - 32;   
    }
    
    this.GetCenterY = function(){
        return this.y - 32;   
    }
    
    this.DrawUnit = function(){
        return (this.visible == true && this.health > 0);
    }

    this.GetRect = function(){
        return [this.GetCenterX(), this.GetCenterY(), this.GetCenterX() + this.width, this.GetCenterY() + this.height];
    }

    /**
    * Keys of the tiles during movement
    */
    this.road = [];
    
    this.current_tile = -1;

    this.SetTile = function(tile)
    {
        that.current_tile = tile;
        var t =  get_tile_by_key (tile);
        that.y = t[0] * 32;
        that.x = t[1] * 32;
    }
    
    this.IsMoving = function(){
        return this.road.length > 0;
    }

    /**
    * Needed for moving sprite
    */
    this.road_travelled = 0;

    /**
    * Current frame during walkcycle
    */
    this.current_frame = 0;

    /**
    * Current direction of movement
    */
    this.current_dir = 0;

    var _ms = 0;
    
    // 2-element array holding path the worker follows
    this.workers_job = [];
    
    // id of the tree/stone the worker is working on
    this.workers_dest = -1;
    
    // countint time the worker rests before he heads back to work
    this.rest_time = 0;
    
    // worker is at home
    this.at_home = true;

    /**
    * Returns array holding coordinates from spritesheet needed for animation
    */
    this.get_frame = function(){

        switch (this.current_dir)
        {
            case Direction.N:

            if (this.IsMoving())
                {
                return [this.size * this.current_frame, 0];   
            }
            else
                {
                return [0, 0];
            }


            break;

            case Direction.E:

            if (this.IsMoving())
                {
                return [this.size * this.current_frame, 3 * this.size];   
            }
            else
                {
                return [0, 3 * this.size];
            }

            break;

            case Direction.S:

            if (this.IsMoving())
                {
                return [this.size * this.current_frame, 2 * this.size];    
            }
            else
                {
                return [0, 2 * this.size];
            }

            break;

            case Direction.W:

            if (this.IsMoving())
                {
                return [this.size * this.current_frame, 1 * this.size];    
            }
            else
                {
                return [0, 1 * this.size];
            }

            break;
        }

        return [0, 0];
    }

    /**
    * Make unit move
    */
    this.move = function(ms){

        if(this.IsMoving())
        {
            var first = parseInt(this.road[0]);
            var second = parseInt(this.road[1]);

            var dir = current_map.get_direction(first, second);

            if (dir > -1)
                this.current_dir = dir;
            else if (dir == -1)
                this.current_frame = 0;

            switch (dir)
            {
                case Direction.N:
                    //this.y -= this.unit_class.GetSpeed() * ms;
                    this.y -= this.unit_class.GetSpeed();
                    break;

                case Direction.E:
                    //this.x += this.unit_class.GetSpeed() * ms;
                    this.x += this.unit_class.GetSpeed();
                    break;

                case Direction.S:
                    //this.y += this.unit_class.GetSpeed() * ms;
                    this.y += this.unit_class.GetSpeed();
                    break;

                case Direction.W:
                    //this.x -= this.unit_class.GetSpeed() * ms;
                    this.x -= this.unit_class.GetSpeed();
                    break;
            }

            //this.road_travelled += this.unit_class.GetSpeed() * ms;
            this.road_travelled += this.unit_class.GetSpeed();
            
            /**
            * Vital for moving sprites
            */
            
            /*
            var tmp_t = get_tile_by_key(this.current_tile);
            var t_x = tmp_t[1] * 32;
            var t_y = tmp_t[0] * 32;
            
            
            if ((Calc.is_within(this.x, t_x - 2, t_x + 2, true))
                &&
                (Calc.is_within(this.y, t_y - 2, t_y + 2, true))
                )
            {
                console.log('next tile...');
                this.current_tile = this.road[0];
                this.road_travelled = 0;
                this.road.shift();   
            }
            */
            
            //if (this.road_travelled > 31)
            if ((Calc.is_within(this.road_travelled, 31, 33, true)))
            {
                //console.log("next tile");
                
                var tile = get_tile_by_key(this.road[1]);
                
                if (tile > -1)
                {
                    this.x = tile[1] * 32;
                    this.y = tile[0] * 32;
                }
                
                
                this.current_tile = this.road[0];
                      
                
                this.road_travelled = 0;
                this.road.shift();      
                //alert(this.road.length);
            }

            /**
            * Animation stuff
            */
            if (dir > -1)
            {
                _ms++;

                if (_ms > animation_time.walkcycle)
                {
                    this.current_frame++;
                    _ms = 0;

                }
            }

            if (this.current_frame == 9)
                this.current_frame = 1;

        }
        else
            this.current_frame = 0;
    }




}