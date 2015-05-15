Ce que j'ai mis en place:<br>

-site one page<br>

-envoie du formulaire en ajax et retour au format Json.(onglet tous les concerts)<br>

-création d'un champ auto complète jquery en ajax et retour au format Json.(onglet concert)<br>

--gestion de google maps API V3 (https://developers.google.com/maps/documentation/javascript/tutorial)<br>

--récupération position utilisateur via géolocalisation (map.js)<br>

--récupération position utilisateur via un cookie (actualiseMap.js)<br>

--personnalisation des icones épingles (bleu pour les concerts et draggable,rouge pour l'utilisateur .(actualiseMap.js, map.js)<br>

--création d'un rayon d'action autour de l'utilisateur personnalisé, selon la distance de recherche.(actualiseMap.js, map.js)<br>

--Gestion des cas s'il y a concert ou non ou plus loin que le rayon d'action choisis.(actualiseMap.js, map.js)<br>

-- évènement "click" sur les icones des concerts pour afficher la description du concert choisis.(actualiseMap.js, map.js)<br>


Ce que je n'ai pas (vraiment) pris en charge:<br>

-j'ai laissé le format date en anglais mais l'apparence du datepicker en francais.<br>

-je n'ai pas créé de backend,il faut donc correctement remplir les adresses en BDD car il n'y a pas de regEx.<br>

-Je me suis occupée du CSS qu'au niveau de la structure des pages. <br>



Arborescence<br>

page principale :<br>

-INDEX<br>

Onglet "Tous les concerts" :<br>

-ajax-allConcerts.php (onglet ajax récupérant le contenue de la page "Tous les concerts")<br>
--allConcert.js (envois des données ajax et attend un retour JSON depuis la page de traitement findConcert.php)<br>
---findConcert.php (traitement de la BDD et retour au format JSON pour la requête ajax)<br>

Onglet "Concert par groupe":<br>

-ajax-concert.php (onglet ajax qui récupère le contenue de la page "Concert par groupe")<br>
--getConcert.js (envois des données en ajax pour rechercher le nom d'un groupe, à la page de traitement getConcert.php)<br>
---getConcert.php (traitement de la BDD et retour au format JSON pour la requête AJAX)<br>

formulaire d'actualisation de la carte :<br>

-actualiseMap.js (envois des données en ajax et attend un retour JSON depuis la page de traitement PHP)<br>
--actualiseMap.php (traitement de la BDD et retour au format JSON pour la requête AJAX)<br>

Première carte affichée lorsque l'utilisateur se connecte:<br>

-map.js (envois des données en ajax et attend un retour JSON depuis la page de traitement PHP)<br>
--findConcert.php (traitement de la BDD et retour au format JSON pour la requête AJAX.<br>
Ce traitement de la BDD via la page findConcert.php est le même que pour le traitement de l'appel ajax de l'onglet <br>
"Tous les groupes" car ils vont tout les deux chercher les concerts en BDD).<br>

Page de connexion BDD:<br>

-connexion.php<br>

Page de récupération du genre des groupes en BDD pour le formulaire d'actualisation de la carte<br>
-getGenre.php<br>

Page pour le calendrier Jquery UI traduit en FR:<br>
-datePicker.js<br>

Page de la gestion des onglets Jquery UI:<br>
-tabs.js<br>

BDD sql:<br>
-googleMap.sql<br>

























