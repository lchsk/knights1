<?php
  
  function registration_form()
  {
      $ret = '';
      
      $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
      $ret .= '<b>Fill the fields to sign up</b><br /><br />';
      
      $ret .= '<form method="post" action="index.php?id=register_user">
            
            
          <div class="box">

            <label>

               <span>Username</span>

               <input type="text" name="login" />

            </label>

             <label>

               <span>Email address</span>

               <input type="text" name="email" />

            </label>

             <label>

                <span>Password</span>

                <input type="password" name="password" />

            </label>
            <label>

                <span>Confirm password</span>

                <input type="password" name="password2" />

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
  
  function register()
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
      
      if (empty($_POST['login']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['password2']))
      {
          $error = true;
          $message = 'All fields have to be filled.';
      }
      else if ($_POST['password'] != $_POST['password2'])
      {
          $error = true;
          $message = 'Passwords don\'t match.';
      }
      else
      {
          if ( ! empty ($users))
          {
              foreach ($users as $k)
              {
                if ($k['login'] == trim($_POST['login']))
                {
                  $error = true;
                  $message = 'That username exists in database. Choose a different one.';
                  break;
                }
             }
          }
          
      }
      
      
      
      if ($error)
      {
          $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
          $ret .= 'Errors were found:<br />';
          $ret .= '<b>' . $message . '</b><br /><br />';
          $ret .= '<a class="gui_btn" href="index.php?id=signup">Powrót</a>';
      }
      else
      {
          $db->query('insert into users (login, password, email, signup_time) values (' .
            $db->quote(trim($_POST['login'])) . ',' . $db->quote((md5($_POST['password'])))  . ',' . $db->quote(trim(($_POST['email']))) . ',' . time() .
          ')');
          
          
            echo $db->error();
          
          $ret .= '<div class="title_left"><h1>Knights & Skeletons</h1></div><div class="title_right"><a class="gui_btn" href="index.php">Home</a></div><div class="clear"></div>';
          $ret .= '<b>Welcome to Knights & Skeletons! Sign in and play real-time multiplayer strategy game!</b><br /><br />';
          
          $ret .= '<a class="gui_btn" href="index.php?id=signin">Sign In</a>';
      }
      
      
      
        
      
      $db->close();
      
      return $ret;
  }
?>
