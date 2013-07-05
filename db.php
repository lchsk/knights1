<?php
class Database
{
    public $server;
    public $username;
    public $password;
    public $dbname;
    public $link;
    
    public $result;
    
    public function __construct($server, $username, $password, $dbname)
    {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
    }

    public function connect()
    {
        $this->link = mysql_connect($this->server, $this->username, $this->password);
    }
    
    public function delete ($table, $where_column, $where_value)
    {
        $sql = 'DELETE FROM `' . ($table) . '` WHERE `' . ($where_column) . '` = ' . $this->quote($where_value);
        //echo $sql;
        mysql_query($sql);
    }
    
    
    public function query ($query)
    {   
        $result = mysql_query($query);
        
        $this->result = $result;
    }
    
    public function fetch ()
    {
        while($row = mysql_fetch_array($this->result))
        {
            $result_table[] = $row;
        }
        
        return $result_table;
    }
    

    
    public function close()
    {
        return mysql_close($this->link);
    }
    
    public function error()
    {
        return mysql_error($this->link);
    }
    
    public function selectdb()
    {
         mysql_select_db($this->dbname);
    }
    
    public function quote ($str)
    {
        if (is_int($str))
            return $str;
        else
            return '"' . $str . '"';
    }
}



?>
