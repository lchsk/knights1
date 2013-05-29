
// Buttons callbacks definitions
function destroy_building(){}

function get_hint_message(name)
{
    // Knights
    
    if (name == 'farm')
        return "Build a farm (" + prices[name].gold + " gold, " + prices[name].material  + " timber)";
    else if (name == 'woodcutter')
        return "Build a woodcutter's hut (" + prices[name].gold + " gold, " + prices[name].material  + " timber)";
    else if (name == 'kbarracks')
        return "Build barracks (" + prices[name].gold + " gold, " + prices[name].material  + " timber)";
    else if (name == 'kgoldmine')
        return "Build gold mine (" + prices[name].gold + " gold, " + prices[name].material  + " timber)";
    else if (name == 'ktower')
        return "Build tower (" + prices[name].gold + " gold, " + prices[name].material  + " timber)";
    
    // Skeletons    
        
    else if (name == 'temple')
        return "Build a temple (" + prices[name].gold + " gold, " + prices[name].material  + " stone)";
    else if (name == 'mason')
        return "Build a mason's hut (" + prices[name].gold + " gold, " + prices[name].material  + " stone)";
    else if (name == 'sbarracks')
        return "Build barracks (" + prices[name].gold + " gold, " + prices[name].material  + " stone)";
    else if (name == 'sgoldmine')
        return "Build gold mine (" + prices[name].gold + " gold, " + prices[name].material  + " stone)";
    else if (name == 'stower')
        return "Build tower (" + prices[name].gold + " gold, " + prices[name].material  + " stone)";
        
    // Units
    
    // Skeletons    
        
    else if (name == 'kwarrior')
        return "Recruit a warrior (" + prices[name].gold + " gold, " + prices[name].food  + " food)";
    else if (name == 'karcher')
        return "Recruit an archer (" + prices[name].gold + " gold, " + prices[name].food  + " food)";
    else if (name == 'kknight')
        return "Recruit a knight (" + prices[name].gold + " gold, " + prices[name].food  + " food)";
    else if (name == 'kpaladin')
        return "Recruit a paladin (" + prices[name].gold + " gold, " + prices[name].food  + " food)";
 
        
    else
        return '';
}


// Gui Position
var box_x = 10;
var box_y = View.height - 65;

