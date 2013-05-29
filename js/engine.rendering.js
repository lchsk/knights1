var render = function (){

    Engine.ctx.clearRect(0, 0, config.map_width, config.map_height);
    reset_font();

    // map
    //var tiles_in_row = Math.ceil(View.width / 32) + 1;
    //var tiles_in_col = Math.ceil(View.height / 32) + 1;
    var tiles_in_row = config.view_tiles_w;
    var tiles_in_col = config.view_tiles_h;

    //alert(tiles_in_row);

    var start_x = Math.floor(View.x / config.tile_width);
    var start_y = Math.floor(View.y / config.tile_height);

    //console.log(start_x);

    var offset_x = View.x % config.tile_width; // offset on x axis
    var offset_y = View.y % config.tile_height;

    
    
    
    
    {
        //console.log('rysuj');
    for(var i = 0, x = 0; i < tiles_in_row; i++, x += config.tile_width)
    {
        for(var j = 0, y = 0; j < tiles_in_col; j++, y += config.tile_height)
        {
            try
            {
                //var coordinate_x = Calc.constrain(start_y + j, 0, config.map_tiles_w - 1);
                //var coordinate_y = Calc.constrain(start_x + i, 0, config.map_tiles_h - 1);

                //Engine.ctx.drawImage(Sprites.sprites[map[coordinate_x][coordinate_y]], x - offset_x, y - offset_y);

                // old style drawing (2-dimensinal array)
                //Engine.ctx.drawImage(Sprites.sprites[map[start_y + j][start_x + i]], x - offset_x, y - offset_y);

                //var tile_id = current_map.GetLayers()[0].data[(start_x + i) * 45 + (start_y + j)];

                for (var l = 0; l < render_layers; ++l)
                {
                    var tile_id = current_map.GetLayers()[l].data[(start_y + j) * config.map_tiles_w + (start_x + i)];    

                    if(tile_id != 0)
                    {
                        //Engine.ctx.drawImage(Sprites.sprites[map[start_y + j][start_x + i]], x - offset_x, y - offset_y);

                        var t_y = Math.floor(tile_id / config.tilesheet_columns) * config.tile_width;
                        var t_x = (tile_id % config.tilesheet_columns - 1) * config.tile_height;

                        //console.log(t_x + " " + t_y);

                        if (t_y >= 0 && t_x >= 0)
                            Engine.ctx.drawImage(GameSprites.tilesheet, t_x, t_y, config.tile_width, config.tile_height, x - offset_x, y - offset_y, config.tile_width, config.tile_height);    
                    }
                }

                //console.log(tile_id);

                //

                /**
                * Drawing tiles' coordinates
                */
                //Engine.ctx.fillText(get_tile_key(start_x + i, start_y + j), x - offset_x, y - offset_y);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
    }
    
    current_game.tiles_drawing_time = Date.now();

    // Sorting objects (characters)
    units.sort(function(a, b){return a.y > b.y});


    /**
    * Drawing buildings
    * TODO: Draw only buildings that are in the viewscreen
    */
    for (var i = 0; i < units.length; ++i)
    {
        if (units[i] && units[i].what == 'building')
        {
            if (units[i].building_class.rows_top_layer == null)
            {
                if (units[i].DrawBuilding())
                    {   
                    for (var x = 0; x < units[i].building_class.size[0]; ++x)
                    {
                        for (var y = 0; y < units[i].building_class.size[1]; ++y)
                        {
                            if (units[i].construction_progress < 100)
                            {
                                Engine.ctx.globalAlpha = units[i].construction_progress / 100;
                            }
                            
                            Engine.ctx.drawImage(GameSprites.tilesheet, (units[i].building_class.tilesheet_pos[0] + x) * config.tile_width, (units[i].building_class.tilesheet_pos[1] + y) * config.tile_height, config.tile_width, config.tile_height, units[i].x * config.tile_width - View.x + x * config.tile_width, units[i].y * config.tile_height - View.y + y * config.tile_height, config.tile_width, config.tile_height); 
                            
                            // barracks busy
                            if (units[i].building_class.GetType() == BuildingType.BARRACKS && units[i].units_in_training > 0)
                            {
                                if (Math.floor(units[i].building_class.size[0] / 2) == x && Math.floor(units[i].building_class.size[1] / 2) == y)
                                {
                                    var tx = units[i].x * config.tile_width - View.x + x * config.tile_width;
                                    var ty = units[i].y * config.tile_height - View.y + y * config.tile_height;
                                    
                                    Engine.ctx.drawImage(GameSprites.tilesheet, 20 * config.tile_width, 0 * config.tile_height, config.tile_width, config.tile_height, tx, ty, config.tile_width, config.tile_height);
                                    
                                    Engine.ctx.fillText(units[i].units_in_training, tx + 50, ty + 50); 
                                }
                            }
                            
                            if (units[i].construction_progress < 100)
                            {
                                Engine.ctx.globalAlpha = 1.0;
                                
                                // construction icon
                                if (Math.floor(units[i].building_class.size[0] / 2) == x && Math.floor(units[i].building_class.size[1] / 2) == y)
                                {
                                    Engine.ctx.drawImage(GameSprites.tilesheet, 19 * config.tile_width, 0 * config.tile_height, config.tile_width, config.tile_height, units[i].x * config.tile_width - View.x + x * config.tile_width, units[i].y * config.tile_height - View.y + y * config.tile_height, config.tile_width, config.tile_height);
                                }
                            }
                            
                            
                        }    
                    }
                }    
            }
        }
        else if (units[i] && units[i].what == 'material')
        {
            Engine.ctx.drawImage(GameSprites.tilesheet, (units[i].material_class.tilesheet_pos[0]) * config.tile_width, units[i].material_class.tilesheet_pos[1] * config.tile_height, config.tile_width, config.tile_height, units[i].x * config.tile_width - View.x, units[i].y * config.tile_height - View.y, config.tile_width, config.tile_height);
        }
    }


    /**
    * Drawing units
    * TODO: Draw only units that are within viewscreen   
    */
    for (var i = 0; i < units.length; i++)
    {
        if (units[i] && units[i].what == 'unit')
        {
            if (units[i] && units[i].unit_class.image && units[i].DrawUnit())
            {
                /**
                * Draw this if unit's selected
                */
                //if (selected_units.length == 1 && selected_units[0] == units[i])
                if ($.inArray(units[i], selected_units) > -1)
                {
                    //Engine.ctx.drawImage(GameSprites.selected_unit_image, units[i].GetCenterX() - View.x, units[i].GetCenterY() - View.y);

                    /**
                    * Drawing life strip
                    */
                    if (units[i].health > 80)
                        Engine.ctx.drawImage(GameSprites.life_strip[100], units[i].x - View.x, units[i].y - View.y); 
                    else if (units[i].health > 60)
                        Engine.ctx.drawImage(GameSprites.life_strip[80], units[i].x- View.x, units[i].y - View.y);     
                    else if (units[i].health > 40)
                        Engine.ctx.drawImage(GameSprites.life_strip[60], units[i].x - View.x, units[i].y - View.y); 
                    else if (units[i].health > 20)
                        Engine.ctx.drawImage(GameSprites.life_strip[40], units[i].x - View.x, units[i].y - View.y); 
                    else
                        Engine.ctx.drawImage(GameSprites.life_strip[20], units[i].x - View.x, units[i].y - View.y);   
                }


                //Engine.ctx.drawImage(units[i].unit_class.image, units[i].x - View.x, units[i].y - View.y);

                var tmp = units[i].get_frame();

                //Engine.ctx.drawImage(units[i].unit_class.walkcycle, tmp[0], tmp[1], units[i].width, units[i].height, units[i].x - View.x - 0, units[i].y - View.y - 0, 64, 64);
                Engine.ctx.drawImage(units[i].unit_class.walkcycle, tmp[0], tmp[1], units[i].size, units[i].size, units[i].x - View.x - 0, units[i].y - View.y - 0, units[i].size, units[i].size);
            }  
        }
    }




    /**
    * Drawing gui
    */
    // gold
    //set_font("Penshurst", 14, "255, 255, 255", "normal");

    //Engine.ctx.drawImage(GameSprites.tilesheet, btn_gold.tilesheet_pos[0] * btn_gold.w, btn_gold.tilesheet_pos * btn_gold.h, btn_gold.w, btn_gold.h, btn_gold.x, btn_gold.y, btn_gold.w, btn_gold.h);
    Engine.ctx.drawImage(GameSprites.tilesheet, btn_gold.tilesheet_pos[0] * btn_gold.w, btn_gold.tilesheet_pos[1] * btn_gold.h, btn_gold.w, btn_gold.h, btn_gold.x, btn_gold.y, btn_gold.w, btn_gold.h);

    //Engine.ctx.drawImage(GameSprites.tilesheet, GameSprites.data.gold[0] * 32, GameSprites.data.gold[1] * 32, 32, 32, config.view_width - 200, 0, 32, 32);
    Engine.ctx.fillText(current_game.gold, config.view_width - 160, 10);

    if (current_game.player1_side_id == GameSide.KNIGHTS)
    {
        // timber
        Engine.ctx.drawImage(GameSprites.tilesheet, btn_timber.tilesheet_pos[0] * btn_timber.w, btn_timber.tilesheet_pos[1] * btn_timber.h, btn_timber.w, btn_timber.h, btn_timber.x, btn_timber.y, btn_timber.w, btn_timber.h);
        //Engine.ctx.drawImage(GameSprites.tilesheet, GameSprites.data.timber[0] * 32, GameSprites.data.timber[1] * 32, 32, 32, config.view_width - 140, 0, 32, 32);
        Engine.ctx.fillText(current_game.material, config.view_width - 100, 10);  

        // food
        Engine.ctx.drawImage(GameSprites.tilesheet, btn_food.tilesheet_pos[0] * btn_food.w, btn_food.tilesheet_pos[1] * btn_food.h, btn_food.w, btn_food.h, btn_food.x, btn_food.y, btn_food.w, btn_food.h);
        //Engine.ctx.drawImage(GameSprites.tilesheet, GameSprites.data.food[0] * 32, GameSprites.data.food[1] * 32, 32, 32, config.view_width - 80, 0, 32, 32);
        Engine.ctx.fillText(current_game.food, config.view_width - 40, 10); 

        //Engine.ctx.drawImage(GameSprites.tilesheet, btn_timber.tilesheet_pos[0] * btn_timber.w, btn_timber.tilesheet_pos[1] * btn_timber.h, btn_timber.w, btn_timber.h, btn_timber.x, btn_timber.y, btn_timber.w, btn_timber.h);
    }
    else if (current_game.player1_side_id == GameSide.SKELETONS)
    {
        // stone
        //Engine.ctx.drawImage(GameSprites.tilesheet, GameSprites.data.stone[0] * 32, GameSprites.data.stone[1] * 32, 32, 32, config.view_width - 140, 0, 32, 32);
        Engine.ctx.drawImage(GameSprites.tilesheet, btn_stone.tilesheet_pos[0] * btn_stone.w, btn_stone.tilesheet_pos[1] * btn_stone.h, btn_stone.w, btn_stone.h, btn_stone.x, btn_stone.y, btn_stone.w, btn_stone.h);
        Engine.ctx.fillText(current_game.material, config.view_width - 100, 10);

        // food
        //Engine.ctx.drawImage(GameSprites.tilesheet, GameSprites.data.mana[0] * 32, GameSprites.data.mana[1] * 32, 32, 32, config.view_width - 80, 0, 32, 32);
        Engine.ctx.drawImage(GameSprites.tilesheet, btn_mana.tilesheet_pos[0] * btn_mana.w, btn_mana.tilesheet_pos[1] * btn_mana.h, btn_mana.w, btn_mana.h, btn_mana.x, btn_mana.y, btn_mana.w, btn_mana.h);
        Engine.ctx.fillText(current_game.food, config.view_width - 40, 10); 
    }


    // Building Menu
    if (selected_units.length == 1 && selected_units[0].what == 'building')
    {
        //set_font("Penshurst", 18, "0, 0, 0", "bold");

        set_font("Tahoma", 12, "0, 0, 0", "normal");
        Engine.ctx.drawImage(GameSprites.gui_box, box_x, box_y);
        Engine.ctx.fillText(selected_units[0].building_class.GetName(), box_x + 20, box_y + 20);

        // Drawing menu buttons

        for (var b in buttons)
        {
            if ( ! buttons[b].from_tilesheet && buttons[b].visible)
            {
                var img = buttons[b].images[buttons[b].state];
                Engine.ctx.drawImage(img, buttons[b].x, buttons[b].y);
            }
        }

        // Drawing building health

        if (selected_units[0].GetHealth() > 80)
            Engine.ctx.drawImage(GameSprites.life_strip[100], buttons['building_health'].x + 12, buttons['building_health'].y + 16); 
        else if (selected_units[0].GetHealth() > 60)
            Engine.ctx.drawImage(GameSprites.life_strip[80], buttons['building_health'].x + 12, buttons['building_health'].y + 16);     
        else if (selected_units[0].GetHealth() > 40)
            Engine.ctx.drawImage(GameSprites.life_strip[60], buttons['building_health'].x + 12, buttons['building_health'].y + 16); 
        else if (selected_units[0].GetHealth() > 20)
            Engine.ctx.drawImage(GameSprites.life_strip[40], buttons['building_health'].x + 12, buttons['building_health'].y + 16); 
        else
            Engine.ctx.drawImage(GameSprites.life_strip[20], buttons['building_health'].x + 12, buttons['building_health'].y + 16);


        // Rect around the building
        Engine.ctx.beginPath();
        Engine.ctx.rect(selected_units[0].x * config.tile_width - View.x, selected_units[0].y * config.tile_height - View.y, selected_units[0].building_class.size[0] * config.tile_width, selected_units[0].building_class.size[1] * config.tile_height);
        Engine.ctx.fillStyle = 'transparent';
        Engine.ctx.fill();
        Engine.ctx.lineWidth = 1;
        Engine.ctx.strokeStyle = '#999';
        Engine.ctx.stroke();

    }
    
    /**
    * Drawing selection rectangle
    * 
    */
    if (SelectionRect.on == true && SelectionRect.end_x > 0 && SelectionRect.end_y > 0)
    {
        Engine.ctx.beginPath();
        Engine.ctx.rect(SelectionRect.start_x - View.x, SelectionRect.start_y - View.y, SelectionRect.end_x - SelectionRect.start_x + View.x, SelectionRect.end_y - SelectionRect.start_y + View.y);
        //Engine.ctx.fillStyle = 'white';
        //Engine.ctx.fill();
        Engine.ctx.strokeStyle = 'white';
        Engine.ctx.stroke();
    }
    
    
    // Building highlights (during preparing to build)
    if (current_game.constructing && current_game.building_built_class)
    {
        var b_class = current_game.building_built_class;
    
        var green_light = true;
        for (var i = 0; i < b_class.size[0] + 2; ++i)
        {
            for (var j = 0; j < b_class.size[1] + 2; ++j)
            {
                // tile position of the cursor
                var w = Math.floor((mouse_pos.x + View.x) / 32) + i;
                var h = Math.floor((mouse_pos.y + View.y) / 32) + j;
            
                // where to draw on the screen
                var pos_x = w * 32 - View.x;
                var pos_y = h * 32 - (View.y);
                
                if (i == 0 && j == 0)
                {
                    current_game.construction_x = Math.floor((mouse_pos.x + View.x) / 32) + 1;
                    current_game.construction_y = Math.floor((mouse_pos.y + View.y) / 32) + 1;
                }
                
                //var tx = Math.floor((mouse_pos.x + View.x) / 32);
                //var ty = Math.floor((mouse_pos.y + View.y) / 32);
                
                var tile = h * config.map_tiles_w + w;
        
                //console.log(w + " " + h);
                
                if (current_map.build_map[tile] == 0)
                {
                    // green - can be built
                    
                    Engine.ctx.drawImage(GameSprites.tilesheet, 17 * 32, 0 * 32, 32, 32, pos_x, pos_y, 32, 32);
                }
                //else
                if (current_map.build_map[tile] == 1)
                {
                    // red - cannot be built
                    green_light = false;
                    Engine.ctx.drawImage(GameSprites.tilesheet, 18 * 32, 0 * 32, 32, 32, pos_x, pos_y, 32, 32);
                }
            }
        }
        current_game.construction_allowed = green_light;
        
    }
    

    // Hints
    for (var b in buttons)
    {
        if (buttons[b].show_hint && buttons[b].visible)
        {
            draw_hint(buttons[b]);
        }
    }

    // Popups
    for (var p in popups)
    {
        if (popups[p].visible)
            popups[p].show();
    }
}