
/**
* Woocutter/mason's work
* 
* @param ms
*/
function collect_material(ms)
{
    
    
    for (var b = 0; b < units.length; ++b)
    {
        if (units[b] && units[b].what == 'building')
        {
            if (units[b].building_class.GetType() == BuildingType.MATERIAL)
            {
                
                // woodcutter/mason position
                var bx = units[b].x;
                var by = units[b].y;       
                    
                    // check if worker has a target
                    if (units[b].target_status == -1)
                    {
                        // gotta find target
                        
                        if (current_game.player1_side_id == GameSide.KNIGHTS)
                            var look_for = 'tree';
                        else if (current_game.player1_side_id == GameSide.SKELETONS)
                            var look_for = 'stone';
                        else
                            var look_for = '';
                        
                        var closest_material = 100;
                        var target = -100;
            
                        
                        // looking for closest available material source
                        for (var m = 0; m < units.length; ++m)
                        {
                            if (units[m] && typeof units[m] != 'undefined' && units[m].what == 'material' && units[m].visible == true)
                            {
                                if (units[m].material_class.type == look_for)
                                {
                                    // compute distance
                                    
                                    var ux = units[m].x;
                                    var uy = units[m].y;
                                    
                                    var dist = Math.sqrt(Math.pow(Math.abs(ux - bx), 2) + Math.pow(Math.abs(uy - by), 2));    
                                    
                                    if (dist <= closest_material)
                                    {
                                        closest_material = dist;
                                        target = units[m];
                                        
                                    }
                                }
                            }
                        }
                        
                        // check if found sth
                        if (closest_material < GameConst.furthest_possible_material)
                        {
                            // found
                            units[b].target = target;
                            units[b].target_status = 1;
                            units[b].target_distance = closest_material;
                        }
                        else
                        {
                            units[b].target = null;
                            units[b].target_status = -100;
                            
                            if (current_game.player1_side_id == GameSide.KNIGHTS && units[b].unit_class.GetSide() == GameSide.KNIGHTS)
                            {
                                popups['no_wood_for_woodcutter'].show();
                            }
                                
                            else if (current_game.player1_side_id == GameSide.SKELETONS && units[b].unit_class.GetSide() == GameSide.SKELETONS)
                            {
                                popups['no_stone_for_mason'].show();
                            }
                                
                        }
                        console.log(units[b].target + " " + closest_material);
                    }
                    else if(units[b].target_status == 1 && units[b].construction_progress >= 100)
                    {
                        // just work!
                        units[b].work_ms += (ms / 1000 + units[b].target_distance / 1000);
                        
                        if (units[b].work_ms > GameConst.worker_period)
                        {
                            units[b].work_ms = 0;
                            
                            
                            if (units[b].target.what == 'material' && units[b].target.supply > 0)
                            {
                                current_game.material++;
                                console.log('work!');
                                // tree or stone
                                units[b].target.supply -= 1;
                            }
                            
                            if (units[b].target.what == 'material' && units[b].target.supply <= 0)
                            // (units[units[b].target].supply <= 0)
                            {
                                //var tm = units[b].target;
                                units[b].target.visible = false;
                                
                                //delete units[tm];
                                
                                units[b].target = null; // gotta find new source 
                                units[b].target_status = -1;	
                            }
                        }
                    }
                
            }       
        }
        
    }
}