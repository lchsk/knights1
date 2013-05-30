<?php
    require('config.php');
    
    $config = Config::GetInstance();
?>

<?php
    function game()
    {
        global $config;
        
        $files = array(
        // Libraries
            'lib/jquery.js', 
            //'lib/jquery.backstretch.min.js', 
            //'jquery.ui.core.min.js', 'jquery.ui.widget.min.js', 'jquery.ui.position.min.js', 'jquery.ui.tooltip.min.js',
        // Game
            'config.js', 'calc.js', 'dijkstra.js', 
            'engine.common.js', 'engine.map.js', 'engine.core.js', 'engine.sprites.js', 'engine.pathfinding.js', 'engine.rendering.js',
            'gui.js', 'units.js', 'buildings.js', 'materials.js', 'animations.js', 'graphics.js', 'game.init.js', 'game.gui.js', 'game.js'
        );
        
        $html = '';
        $html .= '<html lang="en"><head><meta charset="utf-8"><title>' . $config->GAME_TITLE . '</title><link type="text/css" rel="stylesheet" href="' . $config->HOST . 'css/styles.css' . '"/></head><body>';

        foreach($files as $file)
        {
            $html .= '<script type="text/javascript" src="' . $config->JS_FILES_PATH . $file . '"></script>' . "\n";
        }

        $html .= '</body></html>';
    
        return $html;
    }
    
    function index()
    {
        global $config;
        
        $files = array(
        // Libraries
            'lib/jquery.js', 'lib/jquery.backstretch.min.js', 
        // Game
            'config.js', 
            //'calc.js', 'dijkstra.js', 'engine.js', 'units.js', 'graphics.js', 'game.js'
        );
        
        $html = '';
        $html .= '<html lang="en"><head><meta charset="utf-8"><title>' . $config->GAME_TITLE . '</title><link type="text/css" rel="stylesheet" href="' . $config->HOST . '/css/styles.css' . '"/></head><body>';

        foreach($files as $file)
        {
            $html .= '<script type="text/javascript" src="' . $config->JS_FILES_PATH . $file . '"></script>' . "\n";
        }
        
        $html .= "<script>$.backstretch(\"images/knights.jpg\");</script>";
        
        // Menu Window
        
        $div = '
            <div class="menu">
                test
            </div>
        ';
        
        $html .= $div;

        $html .= '</body></html>';
    
        return $html;
    }
?>

<?php

    if(empty($_GET))
    {
        echo index();
    }
    else if ($_GET['id'] == 'game')
        echo game();  
?>
