<!DOCTYPE>
<html lang="FR">
    <head>
        <meta name="author" content="Ecker Florent">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <!--Importation de la feuille de style CSS principal-->
        <link rel="stylesheet" href="css/style.css" />        
        <!--Importation de la feuille de style personnalisé sur jquery ui-->
        <link rel="stylesheet" href="css/jquery-ui-1.11.4.custom/jquery-ui.min.css" />
        <!--Importation de jquery et jquery ui-->
        <script src="//code.jquery.com/jquery-1.10.2.js"></script> 
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <!--Importation des fonctions google-->
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry"></script>
        <!--JS de la map lors du 1er chargement de la carte-->
        <script src="js/map.js"></script>
        <!--JS lorsque l'utilisateur actualise la carte (formulaire actualiseMap dans aside)-->
        <script src="js/actualiseMap.js"></script>
        <!--JS datePicker Fr-->
        <script src="js/datePicker.js"></script>
        <!--JS du navigateur tabs jQuery UI (<nav>)-->
        <script src="js/tabs.js"></script>
    </head>

    <body>
        <div id="wapper">
            <!--splash screen lors du clique sur un marker concert sur la carte-->
            <div id="overlay"></div>
            <div id="frame"></div>

            <header>header</header>
            <!--aside de gauche avec la carte-->
            <aside id="aside" >
                <h1>Concert pret de chez toi</h1>
                <!--balise accueillant la carte-->
                <div id="map"></div><br> 
                <!--formulaire d'actualisation de la carte par l'utilisateur-->
                <form method="POST" action="actualiseMap.php" id="actualiseMap">
                    <!--Choix du rayon de recherche en KM-->
                    <select name="km" id="km" style="width: 100%;">
                        <option value="10" >10km</option>
                        <option value="20" >20km</option>
                        <option value="30" >30km</option>
                        <option value="40" >40km</option>
                        <option value="50" selected="">50km</option>
                        <option value="60" >60km</option>
                        <option value="70" >70km</option>
                        <option value="80" >80km</option>
                        <option value="100" >100km</option>
                    </select>
                    <!--Choix du genre de groupe-->
                    <select style="width: 100%;" name="genre" id="genre" >
                        <option value="tous" selected="">Tout les genres</option>
                        <?php
                        /* recherche du genre des groupes en BDD */
                        require './getGenre.php';
                        for ($i = 0; $i < sizeof($genre_groupe); $i++) {
                            ?>
                        
                            <option value="<?php echo $genre_groupe[$i]['genre_groupe'] ?>" >                                
                            <?php echo $genre_groupe[$i]['genre_groupe'] ?></option>
                            
                        <?php } ?>     

                    </select>
                    
                    <!--Date de commencement-->
                    <input type="text" id="from" name="from" placeholder="Du ">
                    
                    <!--Date de fin-->
                    <input type="text" id="to" name="to" placeholder="Au"><br>
                    
                    <input type="submit" id="submitActualiseMap" value="Actualiser" />
                </form>  
            </aside>
            <!--Navigation(onglets)-->
            <nav id="tabs">
                <ul>
                    <li><a href="ajax-concert.php">Concerts par groupe</a></li>
                    <li><a href="ajax-allConcerts.php">Tous les concerts</a></li>
                </ul>
            </nav> 
            
            <!--Cette div arrete l'effet float:left-->
            <div class="reset" style="clear: left;"></div>

            <footer>footer</footer>
        </div>
    </body>
</html>