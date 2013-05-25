<?php
    

    
    
 class Config
 {
   private static $instance;
   private function __construct() {}
   private function __clone(){}
   
   public $GAME_TITLE;
   
   public $HOST;
    public $JS_FILES_PATH;
    public $IMAGES_PATH;
    public $SPRITES_FILE_PATH;
    
    private function Init()
    {
         $this->GAME_TITLE = 'Knights & Skeletons';
         $this->HOST = 'http://localhost/knights/';
         $this->JS_FILES_PATH = $this->HOST . 'js/';
         $this->IMAGES_PATH = $this->HOST . 'images/';
         $this->SPRITES_FILE_PATH = $this->HOST . 'data/sprites.dat';   
    }
 
   public static function GetInstance ()
    {
        if (self::$instance === null) {
            self::$instance = new Config();
            self::$instance->Init();
        }
        return self::$instance;

    }
    
    
 }
?>
