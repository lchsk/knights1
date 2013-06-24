


var CurrentMap = function()
{
    // deprecated
    var map = null;

    // context
    var ctx = this;

    // array holding each layer of the map
    // access by layers[0].data
    var layers = null;
    
    // fog of war
    this.fog = [];
    this.fog_w = -1;
    this.fog_h = -1;
    
    // map holding data used while building sth
    // has to be later modified (buildings, trees etc. data)
    // 
    this.build_map = null;
    //this map holds this same whats upper map  plus unit position - ss
    this.build_map_with_unit = null;
    
    this.b_tiles = null;

    this.GetMap = function(){
        return map;
    }

    this.SetMap = function(m){
        map = m;
    }

    this.GetLayers = function(){
        return layers;
    }

    this.SetLayers = function(m){
        layers = m;
    }

    /**
    * Tiles
    */
    this.width = 0;
    this.height = 0;
    
    // which layer holds moutain data
    this.moutains_layer = 3;
    this.water_layer = 4;
    
    // misc stuff
    this.obstacles_layer = 6;
    this.bridge_layer = 5;
    
    // trees, stones
    this.materials_layer = 7;
    
    this.tiles_excluded_from_graph = [];

    /**
    * Starting Properties
    */
    this.gold = 0;
    this.food = 0;
    this.material = 0;
    this.knights_start_x = 0;
    this.knights_start_y = 0;
    this.skeletons_start_x = 0;
    this.skeletons_start_y = 0;


    this.init = function(){
        var url = config.PATH + "data/map3.dat";
        var callback = function(data)
        {
            var json = $.parseJSON(data);

            ctx.SetMap(json.map.items.data);

        }

        $.ajax({ url: url, cache: false, async: false }).done(callback);    
    }
    
    var moutain_tiles = [
                        882, 620, 792, 793, 793, 793, 793, 793, 793, 793, 795, 969, 970,                  927, 665, 666, 667, 666, 667, 666, 666, 666, 666, 667, 1014, 1015,                  972, 710, 883, 620, 621, 622, 623, 624, 625, 626, 627, 886, 887,                   927, 928, 665, 666, 667, 668, 669, 670, 671, 672, 931, 932,                   972, 973, 710, 711, 712, 713, 714, 715, 716, 717, 976, 977,                     755, 756, 757, 758, 759, 760, 761, 762,                       800, 801, 802, 803, 804, 805, 806, 807,                                                                                                                                                                                                                                                    571, 572, 573, 571, 572, 573, 574,          571,   574,           616, 617, 618, 616, 617, 618, 619, 970,              925,         661, 662, 663, 661, 662, 663, 664, 1015,                       621, 707, 708, 707, 708, 623, 668, 887,                       883, 620, 621, 622, 623, 886, 713, 932,                       928, 665, 666, 667, 668, 931, 932,                        973, 710, 711, 712, 713, 976, 977,                         755, 756, 757, 758,                           800, 801, 802, 803,                                                      
    ];
    
    var water_tiles = [                                                                                                                                                                                                                                                                                      221, 222, 222, 222, 223,                         221, 311, 311, 267, 358, 311, 311, 311, 223,                     537, 311, 267,     265, 311, 311, 311, 538,                  221, 311, 492,       311, 311, 311, 311, 311, 538,   221, 222, 222, 222, 313, 222, 222, 313, 221, 222, 313, 313, 313, 311, 176,        265, 311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 266, 266, 266, 266, 266, 311, 266, 359, 359, 266, 266, 267,          265, 359, 266, 266, 266, 359, 359, 359, 267,      492,                                                                                                                                                                                                                                                                                                           ];
    
    var obstacles_tiles = [                                                                                                                                                    94,     860,                              905,                                        50, 50,                                                                                                                         480, 481,                                                482, 483,                                                                 543,                              588,                             5, 633, 5,                             5,                             94,                                                         94,                                                                                                                ];

    /**
    * Loads map created in Tiled
    */
    this.load_map_from_tiled = function(filename){

        var url = config.PATH + "data/" + filename;
        var callback = function(data)
        {
            var json = $.parseJSON(data);

            var layers = json.layers;

            
            ctx.SetLayers(layers);

            config.map_tiles_w = json.width;
            config.map_tiles_h = json.height;

            ctx.width = json.width;
            ctx.height = json.height;

            // loading properties
            ctx.food = parseInt(json.properties.food);
            ctx.material = parseInt(json.properties.material);
            ctx.gold = parseInt(json.properties.gold);
            ctx.knights_start_x = parseInt(json.properties.knights_start_x);
            ctx.knights_start_y = parseInt(json.properties.knights_start_y);
            ctx.skeletons_start_x = parseInt(json.properties.skeletons_start_x);
            ctx.skeletons_start_y = parseInt(json.properties.skeletons_start_y);
            
            

            current_game.food = ctx.food;
            current_game.material = ctx.material;
            current_game.gold = ctx.gold;
            
            // build map
            ctx.build_map = layers[0];
            
            //copy build_map to build_map_with_unit - ss
            ctx.build_map_with_unit = {};
            for (var i in ctx.build_map)
                ctx.build_map_with_unit[i] = ctx.build_map[i];
            
            
            for (var i = 0; i < config.map_tiles_w * config.map_tiles_h; ++i)
            {
                ctx.build_map[i] = 0;
                ctx.build_map_with_unit[i] = 0;
            }
            
            // fog
            //for (var i = 0; i < Math.ceil(config.map_tiles_w * config.map_tiles_h); ++i)
            
            ctx.fog_w = Math.ceil(config.map_tiles_h / 1);
            ctx.fog_h = Math.ceil(config.map_tiles_w / 1);
            
            for (var i = 0; i <= ctx.fog_w; ++i)
            {
                ctx.fog[i] = [];
                
                for (var j = 0; j <= ctx.fog_h; ++j)
                {
                    ctx.fog[i][j] = 0;
                }
            }
            
            //ctx.fog[0][0] = -1;
            
            
            
            var remove_fog_from_start = function()
            {
                var t_i = Math.floor(ctx.knights_start_x / 3) - 1;
                var t_j = Math.floor(ctx.knights_start_y / 3) - 1;
            
                
                
                for (var i = t_i; i < t_i + 4; ++i)
                {
                    for (var j = t_j; j < t_j + 4; ++j)
                    {
                        if (i >= 0 && j >= 0 && i < ctx.fog_w && j < ctx.fog_h)
                            ctx.fog[i][j] = -1;        
                    }
                }
            }
            
            remove_fog_from_start();
            
            /*// remove fog of war from starting point
            ctx.fog[0] = -1;
            ctx.fog[1] = -1;
            ctx.fog[3] = -1;
            
            ctx.fog[7] = -1;
            ctx.fog[30] = -1;
            var ttt = ctx.knights_start_y * 45 + ctx.knights_start_x + 1;
            
            //alert(ttt);
            //ctx.fog[18] = -1;
            ctx.fog[141] = -1;*/
            
            // get positionf of mountain tiles and exclude them from the graph
            for (var i = 0; i < config.map_tiles_w * config.map_tiles_h; ++i)
            {
                // mountains
                
                if ($.inArray(layers[ctx.moutains_layer - 1].data[i], moutain_tiles) >= 0)
                {
                    ctx.tiles_excluded_from_graph.push(i);
                }
                
                // water
                
                if ($.inArray(layers[ctx.water_layer - 1].data[i], water_tiles) >= 0)
                {
                    // check if theres a bridge over troubled water
                    
                    if (layers[ctx.bridge_layer - 1].data[i] == 0)
                        ctx.tiles_excluded_from_graph.push(i);
                }
                
                // obstacles
                
                if ($.inArray(layers[ctx.obstacles_layer - 1].data[i], obstacles_tiles) >= 0)
                {
                    ctx.tiles_excluded_from_graph.push(i);
                }       
            }  
            
            // mark that the map is loaded
            GameState.map_loaded = true; 
        }

        $.ajax({ url: url, cache: false, async: false }).done(callback);
    }
    
    /**
    * Loads materials (trees, stones) from map to the list
    */
    this.load_materials = function(materials_classes, materials_list){
        
        /*for (var u in materials_classes)
        {
            var m = get_tilesheet_tile (materials_classes[u].tilesheet_pos[0], materials_classes[u].tilesheet_pos[1]);
            console.log(m + 1);
        }*/
        
        
        for (var i = 0; i < config.map_tiles_w * config.map_tiles_h; ++i)
        { 
            for (var u in materials_classes)
            {
                //console.log(materials_classes[u].tilesheet_pos);
                var m = get_tilesheet_tile (materials_classes[u].tilesheet_pos[0], materials_classes[u].tilesheet_pos[1]);
                m += 1;
                //console.log(layers[ctx.materials_layer - 1].data[i]);
                
                if (layers[ctx.materials_layer - 1].data[i] == m)
                {
                    var pos = get_tile_by_key(i);
                    materials_list.push(new Material(Materials[u], pos[1], pos[0]));
                }
            }
        }
    }
     

    /**
    * Returns information on direction if going from tile_key1 to tile_key2
    * Returns Direction object
    */
    this.get_direction = function (tile_key1, tile_key2){

        if (tile_key2 == tile_key1 - config.map_tiles_w)
            return Direction.N;

        if (tile_key2 == tile_key1 + 1)
            return Direction.E;

        if (tile_key2 == tile_key1 + config.map_tiles_w)
            return Direction.S;

        if (tile_key2 == tile_key1 - 1)
            return Direction.W;

        return -1;
    }
}

// without trees & stones layer
var render_layers = 6;