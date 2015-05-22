<?php

/* l'autocomplete envoi $_POST['term'] / REQUESTE recupere les post ou get */
if (isset($_REQUEST['term'])) {

    $request = $_REQUEST['term'];

    require_once './connexion.php';
    /* requete PDO préparée */
    $query = $pdo->prepare(
            "SELECT * FROM concerts as C 
         LEFT JOIN groupes_concerts as GC on GC.id_concert=C.id_concert 
         LEFT JOIN groupes as G on G.id_groupe=GC.id_groupe 
         WHERE G.nom_groupe LIKE :requeste AND C.date_concert >= NOW()");
    
    $query->execute(array('requeste' => '%' . $request . '%'));
    /* $data contiendra les informations sur les concerts */    
    $data = array();
    
    /* boucle pour lire la requete PDO */
    while ($datas = $query->fetch()) {
        $data[] = array(
            'label' => $datas['nom_groupe'] . '/' . $datas['nom_concert'],
            'value' => $datas['nom_groupe'],
            'nom_groupe' => $datas['nom_groupe'],
            'prix_concert' => $datas['prix_concert'],
            'nom_concert' => $datas['nom_concert'],
            'genre_groupe' => $datas['genre_groupe'],
            'image_concert' => $datas['image_concert'],
            'date_concert' => $datas['date_concert'],
            'description_concert' => $datas['description_concert'],
            'adresse_concert' => $datas['adresse_concert'],
        );
    }
    /* $data est encodé en Json pour etre en suite retourné à la requete ajax */
    echo json_encode($data);
}