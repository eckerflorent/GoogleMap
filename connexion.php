<?php  
/*essaie de la requete PDO*/
try {
    $pdo = new PDO('mysql:host=localhost;dbname=googleMap', 'root', '',array( PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING));
    
} catch (PDOException $e) {
    /*si erreur connexion PDO*/
    print "Erreur !: " . $e->getMessage() . "<br/> en ligne : ". $e->getLine();
    die();
}
