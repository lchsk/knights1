current_map.b_tiles = buildings_tiles();

update_build_map();

build_graph();


var buttons = load_buttons();
var running_game = true;


function destroy_building()
{

        new Messi('Are you sure you want to destroy this building?', 
                {
                        title: 'Destroy this building?',               
                        modal: true,
                        buttons: [
                                {id: 0, label: '<IMG src="images/btn_ok.png" alt="Yes" title="Yes"/>', val: 'Y'}, 
                                {id: 1, label: '<IMG src="images/btn_no.png" alt="No" title="No"/>', val: 'N'}
                                ], 
                        callback: 
                                function(val) 
                                {  
                                        if(val == 'Y')
                                        {
                                                var price = prices[selected_units[0].building_class.GetLabel()];
                                                current_game.gold += Math.floor(price.gold / 2);
                                                current_game.material += Math.floor(price.material / 2);
                                                selected_units[0].health = -1;
									            
												// sending message
									            var tmp = { hash: selected_units[0].hash };
									            var url = config.PATH + 'index.php?id=del_building';
									        
									            $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: JSON.stringify(tmp) } });

                                                                                   
                                                selected_units.length = 0;
                                        }
                                
                                }       
                }
                
        );
        
}

/**
* Construction of a building
* 
* @param name
*/
function build(name)
{
    var gold = current_game.gold;
    var material = current_game.material;
    
    var price = prices[name];

    if (price)
    {
        if (gold >= price['gold'] && material >= price['material'])
        {
            //
            current_game.constructing = true;
            
            // Knights
            if (name == 'farm')
            {
                current_game.building_built_class = building_knights_farm;
                current_game.building_built_name = 'farm';
            }
            else if (name == 'woodcutter')
            {
                current_game.building_built_class = building_knights_woodcutter;
                current_game.building_built_name = 'woodcutter';
            }
            else if (name == 'kgoldmine')
            {
                current_game.building_built_class = building_knights_mine;
                current_game.building_built_name = 'kgoldmine';
            }
            else if (name == 'ktower')
            {
                current_game.building_built_class = building_knights_tower;
                current_game.building_built_name = 'ktower';
            }
            else if (name == 'kbarracks')
            {
                current_game.building_built_class = building_knights_barracks;
                current_game.building_built_name = 'kbarracks';
            }
                      
            // Skeletons
            else if (name == 'temple')
            {
                current_game.building_built_class = building_skeletons_farm;
                current_game.building_built_name = 'temple';
            }
            else if (name == 'mason')
            {
                current_game.building_built_class = building_skeletons_woodcutter;
                current_game.building_built_name = 'mason';
            }
            else if (name == 'sgoldmine')
            {
                current_game.building_built_class = building_skeletons_mine;
                current_game.building_built_name = 'sgoldmine';
            }
            else if (name == 'stower')
            {
                current_game.building_built_class = building_skeletons_tower;
                current_game.building_built_name = 'stower';
            }
            else if (name == 'sbarracks')
            {
                current_game.building_built_class = building_skeletons_barracks;
                current_game.building_built_name = 'sbarracks';
            }
        }
        else
        {
            popups['not_enough_to_build'].visible = true;
        }
    }
}

function finalize_build()
{
    if (current_game.construction_allowed)
    {
        //  console.log(current_game.building_built_class);
        var b = new Building(current_game.building_built_class);

        //var w = Math.floor((mouse_pos.x + View.x) / 32);
        //var h = Math.floor((mouse_pos.y + View.y) / 32);

        b.x = current_game.construction_x;
        b.y = current_game.construction_y;
        units.push(b);
        
        // substract price
        current_game.gold -= prices[current_game.building_built_name].gold;
        current_game.material -= prices[current_game.building_built_name].material;
        
        // map stuff...
        current_map.b_tiles = buildings_tiles();
        update_build_map();
        build_graph();
        
        // sending a message
        
        b.use_class = current_game.building_built_class.GetLabel();
        var tmp = JSON.stringify(b);
        var url = config.PATH + 'index.php?id=add_building';
        
        $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: tmp } });
    }
}



/**
* Unit recruitment button callback
* 
* @param name
*/
function train_unit(name)
{
    var gold = current_game.gold;
    var material = current_game.material;
    var food = current_game.food;
    
    var price = prices[name];

    if (price)
    {
        if (gold >= price['gold'] && food >= price['food'])
        {
            //
            //current_game.constructing = true;
            
            // check if selected unit is barracks
            if (selected_units.length == 1 && selected_units[0].what == 'building')
            {
                
                
                if (selected_units[0].units_queue.length < current_game.max_units_in_training)
                {
                    var new_unit = false;
                    
                    // Knights
                    if (name == 'kwarrior')
                    {
                        var tmp_obj = { 'unitclass': unit_knights_warrior, 'name': 'kwarrior' };
                        new_unit = true;
                    }   
                    else if (name == 'karcher')
                    {
                        var tmp_obj = { 'unitclass': unit_knights_archer, 'name': 'karcher' };
                        new_unit = true;
                    }
                    else if (name == 'kknight')
                    {
                        var tmp_obj = { 'unitclass': unit_knights_knight, 'name': 'kknight' };
                        new_unit = true;
                    }
                    else if (name == 'kpaladin')
                    {
                        var tmp_obj = { 'unitclass': unit_knights_paladin, 'name': 'kpaladin' };
                        new_unit = true;
                    }
                    
                    // Skeletons
                    else if (name == 'swarrior')
                    {
                        var tmp_obj = { 'unitclass': unit_skeletons_warrior, 'name': 'swarrior' };
                        new_unit = true;
                    }   
                    else if (name == 'sarcher')
                    {
                        var tmp_obj = { 'unitclass': unit_skeletons_archer, 'name': 'sarcher' };
                        new_unit = true;
                    }
                    else if (name == 'sknight')
                    {
                        var tmp_obj = { 'unitclass': unit_skeletons_knight, 'name': 'sknight' };
                        new_unit = true;
                    }
                    else if (name == 'smonk')
                    {
                        var tmp_obj = { 'unitclass': unit_skeletons_monk, 'name': 'smonk' };
                        new_unit = true;
                    }
                    
                    if (new_unit == true)
                    {
                        selected_units[0].units_queue.push(tmp_obj);
                        selected_units[0].units_in_training++;
                        
                        // substract price
                        current_game.gold -= prices[name].gold;
                        current_game.food -= prices[name].food;
                   }

                    
                }
                else
                {
                    popups['max_three_units_in_training'].visible = true;
                }
            } 
        }
        else
        {
            popups['not_enough_to_train'].visible = true;
        }
    }
}







