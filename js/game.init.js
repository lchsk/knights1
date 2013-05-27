


Sprites.init();
//Sprites.get(Sprites);


current_map.load_map_from_tiled("map2.dat");
current_map.load_materials(Materials, units);

config.update();

//current_map.init();

//var map = current_map.GetMap();

var map_w = Math.floor(config.map_width / config.tile_width);
var map_h = Math.floor(config.map_height / config.tile_height);

b1 = new Building(building_knights_main);
b1.construction_progress = 100;
b1.x = current_map.knights_start_x;
b1.y = current_map.knights_start_y;

b3 = new Building(building_skeletons_main);
b3.construction_progress = 100;
b3.x = current_map.skeletons_start_x;
b3.y = current_map.skeletons_start_y;

b2 = new Building(building_knights_barracks);
b2.x = 12;
b2.y = 4;

//t1 = new Material('tree', Materials['stone_class_7'], 1, 4);

units.push(b1);
units.push(b2);
units.push(b3);

//units.push(t1);

// popups
var popups = {};

popups['not_enough_to_build'] = new Popup("This building cannot be built.<br />You do not have enough materials.", 300, 150);

popups['not_enough_to_train'] = new Popup("You cannot recruit this unit.<br />You do not have enough materials.", 300, 150);

popups['max_three_units_in_training'] = new Popup("You cannot recruit more<br />than three units at the same time.", 300, 150);

prices = {

    // Knights
    'farm': {
        gold: 5,
        material: 10
    },
    'woodcutter': {
        gold: 5,
        material: 10
    },
    'ktower': {
        gold: 5,
        material: 10
    },
    'kbarracks': {
        gold: 5,
        material: 10
    },
    'kgoldmine': {
        gold: 5,
        material: 10
    },

    // Skeletons
    'temple': {
        gold: 5,
        material: 10
    },
    'mason': {
        gold: 5,
        material: 10
    },
    'stower': {
        gold: 5,
        material: 10
    },
    'sbarracks': {
        gold: 5,
        material: 10
    },
    'sgoldmine': {
        gold: 5,
        material: 10
    },
    
    // Units
    'kknight': {
        gold: 5,
        food: 5
    },
}