<?php  
try {
    $pdo = new PDO('mysql:host=eckerfloznadmin.mysql.db;dbname=eckerfloznadmin', 'eckerfloznadmin', 'Truccc6493',array( PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
    
} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/> en ligne : ". $e->getLine();
    die();
}