/*
u1 = new Unit(unit_knights_archer);
u2 = new Unit(unit_knights_warrior);
u3 = new Unit(unit_knights_knight);
u4 = new Unit(unit_knights_paladin);
u5 = new Unit(unit_knights_worker);

u6 = new Unit(unit_skeletons_archer);
u7 = new Unit(unit_skeletons_warrior);
u8 = new Unit(unit_skeletons_knight);
u9 = new Unit(unit_skeletons_monk);
u10 = new Unit(unit_skeletons_worker);


u11 = new Unit(unit_knights_archer);
u12 = new Unit(unit_knights_warrior);
u13 = new Unit(unit_knights_knight);
u14 = new Unit(unit_knights_paladin);
u15 = new Unit(unit_knights_worker);

u21 = new Unit(unit_knights_archer);
u22 = new Unit(unit_knights_warrior);
u23 = new Unit(unit_knights_knight);
u24 = new Unit(unit_knights_paladin);
u25 = new Unit(unit_knights_worker);

u31 = new Unit(unit_knights_archer);
u32 = new Unit(unit_knights_warrior);
u33 = new Unit(unit_knights_knight);
u34 = new Unit(unit_knights_paladin);
u35 = new Unit(unit_knights_worker);

units.push(u1);
units.push(u2);
units.push(u3);
units.push(u4);
units.push(u5);
units.push(u11);
units.push(u12);
units.push(u13);
units.push(u14);
units.push(u15);
units.push(u21);
units.push(u22);
units.push(u23);
units.push(u24);
units.push(u25);
units.push(u31);
units.push(u32);
units.push(u33);
units.push(u34);
units.push(u35);
units.push(u6);
units.push(u7);
units.push(u8);
units.push(u9);
units.push(u10);


u11.SetTile(1);
u12.SetTile(2);
u13.SetTile(3);
u14.SetTile(4);
u15.SetTile(5);
u21.SetTile(6);
u22.SetTile(7);
u23.SetTile(8);
u24.SetTile(9);
u25.SetTile(10);
u31.SetTile(37);
u32.SetTile(38);
u33.SetTile(39);
u34.SetTile(40);
u35.SetTile(41);
u1.SetTile(67);
u2.SetTile(68);
u3.SetTile(69);
u4.SetTile(70);
u5.SetTile(71);

u6.SetTile(30);
u7.SetTile(31);
u8.SetTile(32);
u9.SetTile(33);
u10.SetTile(34);



*/





/*
var remove_from_graph = function (b)
{
for (var x = 0; x < b.building_class.size[0]; ++x)
{
for (var y = 0; y < b.building_class.size[1]; ++y)
{
if ( ! (x in b.building_class.rows_top_layer))
{
var rem_key = i - 1;
delete graph[i][rem_key];
}
}    
}
}*/





//path = dijkstra.find_path(graph, 29, 81);
//alert(path);



/**
* LMB Click
* 
* @param event
*/
lmb_click = function(event){
    event.preventDefault();
    
    /**
    * Selection rect
    */
    SelectionRect.start_x = mouse_pos.x + View.x;
    SelectionRect.start_y = mouse_pos.y + View.y;

    var search = true;
    
    // finalizing construction of a building
    // has to be beofre clicking a button
    if (current_game.constructing)
    {
        finalize_build();
        
        current_game.constructing = false;
        current_game.building_built_class = null;
    }
    
    // Buttons click
    for (var b in buttons)
    {
        if (Calc.in_rect(mouse_pos.x, mouse_pos.y, buttons[b].GetRect()) && buttons[b].visible)
        {
            search = false;
            if (typeof buttons[b].click == "function")
            {            
                buttons[b].click();
            }
            break;
        }
    }

    if (search)
    {
        // Selecting units & buildings
        if ( ! select_units(mouse_pos.x, mouse_pos.y))
            select_building(mouse_pos.x, mouse_pos.y);
    }
    
    
};

