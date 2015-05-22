<?php

require_once './connexion.php';

/* requete PDO préparée */
$query = $pdo->prepare(
        'SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE G.id_groupe IS NOT NULL 
         AND C.date_concert >= CAST(NOW() AS DATE)
         ORDER BY prix_concert DESC');

$query->execute();

$AdressExiste = array();

while ($datas = $query->fetch()) {
    /* si l'adresse existe */
    $adresseConcert = $datas['adresse_concert'];
    $nom_groupe = $datas['nom_groupe'];
    $id_groupe = $datas['id_groupe'];
    $nom_concert = $datas['nom_concert'];
    $prix_concert = $datas['prix_concert'];
    $date_concert = $datas['date_concert'];
    $image_concert = $datas['image_concert'];
    $description_concert = $datas['description_concert'];
    /* verification si l'adresse existe */
    if (in_array($adresseConcert, $AdressExiste)) {
        /* on se met au niveau de l'adresse existante dans l array $AdressExiste */
        for ($i = 0; $i < sizeof($AdressExiste); $i++) {
            if ($AdressExiste[$i] === $adresseConcert) {
                /* on ajoute uniquement le title à l'adresse existante
                  sans ajouter l'adresse pout ne pas créer 2 markers a la meme adresse sur la map */

                for ($j = 0; $j < sizeof($ConcertsMArkers); $j++) {

                    if ($ConcertsMArkers[$j]['adresseConcert'] === $adresseConcert) {

                        for ($k = 0; $k < sizeof($ConcertsMArkers[$j][0]); $k++) {
                            $ConcertsMArkers[$j][$k]['title'].=', ' . $nom_groupe;                            
                        }
                    }
                }
            }
        }

    } else {
       /* si l'adresse n'existe pas on construit l'array $ConcertsMArkers qui contiendra toutes les informations pour créer le marker du concert*/
        $ConcertsMArkers[] = array('adresseConcert' => $adresseConcert, array('title' => $nom_groupe),
                    array('id_groupe' => $id_groupe),
                    array('nom_concert' => $nom_concert),
                    array('prix_concert' => $prix_concert),
                    array('date_concert' => $date_concert),
                    array('image_concert' => $image_concert),
                    array('description_concert' => $description_concert)
        );
        /* ajout de l'adresse à la variable $AdressExiste[] */
        $AdressExiste[].=$datas['adresse_concert'];
    }
}
 /*si l'array $ConcertsMArkers n'est pas vide on l'encode au format JSON */
if (!empty($ConcertsMArkers)) {
    echo json_encode($ConcertsMArkers);
} else 
     /*sinon on l'encode au format JSON mais retourne "aucun concert"*/
    {
    echo json_encode($ConcertsMArkers = 'aucun concert');
}
