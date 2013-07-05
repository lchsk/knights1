<?php
  
    /**
    * Add new building data to the database
    * (data from ajax)
    * 
    */
    function add_building()
    {
        if ($_POST)
        {
            $config = Config::GetInstance();

            $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
            $db->connect();
            $db->selectdb();

            $db->query('insert into data (u_hash, time, data, type) values (' .
                $db->quote(trim($_POST['hash'])) . ',' . time()  . ',' . $db->quote(trim(urlencode($_POST['json']))) . ',' .  $db->quote(trim('add_building')) .
            ')');
        }
        
    }
    
    function add($what)
    {
        if ($_POST)
        {
            $config = Config::GetInstance();

            $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
            $db->connect();
            $db->selectdb();

            $db->query('insert into data (u_hash, time, data, type) values (' .
                $db->quote(trim($_POST['hash'])) . ',' . time()  . ',' . $db->quote(trim(urlencode($_POST['json']))) . ',' .  $db->quote(trim($what)) .
            ')');
        }
    }
    
    /**
    * Read messages from db
    * 
    */
    function read()
    {
        if ($_POST)
        {
            $config = Config::GetInstance();

            $db = new Database($config->DB_HOST, $config->DB_USERNAME, $config->DB_PASSWORD, $config->DB_NAME);
            $db->connect();
            $db->selectdb();

            $db->query('select * from data where u_hash = ' . $db->quote($_POST['hash']) . ' limit 1');
            $r = $db->fetch();
            
            if ( ! empty ($r))
            {
                if ($r[0]['type'] == 'add_building')
                {
                    echo 'add_building||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                else if ($r[0]['type'] == 'add_unit')
                {
                    echo 'add_unit||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                else if ($r[0]['type'] == 'move_unit')
                {
                    echo 'move_unit||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                else if ($r[0]['type'] == 'move_units')
                {
                    echo 'move_units||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                else if ($r[0]['type'] == 'del_building')
                {
                    echo 'del_building||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                else if ($r[0]['type'] == 'del_unit')
                {
                    echo 'del_unit||' . (urldecode($r[0]['data']));
                    $db->query('delete from data where id = ' . $r[0]['id']. ' limit 1');
                }
                
                
                
            }
            
            
        }
    }
?>
