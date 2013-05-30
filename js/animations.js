
/**
* Game animation class
* eg. explosions
* 
* @param name
* @param tilesheet
* @param rows_n
* @param columns_n
* @param frame_start
* @param frame_finish
* @param speed
*/
var AnimationClass = function(name, tilesheet, rows_n, columns_n, frame_start, frame_finish, frame_width, frame_height, speed){
    
    this.name = name;
    this.tilesheet = tilesheet;
    this.rows_n = rows_n;
    this.columns_n = columns_n;
    this.frame_start = frame_start;
    this.frame_finish = frame_finish;
    this.frame_width = frame_width;
    this.frame_height = frame_height;
    this.speed = speed;
}

/**
* Possible animations
*/
anim_explosion_1 = new AnimationClass('explosion1', GameSprites.explosion1, 5, 8, 0, 51, 128, 128, 1 / 30);

/**
* Class for every single animation
* 
* @param animation_class
* @param x
* @param y
*/
var Animation = function(animation_class, x, y){
    
    var that = this;
    
    this.animation_class = animation_class;
    this.x = x;
    this.y = y;
    this.current_frame = this.animation_class.frame_start;
    
    this.playing = true;
    
    this._ms = 0;
    
    // drawing current frame
    this.render = function()
    {
        if (this.playing)
        {
            var col = this.current_frame % this.animation_class.columns_n;
            var row = Math.floor(this.current_frame / this.animation_class.columns_n);
            
            Engine.ctx.drawImage(
                this.animation_class.tilesheet, 
                col * this.animation_class.frame_width,
                row * this.animation_class.frame_height, 
                this.animation_class.frame_width, this.animation_class.frame_height, 
                x - View.x, y - View.y, 
                this.animation_class.frame_width, this.animation_class.frame_height
            );
        }
    }
    


    this.play = function(ms)
    {
        if (this.playing)
        {
            that._ms += ms;
            
            if (that._ms > that.animation_class.speed)
            {
                that.current_frame++;
                this._ms = 0;
                
                if (this.current_frame == this.animation_class.frame_finish)
                {
                    //this.current_frame = 0;
                    this.playing = false;
                }
            }
                
        }
        
    }
}