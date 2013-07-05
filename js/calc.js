var Calc = Calc || (function(){
    
    return {
        /**
        * Checks if number x is within a and b
        * 
        * @param x
        * @param a
        * @param b
        * @param including_bounds
        */
        is_within : function(x, a, b, including_bounds){
            
            if(including_bounds)
                return (x >= a && x <= b);
            else
                return (x > a && x < b);
        },
        /**
        * Makes sure that x is between a and b
        * 
        * @param x
        * @param a
        * @param b
        */
        
        constrain : function(x, a, b){
            
            if(x < a)
                return a;
            if(x > b)
                return b;
                
            return x;
        },
        
        /**
        * Checks if (x, y) is in rectangle
        * 
        * @param x
        * @param y
        * @param rect [x, y, x2, y2]
        */
        in_rect : function(x, y, rect){
            
            if(x >= rect[0] && x <= rect[2] && y >= rect[1] && y <= rect[3])
                return true;
            
            return false;
            
        }
    };
}());