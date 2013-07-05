

var Sprites = Sprites || (function(){
    return {
        
        init : function(){
                  
            
			//this.sprites[0] = new Image();
			//this.sprites[0].src = Config.IMAGES_PATH + 'tile_grass_1.png';  

           // this.sprites[1] = new Image();
            //this.sprites[1].src = Config.IMAGES_PATH + 'tile_grass_2.png';  
             
        },
        get : function(obj){
            this.sprites = [];
            var url = Config.PATH + "data/sprites.dat";
            
            $.ajax({
                url: url,
                cache: false
            }).done(function(data) {
                var json = $.parseJSON(data);

                $.each(json.sprites.items.sprite, function(i, item){
                    
                    obj.sprites[i] = new Image();
                    obj.sprites[i].src = Config.IMAGES_PATH + item.filename;

                });
            });

            
        }
    };
}());



