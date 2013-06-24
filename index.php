<?php ob_start(); ?>

<?php
    require('config.php');
    include('db.php');
    include('maps.php');
    include('signup.php');
    include('signin.php');
    include('messages.php');
    
    
    $config = Config::GetInstance();
?>

<?php
    function game()
    {
        global $config;
        
        $files = array(
        // Libraries
            'lib/jquery.js', 
            'lib/json2.js',
            //'lib/jquery.backstretch.min.js', 
            //'jquery.ui.core.min.js', 'jquery.ui.widget.min.js', 'jquery.ui.position.min.js', 'jquery.ui.tooltip.min.js',
        // Game
            'config.js', 'calc.js', 'dijkstra.js', 
            'engine.common.js', 'engine.map.js', 'engine.core.js', 'engine.sprites.js', 'engine.pathfinding.js', 'engine.rendering.js',
            'gui.js', 'units.js', 'buildings.js', 'materials.js', 'animations.js', 'graphics.js', 'game.init.js', 'game.gui.js', 
            'game.building.material.js', 'game.building.goldmine.js', 'game.building.farm.js', 'game.js'
        );
        
        $html = '';
        $html .= '<html lang="en"><head><meta charset="utf-8"><title>' . $config->GAME_TITLE . '</title><link type="text/css" rel="stylesheet" href="' . $config->HOST . 'css/styles.css' . '"/></head><body>';
        
        // insert game data
        
        session_start();
        
        if (isset ($_GET['game']) && $_SESSION['username'])
        {
            $hash = trim($_GET['game']);
            
            $config = Config::GetInstance();
      
            $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
            $db->connect();
            $db->selectdb();
            
            $db->query('select * from games where u1_hash = "' . $hash . '" || u2_hash = "' . $hash . '"');
            $game = $db->fetch();
            
            if ( ! empty ($game))
            {
                $map = $game[0]['map_filename'];
                
                $user1 = $game[0]['username1'];
                $user2 = $game[0]['username2'];
                
                $side1 = $game[0]['player1'];
                $side2 = $game[0]['player2'];
                
                $hash1 = $game[0]['u1_hash'];
                $hash2 = $game[0]['u2_hash'];
                
                $started = $game[0]['started'];
                
                if ($hash1 == $hash)
                {
                    $js_object = 'var game_data = { 
                    player1_login : \'' . $user1 . '\', 
                    player2_login : \'' . $user2 . '\', 
                    map : \'' . $map . '\',
                    player1_side_id : ' . $side1 . ',
                    player2_side_id : ' . $side2 . ',
                    hash1 : \'' . $hash1 . '\', 
                    hash2 : \'' . $hash2 . '\'
                    }';
                }
                else
                {
                    $js_object = 'var game_data = { 
                    player1_login : \'' . $user2 . '\', 
                    player2_login : \'' . $user1 . '\', 
                    map : \'' . $map . '\',
                    player1_side_id : ' . $side2 . ',
                    player2_side_id : ' . $side1 . ',
                    hash1 : \'' . $hash2 . '\', 
                    hash2 : \'' . $hash1 . '\'
                    }';
                    
                    $db->query('update games set started=1 where u2_hash = "' . $hash . '"');
                }

                
                $html .= '<script type="text/javascript">';
                $html .= $js_object;
                $html .= '</script>';
            }
            
            $db->close();
        }

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
            'lib/jquery-ui.min.js',
            //'lib/jquery.ui.core.min.js', 'lib/jquery.ui.widget.min.js', 'lib/jquery.ui.button.min.js', 'lib/jquery.ui.selectable.js',
            //'http://code.jquery.com/jquery-1.9.1.js', 'http://code.jquery.com/ui/1.10.3/jquery-ui.js',
            
        // Game
            'config.js', 
            //'calc.js', 'dijkstra.js', 'engine.js', 'units.js', 'graphics.js', 'game.js'
        );
        
        $html = '';
        $html .= '<html lang="en"><head><meta charset="utf-8"><title>' . $config->GAME_TITLE . '</title>
        <link type="text/css" rel="stylesheet" href="' . $config->HOST . '/css/styles.css' . '"/>
        <link type="text/css" rel="stylesheet" href="' . $config->HOST . '/css/jquery-ui.css' . '"/>
        ';  
        
        $html .= '</head><body>';

        foreach($files as $file)
        {
            $html .= '<script type="text/javascript" src="' . $config->JS_FILES_PATH . $file . '"></script>' . "\n";
        }
        
        $html .= "<script>$.backstretch(\"images/knights.jpg\");</script>";
        
        $html .= '<script> 
            $(function() {
                $( "a.gui_btn" ).button().click(function( event ) {});
                $( "input[type=submit]" ).button().click(function( event ) {});
            });
            
             $(function() 
             {
                $("#sides").selectable({
                    stop: function()
                    {
                        var result = $("#select-side-result").empty();
                        $(".ui-selected", this).each(function(){
                            var index = $("#sides li" ).index(this);
                            result.val(( index + 1));
                        });
                    }
                });
                $("#maps").selectable({
                    stop: function()
                    {
                        var result = $("#select-map-result").empty();
                        $(".ui-selected", this).each(function(){
                            var index = $("#maps li" ).index(this);
                            result.val(( index + 1));
                        });
                    }
                });
             });
            </script>';
        
        // Menu Window
        
        $div = '
            <div class="menu">';
                
            $id = $_GET['id'];
            
            if ( ! isset($id))
            {
                // main menu
                $div .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php?id=about">About</a></div><div class="clear"></div>';
                $div .= '<b>Welcome to Knights & Skeletons!<br />Sign in and play real-time multiplayer strategy game!</b>';
                
                $div .= '<br /><br />';
                $div .= 'If you do not have an account, please sign up.';
                
                $div .= '<br /><br />';
                
                session_start();
                
                if ( ! isset ($_SESSION['username']))
                {
                    $div .= '<a class="gui_btn" href="index.php?id=signup">Sign Up</a>';
                    $div .= '<a class="gui_btn" href="index.php?id=signin">Sign In</a>';
                    
                }
                else
                {
                    header('Location: index.php?id=user_menu');
                }
                
                
                
            }
            else if ($id == 'signup')
            {
                $div .= registration_form();
            }
            else if ($id == 'register_user')
            {
                $div .= register();
            }
            
            else if ($id == 'signin')
            {
                $div .= signin_form();
            }
            
            else if ($id == 'sign_user')
            {
                $div .= sign();
            }
            
            
            else if ($id == 'user_menu')
            {
                $div .= user_menu();
            }
            else if ($id == 'new_game')
            {
                $div .= new_game();
            }
            else if ($id == 'join_game')
            {
                $div .= join_game();
            }
            
            
            else if ($id == 'start')
            {
                $div .= create_game();
            }
            
            
            else if ($id == 'logout')
            {
                $div .= logout();
            }
            
            else if ($id == 'about')
            {
                $div .= about();
            }
                
            $div .= '</div>
        ';
        
        $html .= $div;

        $html .= '</body></html>';
    
        return $html;
    }
?>

<?php


    if ($_GET['id'] == 'game')
    {
        echo game();
    }
    else if ($_GET['id'] == 'add_building')
    {
        add_building();
    } 
    else if ($_GET['id'] == 'add_unit')
    {
        add('add_unit');
    }
    else if ($_GET['id'] == 'move_unit')
    {
        add('move_unit');
    }
    else if ($_GET['id'] == 'move_units')
    {
        add('move_units');
    }
    else if ($_GET['id'] == 'del_building')
    {
        add('del_building');
    }
    
    else if ($_GET['id'] == 'del_unit')
    {
        add('del_unit');
    }
    
    else if ($_GET['id'] == 'read')
    {
        read();
    } 
    else
    {
        echo index();
    }
        
?>

<?php ob_end_flush(); ?>