function load_buttons(buttons)
{
    var buttons = {};


var btn_destroy = new Button(100, 100, 39, 39, "Destroy this building");
btn_destroy.SetImage(0, GameSprites.btn_destroy);
btn_destroy.x = box_x + 45;
btn_destroy.y = box_y - 45;
btn_destroy.click = destroy_building;
buttons['destroy_building'] = btn_destroy;

btn_health = new Button(100, 100, 39, 39, "Health");
btn_health.SetImage(0, GameSprites.btn_clear);
btn_health.x = box_x;
btn_health.y = box_y - 45;
buttons['building_health'] = btn_health;

btn_ok = new Button(100, 100, 42, 41, "OK");
btn_ok.SetImage(0, GameSprites.btn_ok);
buttons['btn_ok'] = btn_ok;

// Buildings Buttons

/*
btn_farm = new Button(100, 100, 97, 98, get_hint_message('farm'));
btn_farm.SetImage(0, GameSprites.btn_farm);
btn_farm.x = box_x + 145;
btn_farm.y = box_y - 40;
btn_farm.click = function(){ build('farm') };
buttons['build_farm'] = btn_farm;
*/

// Knights

buttons['build_farm'] = new Button(100, 100, 97, 98, get_hint_message('farm'));
buttons['build_farm'].SetImage(0, GameSprites.btn_farm);
buttons['build_farm'].click = function(){ build('farm') };
buttons['build_farm'].x = box_x + 145;
buttons['build_farm'].y = box_y - 40;

buttons['build_woodcutter'] = new Button(100, 100, 97, 98, get_hint_message('woodcutter'));
buttons['build_woodcutter'].SetImage(0, GameSprites.btn_woodcutter);
buttons['build_woodcutter'].click = function(){ build('woodcutter') };
buttons['build_woodcutter'].x = box_x + 245;
buttons['build_woodcutter'].y = box_y - 40;

buttons['build_kgoldmine'] = new Button(100, 100, 97, 98, get_hint_message('kgoldmine'));
buttons['build_kgoldmine'].SetImage(0, GameSprites.btn_kgoldmine);
buttons['build_kgoldmine'].click = function(){ build('kgoldmine') };
buttons['build_kgoldmine'].x = box_x + 345;
buttons['build_kgoldmine'].y = box_y - 40;

buttons['build_ktower'] = new Button(100, 100, 97, 98, get_hint_message('ktower'));
buttons['build_ktower'].SetImage(0, GameSprites.btn_ktower);
buttons['build_ktower'].click = function(){ build('ktower') };
buttons['build_ktower'].x = box_x + 445;
buttons['build_ktower'].y = box_y - 40;

buttons['build_kbarracks'] = new Button(100, 100, 97, 98, get_hint_message('kbarracks'));
buttons['build_kbarracks'].SetImage(0, GameSprites.btn_kbarracks);
buttons['build_kbarracks'].click = function(){ build('kbarracks') };
buttons['build_kbarracks'].x = box_x + 545;
buttons['build_kbarracks'].y = box_y - 40;

// Skeletons

buttons['build_temple'] = new Button(100, 100, 97, 98, get_hint_message('temple'));
buttons['build_temple'].SetImage(0, GameSprites.btn_temple);
buttons['build_temple'].click = function(){ build('temple') };
buttons['build_temple'].x = box_x + 145;
buttons['build_temple'].y = box_y - 40;

buttons['build_mason'] = new Button(100, 100, 97, 98, get_hint_message('mason'));
buttons['build_mason'].SetImage(0, GameSprites.btn_mason);
buttons['build_mason'].click = function(){ build('mason') };
buttons['build_mason'].x = box_x + 245;
buttons['build_mason'].y = box_y - 40;

buttons['build_sgoldmine'] = new Button(100, 100, 97, 98, get_hint_message('sgoldmine'));
buttons['build_sgoldmine'].SetImage(0, GameSprites.btn_sgoldmine);
buttons['build_sgoldmine'].click = function(){ build('sgoldmine') };
buttons['build_sgoldmine'].x = box_x + 345;
buttons['build_sgoldmine'].y = box_y - 40;

buttons['build_stower'] = new Button(100, 100, 97, 98, get_hint_message('stower'));
buttons['build_stower'].SetImage(0, GameSprites.btn_stower);
buttons['build_stower'].click = function(){ build('stower') };
buttons['build_stower'].x = box_x + 445;
buttons['build_stower'].y = box_y - 40;

buttons['build_sbarracks'] = new Button(100, 100, 97, 98, get_hint_message('sbarracks'));
buttons['build_sbarracks'].SetImage(0, GameSprites.btn_sbarracks);
buttons['build_sbarracks'].click = function(){ build('sbarracks') };
buttons['build_sbarracks'].x = box_x + 545;
buttons['build_sbarracks'].y = box_y - 40;



// Units buttons

buttons['build_kwarrior'] = new Button(100, 100, 97, 98, get_hint_message('kwarrior'));
buttons['build_kwarrior'].SetImage(0, GameSprites.btn_kwarrior);
buttons['build_kwarrior'].click = function(){ train_unit('kwarrior'); };
buttons['build_kwarrior'].x = box_x + 145;
buttons['build_kwarrior'].y = box_y - 40;

buttons['build_karcher'] = new Button(100, 100, 97, 98, get_hint_message('karcher'));
buttons['build_karcher'].SetImage(0, GameSprites.btn_karcher);
buttons['build_karcher'].click = function(){ train_unit('karcher'); };
buttons['build_karcher'].x = box_x + 245;
buttons['build_karcher'].y = box_y - 40;

buttons['build_kknight'] = new Button(100, 100, 97, 98, get_hint_message('kknight'));
buttons['build_kknight'].SetImage(0, GameSprites.btn_kknight);
buttons['build_kknight'].click = function(){ train_unit('kknight'); };
buttons['build_kknight'].x = box_x + 345;
buttons['build_kknight'].y = box_y - 40;

buttons['build_kpaladin'] = new Button(100, 100, 97, 98, get_hint_message('kpaladin'));
buttons['build_kpaladin'].SetImage(0, GameSprites.btn_kpaladin);
buttons['build_kpaladin'].click = function(){ train_unit('kpaladin'); };
buttons['build_kpaladin'].x = box_x + 445;
buttons['build_kpaladin'].y = box_y - 40;



// HUD
btn_gold = new Button(config.view_width - 200, 0, 32, 32, "Gold");
btn_gold.from_tilesheet = true;
btn_gold.tilesheet_pos = GameSprites.data.gold;
buttons['hud_gold'] = btn_gold;

btn_timber = new Button(config.view_width - 140, 0, 32, 32, "Timber");
btn_timber.from_tilesheet = true;
btn_timber.tilesheet_pos = GameSprites.data.timber;
buttons['hud_timber'] = btn_timber;

btn_food = new Button(config.view_width - 80, 0, 32, 32, "Food");
btn_food.from_tilesheet = true;
btn_food.tilesheet_pos = GameSprites.data.food;
buttons['hud_food'] = btn_food;

btn_stone = new Button(config.view_width - 140, 0, 32, 32, "Stone");
btn_stone.from_tilesheet = true;
btn_stone.tilesheet_pos = GameSprites.data.stone;
buttons['hud_stone'] = btn_stone;

btn_mana = new Button(config.view_width - 80, 0, 32, 32, "Mana");
btn_mana.from_tilesheet = true;
btn_mana.tilesheet_pos = GameSprites.data.mana;
buttons['hud_mana'] = btn_mana;

if (current_game.player1_side_id == GameSide.KNIGHTS)
{
    btn_gold.visible = true;
    btn_timber.visible = true;
    btn_food.visible = true;
    btn_stone.visible = false;
    btn_mana.visible = false;
}
else if (current_game.player1_side_id == GameSide.SKELETONS)
{
    btn_gold.visible = true;
    btn_timber.visible = false;
    btn_food.visible = false;
    btn_stone.visible = true;
    btn_mana.visible = true;
}


    return buttons;
}