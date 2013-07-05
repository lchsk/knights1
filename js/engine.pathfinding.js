

/**
* Finding tiles that should be omitted by units
* eg. buildings, trees, stones
* 
* @returns {Array}
*/
var buildings_tiles = function(){

    var ret = [];

    for (var i = 0; i < units.length; ++i)
    {
        if (units[i] && units[i].what == 'building')
        { 
            for (var x = 0; x < units[i].building_class.size[0]; ++x)
            {
                for (var y = 0; y < units[i].building_class.size[1]; ++y)
                {
                    ret.push(parseInt(get_tile_key(units[i].x + x, units[i].y + y)));
                }    
            }   
        }
        else if (units[i] && units[i].what == 'material')
        {
            //ret.push(parseInt(get_tile_key(units[i].x, units[i].y)));
            for (var x = 0; x < units[i].material_class.size[0]; ++x)
            {
                for (var y = 0; y < units[i].material_class.size[1]; ++y)
                {
                    ret.push(parseInt(get_tile_key(units[i].x + x, units[i].y + y)));
                }    
            } 
        }
    }
    
    // add mountain tiles
    
    ret = ret.concat(current_map.tiles_excluded_from_graph);

    return ret;
}

function update_build_map()
{
    for (var i = 0; i < config.map_tiles_w * config.map_tiles_h; ++i)
    {
        current_map.build_map[i] = 0;
		//and my map -ss
		current_map.build_map_with_unit[i] = 0;
    }
    
    for (var i = 0; i < current_map.b_tiles.length; ++i)
    {
        current_map.build_map[current_map.b_tiles[i]] = 1;
		//and my map -ss
		current_map.build_map_with_unit[current_map.b_tiles[i]] = 1;
    }	
}

/*
graph = {
a: {b: 10, d: 1},
b: {a: 1, c: 1, e: 1},
c: {b: 1, f: 1},
d: {a: 1, e: 1, g: 1},
e: {b: 1, d: 1, f: 1, h: 1},
f: {c: 1, e: 1, i: 1},
g: {d: 1, h: 1},
h: {e: 1, g: 1, i: 1},
i: {f: 1, h: 1}
};*/

var build_graph = function()
{
    b_tiles = current_map.b_tiles;
    
    // All links
    for (var m = 0; m < config.map_tiles_w; m++)
    {
        for (var n = 0; n < config.map_tiles_h; n++)
        {
            var items = {};

            var key = get_tile_key(m, n);

            var key_top = get_tile_key(m - 1, n);
            var key_left = get_tile_key(m, n - 1);
            var key_right = get_tile_key(m, n + 1);
            var key_bottom = get_tile_key(m + 1, n);


            if ($.inArray(key_top, b_tiles) == -1)
                items[key_top] = 1;

            if ($.inArray(key_bottom, b_tiles) == -1)
                items[key_bottom] = 1;

            if ($.inArray(key_left, b_tiles) == -1)
                items[key_left] = 1;

            if ($.inArray(key_right, b_tiles) == -1)
                items[key_right] = 1;

            if ($.inArray(key, b_tiles) >= 0)
                graph[key] = {};
            else
                graph[key] = items;
        }
    }

    // Removing unnecessary links from LEFT edge
    for (var i = 0; i < config.map_tiles_h * config.map_tiles_w; i += config.map_tiles_w)
    {     
        var rem_key = i - 1;
        delete graph[i][rem_key];
    }

    // Removing unnecessary links from RIGHT edge
    for (var i = config.map_tiles_w - 1; i < config.map_tiles_h * config.map_tiles_w; i += config.map_tiles_w)
    {     
        var rem_key = i + 1;
        delete graph[i][rem_key];
    }

    // Removing unnecessary links from TOP edge
    for (var i = 0; i < config.map_tiles_w; i += 1)
    {     
        var rem_key = i - config.map_tiles_w;
        delete graph[i][rem_key];
    }

    // Removing unnecessary links from BOTTOM edge
    for (var i = (config.map_tiles_h - 1) * config.map_tiles_w; i < (config.map_tiles_h - 1) * config.map_tiles_w + config.map_tiles_w; i += 1)
    {     
        var rem_key = i + config.map_tiles_w;
        delete graph[i][rem_key];
    }

}