<?php

//création de l array $ConcertsMArkers qui contiendra tout les markers 
//à éditer sur la carte

/* connexion BDD */
require_once './connexion.php';
/* on recupère le genre, la date de but et la date de fin */
$genre = isset($_POST['genre']) ? $_POST['genre'] : '';
$from = isset($_POST['from']) ? $_POST['from'] : '';
$to = isset($_POST['to']) ? $_POST['to'] : '';
/* on choisis la bonne requete SQL selon le genre et les dates */
if ($genre == 'tous' && !empty($to) && !empty($from)) {

    $arrayFetch = array(
        'from' => $from,
        'to' => $to);
    $sql = "SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE C.date_concert >= :from AND C.date_concert <= :to ";
    
} else if ($genre == 'tous' && empty($to) && !empty($from)) {
    $arrayFetch = array(
        'from' => $from
    );
    $sql = "SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE C.date_concert >= :from ";
    
} else if ($genre !== 'tous' && empty($to) && !empty($from)) {
    $arrayFetch = array(
        'genre_groupe' => $genre,
        'from' => $from
    );
    $sql = "SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE  G.genre_groupe = :genre_groupe AND C.date_concert >= :from ";
    
} else if ($genre !== 'tous' && !empty($to) && !empty($from)) {
    $arrayFetch = array(
        'genre_groupe' => $genre,
        'from' => $from,
        'to' => $to,
    );
    $sql = "SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE G.genre_groupe = :genre_groupe
         AND C.date_concert >= :from AND C.date_concert <= :to ";
}

/* si le genre et la premiere des deux dates utilisateur n'est pas vide */
if (!empty($genre) && !empty($from)) {
    
    /* requete PDO préparée */
    $query = $pdo->prepare($sql);
    $query->execute($arrayFetch);
    
    /* si l adresse existe, seul le nom du groupe sera ajouté dans le title du marker deja existant */
    $AdressExiste = array();
    
    /* Boucle pour créer l'ARRAY qui generera le marker comprenant les concerts,groupes date.. */
    while ($datas = $query->fetch()) {
        
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

            for ($i = 0; $i < sizeof($AdressExiste); $i++) {
                /* on ajoute uniquement le title (du marker) à l'adresse existante
                  sans ajouter l'adresse date etc.. pour ne pas créer 2 mêmes markers sur la carte */
                if ($AdressExiste[$i] === $adresseConcert) {

                    /* boucle pour ce mettre au niveau de l'adresse existante   */
                    for ($j = 0; $j < sizeof($ConcertsMArkers); $j++) {
                        
                        /* si l adresse est identique on ajoute le nom du groupe aux titles existant */
                        if ($ConcertsMArkers[$j]['adresseConcert'] === $adresseConcert) {
                            /* on parcour les noms de groupes (les titles) */
                            for ($k = 0; $k < sizeof($ConcertsMArkers[$j][0]); $k++) {
                                $ConcertsMArkers[$j][$k]['title'].=', ' . $nom_groupe;
                            }
                        }
                    }
                }
            }            
        } else {
            /* si l'adresse n'existe pas on construit l'array $ConcertsMArkers qui contiendra toutes les 
               informations pour créer le marker du concert*/
            $ConcertsMArkers[] = array('adresseConcert' => $adresseConcert, array('title' => $nom_groupe),
                array('id_groupe' => $id_groupe),
                array('nom_concert' => $nom_concert),
                array('prix_concert' => $prix_concert),
                array('date_concert' => $date_concert),
                array('image_concert' => $image_concert),
                array('description_concert' => $description_concert)
            );
            
            /* ajout l'adresse dans la variable $AdressExiste[]*/
            $AdressExiste[].=$datas['adresse_concert'];
        }
    }/*Fin boucle while*/
    
    /*si l'array $ConcertsMArkers n'est pas vide on l'encode au format JSON */
    if (!empty($ConcertsMArkers)) {
        echo json_encode($ConcertsMArkers);
    } else 
        /*sinon on l'encode au format JSON mais vide*/
        {
        echo json_encode($ConcertsMArkers = '');
    }
}
