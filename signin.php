<?php
    function signin_form()
  {
      $ret = '';
      $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
      $ret .= '<b>Fill the fields to sign in</b><br /><br />';
      
      $ret .= '<form method="post" action="index.php?id=sign_user">
      
       <div class="box">

            <label>

               <span>Username</span>

               <input type="text" name="login" />

            </label>

             

             <label>

                <span>Password</span>

                <input type="password" name="password" />

            </label>
           
            <label>
                <span></span>
                <input type="submit" value="OK" />
            </label>

         </div>

        </form>
      ';
      
      
      return $ret;
  }
  
  
  function logout()
  {
      session_start();
      session_destroy();
      
      header('Location: index.php');
  }
  
  
  function sign()
  {
      $message = '';
      $error = false;
      $ret = '';
      
      $config = Config::GetInstance();
      
      $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
      $db->connect();
      $db->selectdb();
      
      $db->query('select * from users');
      $users = $db->fetch();
      
      $signed = false;
      $user_data = array();
      
     
          if ( ! empty ($users))
          {
              foreach ($users as $k)
              {
                if ($k['login'] == ($_POST['login'] && $k['password'] == md5($_POST['password'])))
                {
                  $signed = true;
                  $user_data = $k;
                  
                  break;
                }
             }
             
             if ( ! $signed)
             {
                 $error = true;
                $message = 'Username and password dont match.';
             }
             
          }
          
      
      
      
      
      if ($error)
      {
          $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
          $ret .= 'Errors were found:<br />';
          $ret .= '<b>' . $message . '</b><br /><br />';
          $ret .= '<a class="gui_btn" href="index.php?id=signin">Back</a>';
      }
      else if ($signed)
      {
          session_start(); 
          
          //define("username", $user_data['login']);
          $_SESSION['username'] = $user_data['login'];
          
          header('Location: index.php?id=user_menu');
          
          
      }
      
      
      
        
      
      $db->close();
      
      return $ret;
  }
  
  
  
  
  function user_menu()
  {
      $ret = '';
      
      session_start();
      
      if (isset ($_SESSION['username']))
      {
          $ret .= '<h1>Welcome, ' . $_SESSION['username'] . '</h1>';
          $ret .= '<b>Create a new game or join an existing one.</b><br /><br />';
          
          $ret .= '<a class="gui_btn" href="index.php?id=new_game">Create a new game</a><br />';
          $ret .= '<a class="gui_btn" href="index.php?id=join_game">Join game</a><br />';
          $ret .= '<a class="gui_btn" href="index.php?id=logout">Log out</a><br />';
      }
      
      return $ret;
  }
  
  function new_game()
  {
      
      $ret = '';
      
      session_start();
      
      if (isset ($_SESSION['username']))
      {
          global $maps;
           
          $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
          
          $ret .= '<b>Create a new game</b><br /><br />';
          
          $ret .= '<form method="post" action="index.php?id=start">
      
            <div class="box">

            <input type="hidden" name="select-side-result" id="select-side-result" />
            <input type="hidden" name="select-map-result" id="select-map-result" />   

             <label>

                <span>Play as</span>
                
                <!--<div class="styled-select">
                    <select name="side"><option value="1">Knights</option><option value="2">Skeletons</option></select>
                </div>-->
                
                 <ol class="selectable" id="sides">
                    <li class="ui-widget-content"><img src="images/btn_kpaladin.png" style="width: 64px; height: 64px;" /><br />Knights</li>
                    <li class="ui-widget-content"><img src="images/btn_smonk.png" style="width: 64px; height: 64px;" /><br />Skeletons</li>
                 </ol>
                <div class="clear"></div>
            </label>
           
           
           
            <label>
                <span>Opponent\'s username:</span>
                <input type="text" name="opp" />
            </label>           
           
            
            <label>

               <span>Choose map</span>

               <!--<div class="styled-select">
               <select name="map">-->';
            
            /*for ($i = 0; $i < count($maps); ++$i)
            {
                $ret .= '<option value="' . $maps[$i]['filename'] . '">';
                
                $ret .= $maps[$i]['name'];
                
                $ret .= '</option>';
            }*/
            
            $ret .= '<!--</select></div>-->
            <ol class="selectable" id="maps">
            ';
            
            for ($i = 0; $i < count($maps); ++$i)
            {
                $ret .= '<li class="ui-widget-content">' . $maps[$i]['name'] . '</li>';
            }
            
                    
                    
                 

            $ret .= '</ol><div class="clear"></div></label>
           
           
           <input type="submit" value="Play" />
         </div>

            <input type="hidden" name="player1" value="' . $_SESSION['username'] .'" />
     
            </form>
            ';
            
      }
      else
      {
          header('Location: index.php?id=signin');
      }
      
      return $ret;
  }
  
  function create_game()
  {
      $message = '';
      $error = false;
      $ret = '';
      
      $config = Config::GetInstance();
      
      $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
      $db->connect();
      $db->selectdb();
      
      // check if username exists

      session_start();
      
      if ($_POST && isset($_SESSION['username']))
      {
          //print_r($_POST);
          $hash1 = md5(time());
          $hash2 = md5(time() + rand());
          
          $player1 = $_POST['select-side-result'];
          
          //print_r($_POST);  
          
          if ($player1 == '1' || $player1 == 1)
          {
              $player1 = 1;
              $player2 = 2;
          }
          else
          {
              $player1 = 2;
              $player2 = 1;
          }
            
          // check data
          //Array ( [select-side-result] => 2 [select-map-result] => [opp] => [player1] => dupa )
          if (
            $_POST['select-side-result'] <= 0 ||
            ! isset ($_POST['select-side-result']) ||
            $_POST['select-map-result'] <= 0 ||
            ! isset ($_POST['select-map-result']) ||
            trim(($_POST['opp'])) == '' ||
            trim($_POST['player1']) == '' ||
            trim(($_POST['opp'])) == trim($_POST['player1'])
          )
          {
              // error!
              $ret .= '<b>Error!</b><br />Do not leave any of the fields empty!<br /><br /><a class="gui_btn" href="index.php?id=new_game">Back</a>'; 
          }
          else
          {
              global $maps;
              
              // find map filenampe
              $map_filename = $maps[$_POST['select-map-result'] - 1]['filename'];
              
              
              $db->query('insert into games (map_filename, username1, username2, start_time, player1, player2, u1_hash, u2_hash, finished, started) values (' .
            $db->quote(trim($map_filename)) . ',' . $db->quote((trim($_POST['player1'])))  . ',' . $db->quote(trim(($_POST['opp']))) . ',' .
            time() . ',' . 
            $db->quote($player1) . ',' . 
            $db->quote($player2) . ',' .
            $db->quote($hash1) . ',' .
            $db->quote($hash2) . ',' .
            0 . ',' .
            0
            . ')');
          
          echo $db->error();
          
          $link = Config::GetInstance()->HOST . 'index.php?id=game&game=' . $hash1;
          
          header('Location: ' . $link);
          
            //$ret .= '<h1>Game just started!</h1>';
            //$ret .= '<b>Click on the link:<br /> <a href="' . $link . '" target="_blank">' . $link . '</a></b><br /><br />Don\'t forget to share the link with your friend!';
          }
          
          
      }
      
      
          
          
      $db->close();
      
      return $ret;
  }
  
  
  
  function join_game()
  {
      $ret = '';
      
      session_start();
      
      if (isset($_SESSION['username']))
      {
          $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
          
          $ret .= '<b>Games you can join are listed below</b><br /><br />';
          
          $ret .= '<a class="gui_btn" href="index.php?id=join_game">Refresh</a>';
          
          $config = Config::GetInstance();
          
          $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
          $db->connect();
          $db->selectdb();
          
          // listing only games from last 15 mins
          $time15 = time() - 60 * 75;
          
          $db->query('select * from games where start_time > ' . $time15 . ' && username2 = ' . $db->quote($_SESSION['username']));
          $games = $db->fetch();
          
          //print_r($games);
          
          // Array ( [0] => Array ( [0] => 5 [id] => 5 [1] => 1370543855 [start_time] => 1370543855 [2] => map2.dat [map_filename] => map2.dat [3] => dupa [username1] => dupa [4] => leszek [username2] => leszek [5] => 1 [player1] => 1 [6] => 2 [player2] => 2 [7] => 571bfa98b5a0ed890f6f3cba40d0f163 [u1_hash] => 571bfa98b5a0ed890f6f3cba40d0f163 [8] => 61389f69ef91bb17b4e9cb012b6eb127 [u2_hash] => 61389f69ef91bb17b4e9cb012b6eb127 [9] => 0 [finished] => 0 [10] => 0 [started] => 0 ) )
          
          $ret .= '<br /><br />';
          
          global $maps;
          
          foreach ($games as $g)
          {
              $ret .= 'Game started: <b>' . date('m-d-Y H:i', $g['start_time']) . '</b><br />';
              
              if ($g['player1'] == 2)
              {
                  $u1_side = 'Knights';
                  $u2_side = 'Skeletons';
              }
              else if ($g['player1'] == 1)
              {
                  $u2_side = 'Knights';
                  $u1_side = 'Skeletons';
              }
              
              $map_name = '';
              for ($i = 0; $i < count ($maps); $i++)
              {
                  if ($maps[$i]['filename'] == $g['map_filename'])
                  {
                      $map_name = $maps[$i]['name'];
                      break;
                  }
              }
              
              $ret .= 'Map name: <b>' . $map_name . '</b><br />';
              $ret .= 'Opponent: <b>' . $g['username2'] . ' (' . $u2_side . ')</b><br />';
              $ret .= 'You play as: <b>' . $u1_side . '</b><br />';
              $ret .= '<a class="gui_btn" href="index.php?id=game&game=' . $g['u2_hash'] . '">Join</a>';
          }
      }
      
      
      
      return $ret;
  }
?>
