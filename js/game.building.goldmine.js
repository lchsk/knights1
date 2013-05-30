
/**
* Goldmine work
* 
* @param ms
*/
function collect_gold(ms)
{
    
    
    for (var b = 0; b < units.length; ++b)
    {
        if (units[b] && units[b].what == 'building')
        {
            if (units[b].building_class.GetType() == BuildingType.GOLDMINE)
            {
                
                // goldmine position
                var bx = units[b].x;
                var by = units[b].y;       
                    
                    // check if worker has a target
                    if (units[b].target_status == -1)
                    {
                        // gotta find target
                       
                        var closest_material = 100;
                        var target = -100;
                        
                        var mountains_layer = current_map.GetLayers()[current_map.moutains_layer - 1];
                       
                        // looking for closest mountains
                        
                        var map_x1 = Calc.constrain(bx - GameConst.furthest_possible_gold, 0, config.map_tiles_w - 1);
                        var map_y1 = Calc.constrain(by - GameConst.furthest_possible_gold, 0, config.map_tiles_h - 1);
                        
                        var map_x2 = Calc.constrain(bx + GameConst.furthest_possible_gold, 0, config.map_tiles_w - 1);
                        var map_y2 = Calc.constrain(by + GameConst.furthest_possible_gold, 0, config.map_tiles_h - 1);
                        
                        //console.log (map_x1 + " " + map_y1 + " " + map_x2 + " " + map_y2);
                        
                        var found = false;
                        
                        for (var i = map_x1; i < map_x2; ++i)
                        {
                            for (var j = map_y1; j < map_y2; ++j)
                            {
                                if (mountains_layer.data[i * config.map_tiles_w + j] != 0)
                                {
                                    // found me some mountains
                                    //console.log(i + " " + j);
                                    target = mountains_layer.data[i * config.map_tiles_w + j];
                                    //console.log (i + " " + config.map_tiles_w + " " + j);
                                    
                                    found = true;
                                    break;
                                }
                            }
                            
                            if (found)
                                break;
                        }
                        
                        if ( ! found)
                        {
                            popups['no_mountains_nearby'].show();
                            units[b].target = null;
                            units[b].target_status = -100;
                        }
                        else
                        {
                            units[b].target = target;
                            units[b].target_status = 1;
                        }
                        
                        
                    }
                    else if(units[b].target_status == 1 && units[b].construction_progress >= 100)
                    {
                        // just work!
                        units[b].work_ms += (ms / 7);
                        
                        if (units[b].work_ms > GameConst.goldmine_period)
                        {
                            units[b].work_ms = 0;
                               
                            //console.log('goldmine work');
                            current_game.gold++;    
                        }
                    }
                
            }       
        }
        
    }
}