/**
* RMB Click
* 
* @param event
*/
rmb_click = function(event){
    event.preventDefault();

    // moving only one selected unit
    if (selected_units.length == 1)
    {
        // selected unit
        var u = selected_units[0];

        if (u.what == 'unit' && u.visible)
        {
            //after this change we can change order for soldier when do another order- ss
            //    if (u.IsMoving())
            {
                //u.road.splice(1, u.road.length - 2);
                //alert(u.road);
                //return 0;
            }
            //else
                {

                //u.road.length = 0;
                //u.road_travelled = 0;

                //var tile_start = get_tile(u.x, u.y);
                //var tile_start = get_tile(u.x, u.y);
                //new way to get current_tile - ss
                var tile_start = u.get_start_tile_to_walk();
                //console.log(tile_start + " : " + get_tile_by_key(tile_start));
                //console.log(tile_start + " : " + get_tile_by_key(tile_start));

                var target_x = Calc.constrain(mouse_pos.x + View.x, 0, View.map_width);
                var target_y = Calc.constrain(mouse_pos.y + View.y, 0, View.map_height);

                var tile_finish = get_tile(target_x, target_y);
                
                var tile_finish_key = get_tile_key_mat (tile_finish);

                // check if the user clicked on a opposing unit
                var try_attack = false;
                
                for (var i = 0; i < units.length; ++i)
                {
                    if (units[i] && units[i].what == 'unit' && units[i].unit_class.GetSide() == current_game.player2_side_id && units[i].visible && units[i].health > 0)
                    {
                        if (units[i].current_tile == tile_finish_key)
                        {
                            // clicked on a opposing unit
                            try_attack = true;
                            //u.attack_target = units[i];
                       //     console.log('found an enemy');                   
                            break;
                        } 
                    }
                }

                try
                {
                    var path = dijkstra.find_path (graph, parseInt (tile_start), get_tile_key_mat (tile_finish));
					//new way to set path to purpose - ss
                    u.try_attack = try_attack;
                    
                    if (try_attack)
                    {
                        path.pop();
                        
                    }
                    
                    //new way to set path to purpose - ss
                    u.set_new_road(path);
                    
                    
                    
                    // sending a message
                        
                        var str_u = {
                            hash : u.hash,
                            path : path
                        };
                        
                        var tmp = JSON.stringify(str_u);
                        var url = config.PATH + 'index.php?id=move_unit';
        
                        $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: tmp } });
                    
                //   console.log(path);
                }
                catch(e)
                {
                    // path not found
                    //u.road.length = 0;
                    u.try_attack = false;
                    console.log("Path not found");
                }
            }   
        }
    }
    else if (selected_units.length > 1)
    {
        // neede for sending over to the other user
        var collected_units = [];

        for (i in selected_units)
        {
            if (selected_units[i].what == 'unit')
            {
                //The same situation as above - ss
              //  if ( ! selected_units[i].IsMoving())
                {
                    //var tile_start = get_tile(u.x, u.y);
                    //var tile_start = selected_units[i].current_tile;
                    var tile_start = selected_units[i].get_start_tile_to_walk();
                    //console.log(tile_start + " : " + get_tile_by_key(tile_start));

                    var target_x = Calc.constrain(mouse_pos.x + View.x, 0, View.map_width);
                    var target_y = Calc.constrain(mouse_pos.y + View.y, 0, View.map_height);

                    var base_tile_finish = get_tile(target_x, target_y);
                    
                    if (i == 0)
                        tile_finish = base_tile_finish;
                    else if (i == 1)
                        tile_finish = get_tile(target_x + 32, target_y);
                    else if (i == 2)
                        tile_finish = get_tile(target_x - 32, target_y);
                    else if (i == 3)
                        tile_finish = get_tile(target_x, target_y + 32);
                    else if (i == 4)
                        tile_finish = get_tile(target_x, target_y - 32);

                    var last_working_target = base_tile_finish;
                    
                    var find = function(target){
                        try
                        {
                            var path = dijkstra.find_path(graph, parseInt(tile_start), get_tile_key_mat(target));
                            selected_units[i].set_new_road(path);
                            
                            var u_data = { hash: selected_units[i].hash, path: path };
                            
                            //collected_units += JSON.stringify(u_data) + "||";
                            collected_units.push(u_data);
                            
                            return true;
                        }
                        catch(e)
                        {
                            // path not found
                           // selected_units[i].road.length = 0;
                            console.log("Path not found");
                            
                            return false;
                        }
                    };

                    if ( ! find (tile_finish))
                    {
                        
                        if (i > 0)
                        {
                            find (last_working_target);
                        }
                    } 
                    else
                    {
                        last_working_target = tile_finish;
                    }              
                }
            }
        }
        
        // sending message
        var url = config.PATH + 'index.php?id=move_units';
        
        var str_obj = { arr : collected_units };
        
        
        $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: JSON.stringify(str_obj) } });
        
    }
    
    
    // Turning off highlight for a new building (while preparing to build)
    if (current_game.constructing)
    {
        current_game.constructing = false;
        current_game.building_built_class = null;
        current_game.building_built_name = '';
    }
};

/*
var find_workers_path = function(u)
{
    //u.workers_job[0] = -1;
    //u.workers_job[1] = -1;
    //u.workers_dest = -1;
    //u.road.length = 0;
    
    // find trees
    for (var i in units)
    {
        if (units[i] && units[i].what == 'material')
        {
            if (units[i].material_class.type == 'tree')
            {
                //console.log(units[i].x + " " + units[i].y);

                var found = false;

                try
                {
                    var dest = get_tile_key(units[i].x + 1, units[i].y);
                    var path = dijkstra.find_path(graph, u.workers_job[0], dest);
                    u.workers_job[1] = dest;
                    u.workers_dest = i;
                    u.road = path;
                    found = true;
                }
                catch(e)
                {
                    // path not found
                    u.road.length = 0;
                    //console.log("Path not found");
                    found = false;
                }

                if (found)
                    break;
            }
        }
    }
}
*/

