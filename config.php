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
    
    public $DB_HOST;
    public $DB_USERNAME;
    public $DB_PASSWORD;
    public $DB_NAME;
    
    private function Init()
    {
         $this->GAME_TITLE = 'Knights & Skeletons';
         $this->HOST = 'http://localhost/knights/';
         $this->JS_FILES_PATH = $this->HOST . 'js/';
         $this->IMAGES_PATH = $this->HOST . 'images/';
         $this->SPRITES_FILE_PATH = $this->HOST . 'data/sprites.dat';   
         
         $this->DB_HOST = 'lchsk.linuxpl.info';
         $this->DB_USERNAME = 'lchsk_lech';
         $this->DB_PASSWORD = '17751863';
         $this->DB_NAME = "lchsk_knights";
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
