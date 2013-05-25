
/**
* Gui Button
* 
* @param x
* @param y
* @param w
* @param h
* @param hint
*/
var Button = function(x, y, w, h, hint){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.hint = hint;

    // Is hint visible
    this.show_hint = true;
    
    // Is button visible
    this.visible = false;

    this.state = 0;
    this.images = [];
    
    // Draw this from main tilesheet
    this.from_tilesheet = false;
    this.tilesheet_pos = [];
    
    // end
    
    // Click Function
    this.click = null;

    this.GetRect = function(){
        return [this.x, this.y, this.x + this.w, this.y + this.h];
    }

    this.SetImage = function(state, img){
        //img.title = hint;
        this.images[state] = img;
        //this.images[state].title = "D";
        //this.images[state].id = "BUTTON";
    }
}


var Popup = function(message, width, height){
    
    var that = this;
    
    this.message = message;
    
    this.visible = false;
    
    this.w = width;
    this.h = height;
    
    var pos_x = (View.width - this.w) / 2;
    var pos_y = (View.height - this.h) / 2;
    
    this.show = function(){
        roundRect(Engine.ctx, pos_x, pos_y, this.w, this.h, 5, true, true, 'rgb(228, 221, 206)', 'black');
        //set_font("Penshurst", 16, "0, 0, 0", "normal");
        
        var lines = this.message.split('<br />');
        
        var tmp_y = pos_y + 20;
        for (l in lines)
        {
            Engine.ctx.fillText(lines[l], pos_x + 20, tmp_y);
            tmp_y += 20;  
        }
        
        buttons['btn_ok'].x = pos_x + this.w - buttons['btn_ok'].w - 10;
        buttons['btn_ok'].y = pos_y + this.h - buttons['btn_ok'].h - 10;
        buttons['btn_ok'].visible = true;
        buttons['btn_ok'].click = function(){
            buttons['btn_ok'].visible = false;
            that.visible = false;
        }

        var img = buttons['btn_ok'].images[buttons['btn_ok'].state];
        Engine.ctx.drawImage(img, buttons['btn_ok'].x, buttons['btn_ok'].y);
        
    }
}

/**
* Draw hintbox for gui item (eg. button)
* Gui item should have x, y properties
* 
* @param gui_item
*/
function draw_hint(gui_item)
{
    if (gui_item)
    {
        var len = gui_item.hint.length;
        
        var hint_w = Calc.constrain(len * 8, 60, 500);
        
        var base_y = gui_item.y + 45;
        
        /*
        Engine.ctx.beginPath();
        Engine.ctx.rect(gui_item.x, base_y, len * 7, 30);
        Engine.ctx.fillStyle = 'rgb(126, 111, 81)';
        Engine.ctx.fill();
        
        set_font("Penshurst", 14, "0, 0, 0", "normal");
        Engine.ctx.fillText(gui_item.hint, gui_item.x + 10, base_y + 10);*/
        
        roundRect(Engine.ctx, gui_item.x, base_y, hint_w, 30, 5, true, true, 'rgb(228, 221, 206)', 'black');
        //set_font("Penshurst", 14, "0, 0, 0", "normal");
        Engine.ctx.fillText(gui_item.hint, gui_item.x + 10, base_y + 10);
        
        /*
        var rectWidth = 200;
      var rectHeight = 100;
      var rectX = gui_item.x;
      var rectY = base_y;
      var cornerRadius = 50;

      Engine.ctx.beginPath();
      Engine.ctx.moveTo(rectX, rectY);
      Engine.ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
      Engine.ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
      Engine.ctx.lineTo(rectX + rectWidth, rectY + rectHeight);
      Engine.ctx.lineWidth = 5;
      Engine.ctx.stroke();*/
        
        //Engine.ctx.lineWidth = 7;
        //Engine.ctx.strokeStyle = 'black';
        //Engine.ctx.stroke();
    }
}