/**
    * Finalizing movement of multiple units
    * 
    */
    /*
function finalize_units_movement(u)
{
    if (u.IsMoving())
    {
                if (u.road.length == 2)
                {
                    //units[i].road_travelled = 0;

                    var tile_start = u.current_tile;
                    
                    var tile_finish = u.road[1] + 1;

                    try
                    {
                        var path = dijkstra.find_path(graph, parseInt(tile_start), (tile_finish));
                        u.road = path;
                        console.log('success');
                    }
                    catch(e)
                    {
                        console.log('fail');
                        // path not found
                        // dont change current path
                        //u.road.length = 0;
                    }
                }
    }
  */  
    /*
    var first_left = false;
    for (var i in units)
    {
        if (units[i] && units[i].what == 'unit')
        {
            
            if (units[i].IsMoving() && ! first_left)
            {
                first_left = true;
                continue;
            }
                     
            if (units[i].IsMoving())
            {
                if (units[i].road.length == 2)
                {
                    //units[i].road_travelled = 0;

                    var tile_start = units[i].current_tile;
                    
                    var tile_finish = units[i].road[1];

                    try
                    {
                        var path = dijkstra.find_path(graph, parseInt(tile_start), (tile_finish));
                        units[i].road = path;
                        console.log('success');
                    }
                    catch(e)
                    {
                        console.log('fail');
                        // path not found
                        // dont change current path
                        //u.road.length = 0;
                    }
                }
            }
        }
    }
}*/


function remove_fog(u)
{
    var coord = -1;
    var i = 0;
    var tile = parseInt(u.road[0], 10);
    
    while (i < 12)
    {
        if (i == 0)
            coord = get_tile_by_key(tile + 1);
        else if (i == 1)
            coord = get_tile_by_key(tile - 1);
        else if (i == 2)
            coord = get_tile_by_key(tile + config.map_tiles_w);
        else if (i == 3)
            coord = get_tile_by_key(tile - config.map_tiles_w);
            
        else if (i == 4)
            coord = get_tile_by_key(tile + 2);
        else if (i == 5)
            coord = get_tile_by_key(tile - 2);
        else if (i == 6)
            coord = get_tile_by_key(tile + 2 * config.map_tiles_w);
        else if (i == 7)
            coord = get_tile_by_key(tile - 2 * config.map_tiles_w);
            
        else if (i == 8)
            coord = get_tile_by_key(tile + 3);
        else if (i == 9)
            coord = get_tile_by_key(tile - 3);
        else if (i == 10)
            coord = get_tile_by_key(tile + 3 * config.map_tiles_w);
        else if (i == 11)
            coord = get_tile_by_key(tile - 3 * config.map_tiles_w);
            
        if (coord[0] >= 0 && coord[0] < config.map_tiles_w && coord[1] >= 0 && coord[1] < config.map_tiles_h)  
        {
            var fog_x1 = Math.ceil(coord[0] / 3);    
            var fog_y1 = Math.ceil(coord[1] / 3);
            var fog_x2 = Math.floor(coord[0] / 3);    
            var fog_y2 = Math.floor(coord[1] / 3);

            if (current_map.fog[fog_y1][fog_x1] >= 0)
            {
                current_map.fog[fog_y1][fog_x1] = -1;
            }
            else if (current_map.fog[fog_y2][fog_x2] >= 0)
            {
                current_map.fog[fog_y2][fog_x2] = -1;
            }
        }  
        
        
        i++;
    }
    
    
     

    
}


