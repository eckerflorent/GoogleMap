<?php
/*requete pour remplir les genres du formulaire d'actualistion de la carte dans index.php*/
require_once './connexion.php';
/*requete PDO préparée*/
$query = $pdo->prepare(
        "SELECT DISTINCT genre_groupe FROM groupes ");

$query->execute(); 

$genre_groupe = array();

while($datas =$query->fetch()){
    $genre_groupe[]= array(
        'genre_groupe' => $datas['genre_groupe']             
    );
}


