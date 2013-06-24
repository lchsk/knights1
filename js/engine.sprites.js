var animation_time = {
    
    walkcycle : 10,
    attack : 10,
    dying : 16
}

var current_map = new CurrentMap();



var GameSprites = {
    /**
    * What is under the unit when its selected
    * 
    * @type Image
    */
    selected_unit_image : new Image(),

    // box with building's name
    gui_box : new Image(),

    // buttons
    btn_destroy : new Image(),
    btn_clear : new Image(),
    btn_ok : new Image(),
    
    // buildings
    btn_farm : new Image(),
    btn_ktower : new Image(),
    btn_kbarracks : new Image(),
    btn_woodcutter : new Image(),
    btn_kgoldmine : new Image(),
    
    btn_temple : new Image(),
    btn_mason : new Image(),
    btn_stower : new Image(),
    btn_sbarracks : new Image(),
    btn_sgoldmine : new Image(),
    
    // units
    btn_kwarrior : new Image(),
    btn_karcher : new Image(),
    btn_kknight : new Image(),
    btn_kpaladin : new Image(),

    btn_swarrior : new Image(),
    btn_sarcher : new Image(),
    btn_sknight : new Image(),
    btn_smonk : new Image(),
    
    // drawing characters health
    life_strip : {
        100 : new Image(),
        80 : new Image(),
        60 : new Image(),
        40 : new Image(),
        20 : new Image()
    },
    
    tilesheet : new Image(),
    
    explosion1 : new Image(),
    
    data : {
        gold : [ 7, 11 ],
        timber : [7, 12],
        stone : [8, 12],
        food : [7, 13],
        mana : [8, 13],
    },
    
    
    fog : new Image()

}

function inc_ready_sprites(){
    GameState.sprites_ready++;
}

(function(){
    
    for (i in GameSprites)
    {      
        if (GameSprites[i] instanceof HTMLImageElement)
        {
            GameSprites[i].onload = inc_ready_sprites;
        }
    }
}());

function load_sprites()
{
    GameSprites.selected_unit_image.src = config.IMAGES_PATH + 'unit_selected.png';

GameSprites.life_strip[100].src = config.IMAGES_PATH + 'life_strip_100.png';
GameSprites.life_strip[100].onload = inc_ready_sprites;
GameSprites.life_strip[80].src = config.IMAGES_PATH + 'life_strip_80.png';
GameSprites.life_strip[80].onload = inc_ready_sprites;
GameSprites.life_strip[60].src = config.IMAGES_PATH + 'life_strip_60.png';
GameSprites.life_strip[60].onload = inc_ready_sprites;
GameSprites.life_strip[40].src = config.IMAGES_PATH + 'life_strip_40.png';
GameSprites.life_strip[40].onload = inc_ready_sprites;
GameSprites.life_strip[20].src = config.IMAGES_PATH + 'life_strip_20.png';
GameSprites.life_strip[20].onload = inc_ready_sprites;

GameSprites.tilesheet.src = config.IMAGES_PATH + 'knights_tiles.png';

GameSprites.gui_box.src = config.IMAGES_PATH + 'gui_box.png';
GameSprites.btn_destroy.src = config.IMAGES_PATH + 'btn_destroy.png';
GameSprites.btn_clear.src = config.IMAGES_PATH + 'btn_clear.png';
GameSprites.btn_ok.src = config.IMAGES_PATH + 'btn_ok.png';

GameSprites.btn_farm.src = config.IMAGES_PATH + 'btn_farm.png';
GameSprites.btn_ktower.src = config.IMAGES_PATH + 'btn_ktower.png';
GameSprites.btn_kbarracks.src = config.IMAGES_PATH + 'btn_kbarracks.png';
GameSprites.btn_woodcutter.src = config.IMAGES_PATH + 'btn_woodcutter.png';
GameSprites.btn_kgoldmine.src = config.IMAGES_PATH + 'btn_kgoldmine.png';

GameSprites.btn_temple.src = config.IMAGES_PATH + 'btn_temple.png';
GameSprites.btn_mason.src = config.IMAGES_PATH + 'btn_mason.png';
GameSprites.btn_stower.src = config.IMAGES_PATH + 'btn_stower.png';
GameSprites.btn_sbarracks.src = config.IMAGES_PATH + 'btn_sbarracks.png';
GameSprites.btn_sgoldmine.src = config.IMAGES_PATH + 'btn_sgoldmine.png';

// Units

GameSprites.btn_kwarrior.src = config.IMAGES_PATH + 'btn_kwarrior.png';
GameSprites.btn_karcher.src = config.IMAGES_PATH + 'btn_karcher.png';
GameSprites.btn_kknight.src = config.IMAGES_PATH + 'btn_kknight.png';
GameSprites.btn_kpaladin.src = config.IMAGES_PATH + 'btn_kpaladin.png';

GameSprites.explosion1.src = config.IMAGES_PATH + 'explosion1.png'; // 26

GameSprites.btn_swarrior.src = config.IMAGES_PATH + 'btn_swarrior.png';
GameSprites.btn_sarcher.src = config.IMAGES_PATH + 'btn_sarcher.png';
GameSprites.btn_sknight.src = config.IMAGES_PATH + 'btn_sknight.png';
GameSprites.btn_smonk.src = config.IMAGES_PATH + 'btn_smonk.png'; // 30

GameSprites.fog.src = config.IMAGES_PATH + 'fog.png'; // 31
}

