
/**
* Farm / tmeple work
* 
* @param ms
*/
function collect_food(ms)
{
    
    
    for (var b = 0; b < units.length; ++b)
    {
        if (units[b] && units[b].what == 'building')
        {
            if (units[b].building_class.GetType() == BuildingType.FARM)
            {              
                // goldmine position
                var bx = units[b].x;
                var by = units[b].y;       
                    
                   
                    if(units[b].construction_progress >= 100)
                    {
                        // just work!
                        units[b].work_ms += (ms / 10);
                        
                        if (units[b].work_ms > GameConst.farm_period)
                        {
                            units[b].work_ms = 0;
                               
                            //console.log('goldmine work');
                            current_game.food++;    
                        }
                    }
                
            }       
        }
        
    }
}