var update = function(ms){

    
    
    
    // Animations
    for (var i in animations)
    {
        if (animations[i])
        {
            animations[i].play(ms);
        }
    }
    
    
    // attack!

    var start_attack = function(attacking_unit, defending_unit, direction){
  
        attacking_unit.current_dir = direction;
        attacking_unit.fighting = true;
        attacking_unit.attack_target = defending_unit;
                    
    };
    
    // cleaning up units array
    for (var i = 0; i < units.length; ++i)
    {
        if (units[i] && units[i].health <= 0 && units[i].played_death)
        {
            //units[i].visible = false;
            //delete units[i];
        }
        else if (units[i] && units[i].health <= 0 && ! units[i].played_death && units[i].visible)
        {
            // play death animation
            
            units[i].fighting = false;
            
            if ( ! units[i].dying)
                units[i].current_frame = 0;
            
            units[i].dying = true;
            
            units[i].current_dir = 0;
            
            // sending message
            var tmp = { hash: units[i].hash };
            var url = config.PATH + 'index.php?id=del_unit';
        
            $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: JSON.stringify(tmp) } });
        }
    }

    
   var reset_fight = function(u){
        
        u.fighting = false;
        
        if (u.attack_target != null)
        {
            u.attack_target.fighting = false;
                        
       //     units[i].attack_target.attack_target = null;
            u.attack_target = null;
        }
   };
       
    // Finding enemy nearby

    for (var i = 0; i < units.length; ++i)
    {
        var fight = false;
        
        // Subtracting from health (if the unit is fighting)
        if (units[i].attack_target != null)
        {
            if (units[i].attack_target.health > 0 && units[i].health > 0 && units[i].attack_target.visible)
            {                   
                var attack_power = units[i].offense();
                                
                if (attack_power > 0)
                {
                	attack_power = attack_power/5 - units[i].attack_target.GetClass().GetStrength() / 10;
                    
                    if (attack_power > 0)
                    {
						units[i].attack_target.health -= attack_power;
						
						if(units[i].attack_target.what == 'unit'){
							var temp;
							
							switch(units[i].current_dir){
								case Direction.S:
									temp = anim_blood_down;
									break;
								case Direction.N:
									temp = anim_blood_up;
									break;
								case Direction.E:
									temp = anim_blood_right;
									break;
								default:
									temp = anim_blood_left;
							}
								
							var anim  = new Animation(temp, units[i].attack_target.x, units[i].attack_target.y);
							animations.push(anim);
						}	
					}
                }         
            }
        }
        
        
        // users unit
        //if (units[i] && units[i].what == 'unit' && units[i].unit_class.GetSide() == current_game.player1_side_id && units[i].unit_class.IsWarrior())
        if (units[i] && units[i].what == 'unit' && units[i].unit_class.IsWarrior() && units[i].visible && units[i].health > 0)
        {
                        var distance = units[i].unit_class.GetAttackDistance()*config.tile_width;
                        var nearest_distance = distance + 1;
                        var near_diff_e_w;
                        var near_diff_n_s;
                        var purrpose_unit;                      
                                
                        for (var j = 0; j < units.length; ++j)
                        {
                                if (units[j] && units[j].what == 'unit' && units[j].health > 0 &&       units[j].visible  && units[i].unit_class.GetSide() != units[j].unit_class.GetSide()) 
                                {                                       
                                
                                        var diff_n_s = units[j].y - units[i].y;
                                        
                                        if(Math.abs(diff_n_s) > distance) 
                                        {                                       
                                                continue;
                                        }
                                                                                                
                                        var diff_e_w = units[j].x - units[i].x;
                                        
                                        if(Math.abs(diff_e_w) > distance )
                                        {                                                       
                                            continue;
                                        }
                                        
                                        var current_distance = Math.sqrt( diff_e_w * diff_e_w + diff_n_s * diff_n_s);
                                                
                                        if (current_distance <= distance && current_distance < nearest_distance)
                                        {
                                                fight = true;
                                                nearest_distance = current_distance;
                                                near_diff_n_s = diff_n_s;
                                                near_diff_e_w = diff_e_w;
                                                purrpose_unit = units[j];
                                        }
                                }
                        }
                                
                        		if( fight == false )
			{
				var temp_n_s;
				var temp_e_w;
				var temp;
				var current_distance;
					
				for (var j = 0; j < units.length; ++j)
				{
					if(units[j] && units[j].what == 'building' && units[j].health > 0 && units[j].visible && units[i].unit_class.GetSide() != units[j].building_class.GetSide())
					{
						
						var Rect = units[j].GetRectFight();
						
						var diff_n_s = Rect[1] - units[i].y;
						temp_n_s = Rect[3] - units[i].y;
						
						var diff_e_w = Rect[0] - units[i].x;
						temp_e_w = Rect[2] - units[i].x;
							
						if(Math.abs(diff_n_s) >  Math.abs(temp_n_s)){
						
							temp = diff_n_s;
							diff_n_s = temp_n_s;
							temp_n_s = temp;
						}
														
						if(Math.abs(diff_e_w) >  Math.abs(temp_e_w)){
						
							temp = diff_e_w;
							diff_e_w = temp_e_w;
							temp_e_w = temp;
						}
							
						if(diff_n_s*temp_n_s <= 0) {
								
							current_distance = Math.abs(diff_e_w);
							diff_n_s = current_distance +1;
								
						} else if(diff_e_w*temp_e_w <= 0) {
							
							current_distance = Math.abs(diff_n_s);
							diff_e_w = current_distance +1;
							
						} 
						
						/*if(Math.abs(diff_n_s) > distance) {
							
							continue; 
								
						} else if(Math.abs(diff_e_w) > distance ) {
							
							continue;
								
						} */else {						
		
							current_distance = Math.sqrt( diff_e_w * diff_e_w + diff_n_s * diff_n_s);
						}
							
						if (current_distance <= distance && current_distance < nearest_distance)
						{
							fight = true;
							nearest_distance = current_distance;
							near_diff_n_s = diff_n_s;
							near_diff_e_w = diff_e_w;
							purrpose_unit = units[j];
						}
					}
				}
			}
			
			if(fight == true){
					
				var t_dir = -1;
					
				if(Math.abs(near_diff_n_s) >  Math.abs(near_diff_e_w)){
						
					if(near_diff_n_s > 0){						
						t_dir = Direction.S;
					}else{
						t_dir = Direction.N;
					}
				}else{
					if(near_diff_e_w > 0){						
						t_dir = Direction.E;
					} else{
						t_dir = Direction.W;
					}						
				}
				start_attack (units[i], purrpose_unit, t_dir);
			}
        }
        
		if(units[i] && units[i].what == 'building' && units[i].health > 0 && units[i].visible && units[i].building_class.CanAttack() && units[i].construction_progress > 99) {
			
			var distance = units[i].building_class.GetAttackDistance()*config.tile_width;
			var nearest_distance = distance + 1;
			var near_diff_e_w;
			var near_diff_n_s;
			var purrpose_unit;
			var temp_n_s;
			var temp_e_w;
			var temp;
			var current_distance;
			
			for (var j = 0; j < units.length; ++j)
			{
				if (units[j] && units[j].what == 'unit' && units[j].health > 0 && 	units[j].visible  && units[i].building_class.GetSide() != units[j].unit_class.GetSide()) {					
						
					var Rect = units[i].GetRectFight();
					
					var diff_n_s = Rect[1] - units[j].y;
					temp_n_s = Rect[3] - units[j].y;
					
					var diff_e_w = Rect[0] - units[j].x;
					temp_e_w = Rect[2] - units[j].x;
							
					if(Math.abs(diff_e_w) >  Math.abs(temp_n_s)){
					
						temp = diff_e_w;
						diff_e_w = temp_e_w;
						temp_e_w = temp;
					}
														
					if(Math.abs(diff_n_s) >  Math.abs(temp_n_s)){
						
						temp = diff_n_s;
						diff_n_s = temp_n_s;
						temp_n_s = temp;
					}
							
					if(diff_n_s*temp_n_s < 0) {
								
						current_distance = Math.abs(diff_n_s);
						diff_e_w = current_distance +1;
							
					} else if(diff_e_w*temp_e_w < 0) {
							
						current_distance = Math.abs(diff_e_w);
						diff_n_s = current_distance +1;
							
					} else if(Math.abs(diff_n_s) > distance) {
							
						continue; 
								
					} else if(Math.abs(diff_e_w) > distance ) {
						
						continue;
								
					} else {						
		
						current_distance = Math.sqrt( diff_e_w * diff_e_w + diff_n_s * diff_n_s);
					}
							
					if (current_distance <= distance && current_distance < nearest_distance)
					{
						fight = true;
						nearest_distance = current_distance;
						near_diff_n_s = diff_n_s;
						near_diff_e_w = diff_e_w;
						purrpose_unit = units[j];
					}
				}
			}       

                        if(fight == true){
                                        
                                var t_dir = -1;
                                        
                                if(Math.abs(near_diff_n_s) >  Math.abs(near_diff_e_w)){
                                                
                                        if(near_diff_n_s > 0){                                          
                                                t_dir = Direction.S;
                                        }else{
                                                t_dir = Direction.N;
                                        }
                                }else{
                                        if(near_diff_e_w > 0){                                          
                                                t_dir = Direction.E;
                                        } else{
                                                t_dir = Direction.W;
                                        }                                               
                                }
                                start_attack (units[i], purrpose_unit, t_dir);
                                units[i].fight(ms);
                        }                       
                }
                
        // Reset.. - is reseting in every
        if (fight == false && units[i] && (units[i].what == 'unit' || units[i].what == 'building' )&& units[i].visible && units[i].health > 0)
        {
                        reset_fight (units[i]);  
        }
    }
    
    /**
    * Playing dying animation for units
    * ...
    */
    // Selection Rect
    if (SelectionRect.on == true)
    {
        SelectionRect.end_x = mouse_pos.x;
        SelectionRect.end_y = mouse_pos.y;
    }
    
    if (mouse_state['left'] == true)
    {
        SelectionRect.on = true;       
    }
    else
    {
		if (SelectionRect.on == true)
		{
			SelectionRect.end_x += View.x;
			SelectionRect.end_y += View.y;
			 
			if(Math.abs(SelectionRect.end_x - SelectionRect.start_x) > 4 || Math.abs(SelectionRect.end_y - SelectionRect.start_y) > 4)
			{
				select_multiple_units();
			}	
		}	
		
		SelectionRect.on = false;
        SelectionRect.start_x = -1;
        SelectionRect.start_y = -1;
        SelectionRect.end_x = -1;
        SelectionRect.end_y = -1;
    }

   /**
    * Movement
    */
    for (var i = 0; i < units.length; ++i)
    {
        if (units[i] != null && units[i].visible)
        {
			if (units[i].what == 'unit')
           	{            
            	units[i].move(ms);
                
				if(units[i].fighting)
                	units[i].fight(ms); 
                                                
                if (units[i].IsMoving())
				{
					remove_fog(units[i]);
                    units[i].fighting = false;  
				}
                        
                if(units[i].die(ms))
				{
                                
                	for (var j = 0; i < selected_units.length; ++j){
                    	if (selected_units[j] != null && selected_units[j] == units[i]) {
                        	selected_units.splice(j, 1);
                            break;
                        }
                    }
                                        
                    var temp = units[i];
                    units.splice(i, 1);
                    i--;
                    delete temp;
                }
			}
            else if (units[i].what == 'building')
            {
            	if(units[i].fighting)
                	units[i].fight(ms); 
                                        
                if(units[i].destroying(ms)){
				console.log('bubu');
                	if(units[i].GetClass().GetType() == BuildingType.MAIN){
						
						var text='';
						var title='';
						
						if(units[i].GetClass().GetSide() == current_game.player1_side_id)
						{
						//zapis do bazy danych
							title = 'You have lost.';
							text = 'Sorry, You have lost. Try again!';
						}
						else
						{
							title = 'You have won!';
							text = 'Congratulations!';						
						}
						
						mainWindow = new Messi(text+'<br/><br/><a onclick="continuee();" ><img src="images/btn_continue.png" title="Continue"/></a>',
											{
												title:title,		
												modal: true,
												closeButton: false,
												width: 'auto'											
											}											
										);
						running_game = false;
                    }
                    if (selected_units[0] == units[i]) {
                    	selected_units.splice(0, 1);
                    }
                    
					var temp = units[i];
                    units.splice(i, 1);
                    i--;
                    current_map.b_tiles = buildings_tiles();
                    update_build_map();
                    build_graph();
                    delete temp;
            	}                       
        	}
        }
		else
		{
			var temp = units[i];
            units.splice(i, 1);
            i--;
            delete temp;
		}
    }

    /**
    * Checking if mouse is withing buttons rect to show hint etc.
    */
    for (var b in buttons)
    {
        if (buttons[b].visible)
        {
            if (Calc.in_rect(mouse_pos.x, mouse_pos.y, buttons[b].GetRect()))
            {
                buttons[b].show_hint = true;
            }
            else
            {
                buttons[b].show_hint = false;
            }
        }
    }
    
    
    
    
    
    function hide_buttons()
    {
        buttons['build_kwarrior'].visible = false;
        buttons['build_karcher'].visible = false;
        buttons['build_kknight'].visible = false;
        buttons['build_kpaladin'].visible = false;
        
        buttons['build_swarrior'].visible = false;
        buttons['build_sarcher'].visible = false;
        buttons['build_sknight'].visible = false;
        buttons['build_smonk'].visible = false;
                buttons['build_farm'].visible = false;
            buttons['build_woodcutter'].visible = false;
            buttons['build_ktower'].visible = false;
            buttons['build_kbarracks'].visible = false;
            buttons['build_kgoldmine'].visible = false;
            
            buttons['build_temple'].visible = false;
            buttons['build_mason'].visible = false;
            buttons['build_stower'].visible = false;
            buttons['build_sbarracks'].visible = false;
            buttons['build_sgoldmine'].visible = false;
            
        //buttons['destroy_building'].visible = false;
        //buttons['building_health'].visible = false;
    }

    /** 
    * Drawing menu buttons when necessary
    */
    if (selected_units.length == 1 && selected_units[0].what == 'building')
    {
        hide_buttons();
        
        buttons['destroy_building'].visible = true;
        buttons['building_health'].visible = true;

        // if barracks are selected
        if (selected_units[0].building_class.GetType() == BuildingType.BARRACKS && selected_units[0].construction_progress >= 100)
        {
            if (current_game.player1_side_id == GameSide.KNIGHTS)
            {
                buttons['build_kwarrior'].visible = true;
                buttons['build_karcher'].visible = true;
                buttons['build_kknight'].visible = true;
                buttons['build_kpaladin'].visible = true;
            }
            else if (current_game.player1_side_id == GameSide.SKELETONS)
            {
                buttons['build_swarrior'].visible = true;
                buttons['build_sarcher'].visible = true;
                buttons['build_sknight'].visible = true;
                buttons['build_smonk'].visible = true;
            }
        }
        
        // if main building is selected
        else if (selected_units[0].building_class.GetType() == BuildingType.MAIN && selected_units[0].construction_progress >= 100)
        {
            buttons['destroy_building'].visible = false;
            
            if (current_game.player1_side_id == GameSide.KNIGHTS)
            {
                buttons['build_farm'].visible = true;
                buttons['build_woodcutter'].visible = true;
                buttons['build_ktower'].visible = true;
                buttons['build_kbarracks'].visible = true;
                buttons['build_kgoldmine'].visible = true;
            }
            else if (current_game.player1_side_id == GameSide.SKELETONS)
            {
                buttons['build_temple'].visible = true;
                buttons['build_mason'].visible = true;
                buttons['build_stower'].visible = true;
                buttons['build_sbarracks'].visible = true;
                buttons['build_sgoldmine'].visible = true;
            }

        }
        else
        {
            hide_buttons();
            /*
            buttons['build_farm'].visible = false;
            buttons['build_woodcutter'].visible = false;
            buttons['build_ktower'].visible = false;
            buttons['build_kbarracks'].visible = false;
            buttons['build_kgoldmine'].visible = false;
            
            buttons['build_temple'].visible = false;
            buttons['build_mason'].visible = false;
            buttons['build_stower'].visible = false;
            buttons['build_sbarracks'].visible = false;
            buttons['build_sgoldmine'].visible = false;*/
            
        }
    }
    else
    {
        hide_buttons();
                buttons['destroy_building'].visible = false;
        buttons['building_health'].visible = false;
    }
    
    /**
    * Worker's path
    */
    /*
    for(u in units)
    {
        if(units[u] && units[u].what == 'unit' && units[u].unit_class.GetType() == UnitType.WORKER)
        {
            if (units[u].road.length == 0)
            {
                units[u].rest_time += (ms * config.fps);
                
                if (units[u].rest_time > 100)
                {
                    units[u].workers_job.reverse();
                    var path = dijkstra.find_path(graph, units[u].workers_job[0], units[u].workers_job[1]);
                    
                    units[u].road = path;
                    
                    units[u].rest_time = 0;
                    
                    if(units[u].at_home == false)
                    {        
                        var material_id = units[u].workers_dest;
                        
                        if (material_id > -1) 
                        {
                            // add material
                            current_game.material++;
                            
                            units[material_id].supply -= 30;

                            if (units[material_id].supply <= 0)
                            {
                                delete units[material_id];

                                // gotta find another material source
                                find_workers_path(units[u]);
                            }

                        }
                    }
                    
                    units[u].at_home = !units[u].at_home;
                }
            }
            
            
        }
    }
    */

    collect_material(ms);
    collect_gold(ms);
    collect_food(ms);
    
    /**
    * Updating building construction
    */
    
    for (b in units)
    {
        if (units[b] && units[b].what == 'building')
        {
            if (units[b].construction_progress < 100)
            {
                //console.log(ms);
                if (units[b].building_class != null)
                {
                                        var diff_x = 1;
                                        var diff_y = 1;                                 
                                        
                                        switch(units[b].building_class.GetSide())
                                        {
                                                case GameSide.SKELETONS:
                                                        diff_x = current_map.skeletons_start_x - units[b].x;
                                                        diff_y = current_map.skeletons_start_y - units[b].y;
                                                        break;
                                                        
                                                case GameSide.KNIGHTS:
                                                        diff_x = current_map.knights_start_x - units[b].x;
                                                        diff_y = current_map.knights_start_y - units[b].y;                                              
                                                        break;                                          
                                        }
                                        var w = diff_x / (current_map.width);
                                        var h = diff_y / (current_map.height);
                                        var multi = 1-Math.sqrt(h*h+w*w);
                        
                    units[b].construction_progress += (ms * config.fps / units[b].building_class.construction_time)*multi;
                }
                else
                {
                    console.log(units[b] + ' buildingclass is null.');
                }
            }
            else if (units[b].construction_progress >= 100 && units[b].worker == null)
            {
                // creating unit associated with the building
                
                if (units[b].building_class.GetType() == BuildingType.MATERIAL && units[b].building_class.GetSide() == GameSide.KNIGHTS)
                {
                    var u = new Unit(unit_knights_worker);
                    var tile = get_tile_key(units[b].x + units[b].building_class.size[0], units[b].y + units[b].building_class.size[1]);
                    u.SetTile(tile);
                    u.workers_job[0] = tile;
                    units.push(u);
                    units[b].worker = u;
                    
                    //find_workers_path(u);
                }
                
                
                
            }
        }
    }
    
    // Unit training
    
     for (b in units)
     {
        if(units[b] && units[b].what == 'building' && units[b].building_class.GetType() == BuildingType.BARRACKS)
        {
            if (units[b].units_queue.length > 0)
            {
                current_game.unit_training_ms += ms;
                
                break;
            }     
        }
     }
    
    //if (current_game.units_queue.length > 0)
    {
        
        /**
        * Next class of units is ready!
        */
        if (current_game.unit_training_ms > 3)
        {
            // find barracks
            
            var b_x = 0;
            var b_y = 0;
            
            for (b in units)
            {
                if(units[b] && units[b].what == 'building' && units[b].building_class.GetType() == BuildingType.BARRACKS)
                {
                    var ran = Math.random();
                    var decide = Math.random();
                    
                    if(decide < 0.3)
                    {
                        //bottom
                        b_x = units[b].x + Math.floor(ran * units[b].building_class.size[0]);
                        b_y = units[b].y + units[b].building_class.size[1];
                      //  b_x = units[b].x;
                       // b_y = units[b].y;    
                    }
                    else if(decide < 0.7)
                    {
                        // right
                        b_x = units[b].x + units[b].building_class.size[0];
                        b_y = units[b].y + Math.floor(ran * units[b].building_class.size[1]);
                      //  b_x = units[b].x + units[b].building_class.size[0];
                        //b_y = units[b].y + units[b].building_class.size[1];    
                    }
                    else
                    {
                        // bottom right
                        b_x = units[b].x + units[b].building_class.size[0];
                        b_y = units[b].y + units[b].building_class.size[1];    
                    }   
                    
                    //break;
                    
                    // adding unit!
                    if (units[b].units_queue.length > 0)
                    {
                        // fuck yeah unit is ready
                        var u = new Unit(units[b].units_queue[0].unitclass);
                        u.SetTile(get_tile_key(b_x, b_y));    
                        units.push(u);

                        units[b].units_queue.shift();
                        units[b].units_in_training--;
    
                        // sending a message
                        //u.use_class = units[b].units_queue[0].unitclass.GetLabel();
                        
                        var str_u = {
                            use_class : u.unit_class.GetLabel(),
                            hash : u.hash,
                            x : u.x,
                            y : u.y
                        };
                        
                        var tmp = JSON.stringify(str_u);
                        var url = config.PATH + 'index.php?id=add_unit';
        
                        $.ajax({ type: "POST", url: url, cache: false, async: true, data: { hash: game_data.hash2, json: tmp } });
                    }
                    
                }
                
            }
            
            current_game.unit_training_ms = 0;
            
            
        }       
    }
    
    
    
    
};


// render

var main = function (){
	if(running_game)
	{
		var now = Date.now();
		var delta = now - then;

		if (GameState.loaded == true)
		{
			update(delta / 1000);

			View.move();

			//if (Date.now() - current_game.tiles_drawing_time > 2)
			{
				render();
			}
			current_game.tiles_drawing_time = Date.now();
		}
		else
		{
			draw_load_screen(); 
			
			load_game();
			
			
		}
		then = now;
	}
};

var then = Date.now();
setInterval(main, 1000/50);

setInterval(query_server, 1000);
