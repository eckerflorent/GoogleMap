$(function() {
    function delete_cookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    /*lorsque l'on clique sur l'overlay (la div fond noir) apres un clique sur un marker concert de la carte,
      la div se ferme ainsi que la div frame contenant les informations du concert*/
    $('#overlay').click(function() {
        $('#overlay').fadeOut();
        $('#frame').fadeOut();
    });
    /*déclaration de la variable map contenant la futur carte*/
    var map;

    function initialize() {
        /*option de la carte.Ici le zoom*/
        var mapOptions = {
            zoom: 8
        };
        /*Création de la carte*/
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        /*Si le navigateur supporte la géolocalisation HTML5*/
        if (navigator.geolocation) {           
           
            /*Demande à l'utilisateur d'accepter la géolocalisation*/
            navigator.geolocation.getCurrentPosition(function(position) {

                /*recupere la longitude et la latitude*/
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                /*Centre la carte à la latitude et longitude de l utilisateur*/
                map.setCenter(pos);
                
                var image = "images/redMarker.png";
                var userMarker = new google.maps.Marker({
                    /*position utilisateur*/
                    position: pos,
                    /*titre au dessus du marker*/
                    title: 'vous êtes ici',
                    /*image marker utilisateur personnalisé*/
                    icon: image
                });
                
                /*création du marker utilisateur*/
                userMarker.setMap(map);
                /*Option du cercle autour de l'utilisateur*/
                var userOption = {
                    strokeColor: '',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: 'white',
                    fillOpacity: 0.35,
                    map: map,
                    center: pos,
                    radius: 50000 /*50000 Metres*/
                };
                
                /*mise en place du cercle autour du marker de l'utilisateur*/
                cityCircle = new google.maps.Circle(userOption);
                
                /*enregistrement position utilisateur dans cookie*/
                var today = new Date(), expires = new Date();
                expires.setTime(today.getTime() + (365 * 24 * 60 * 60 * 1000));
                /*On supprime le cookie si il existait avec la fonction delete_cookie()*/
                delete_cookie('position');
                /*Création du cookie pour garder la position de l'utilisateur*/
                document.cookie = "position=" + pos + "; expires=" + expires.toGMTString() + "; path=/";                

                $.ajax({
                    url: 'findConcert.php',
                    dataType: 'json',
                    success: function(ConcertMarkers) {
                        if (ConcertMarkers !== 'aucun concert') {
                            /*Boucle création des markers concert*/
                            for (i = 0; i < ConcertMarkers.length; i++) {
                                /*la fonction scopeVariable est la pour que les markers ne s'écrases pas
                                 les un sur les autres.voir l' étendue des variables
                                 http://stackoverflow.com/questions/15354292/google-maps-api-marker-loop-not-changing-title-properly
                                 */
                                function scopeVariable() {
                                    var adresseConcert = ConcertMarkers[i]['adresseConcert'];
                                    var groupes = ConcertMarkers[i][0]['title'];
                                    var nom_concert = ConcertMarkers[i][2]['nom_concert'];
                                    var prix_concert = ConcertMarkers[i][3]['prix_concert'];
                                    var date_concert = ConcertMarkers[i][4]['date_concert'];
                                    var image_concert = ConcertMarkers[i][5]['image_concert'];
                                    var description_concert = ConcertMarkers[i][6]['description_concert'];
                                    var changeAdress = adresseConcert.replace(/ /g, '+');
                                    var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + changeAdress + "&sensor=true";
                                    /*La variable flag compte les concerts*/
                                    var flag = 0;
                                    /*Requete ajax pour chercher les concerts en BDD*/
                                    $.ajax({
                                        url: url,                                        
                                        dataType: 'json',
                                        success: function(json) {
                                            if (json.status === 'OK') {
                                                /*Latitude et longitude du concert*/
                                                var ConcertLatitude = json.results[0].geometry.location.lat;
                                                var ConcertLongitude = json.results[0].geometry.location.lng;                                                
                                                var Concertlatlng = new google.maps.LatLng(ConcertLatitude, ConcertLongitude);
                                                
                                                /*Calcul de la distance entre l'utilisateur et le concert*/
                                                var distance = google.maps.geometry.spherical.computeDistanceBetween(pos, Concertlatlng);
                                                
                                                /*la distance est divisée par 1000 pour convertir les metres en km*/
                                                var changeDist = Math.round(distance / 1000);
                                                /*Si la distance est inferieur ou egal à 50 on crée le marker du concert*/
                                                
                                                if (changeDist <= 50) {
                                                    /*On ajoute +1 à la variable flag qui compte les concerts*/
                                                    flag++;
                                                    var image = "images/blueMarker.png";
                                                    /*création du marker concert*/
                                                    var concertMarker = new google.maps.Marker({
                                                        position: Concertlatlng,
                                                        title: groupes,
                                                        icon: image,
                                                        draggable: true
                                                    });
                                                    concertMarker.setMap(map);
                                                }/*fin verif distance*/
                                                
                                                /*évenement click sur le marker du concert*/
                                                google.maps.event.addListener(concertMarker, 'click', function() {
                                                /*Ouverture de la div overlay*/
                                                $('#overlay').fadeIn();
                                                /*Ouverture de la div frame par dessus l'overlay pour accueillir les informations du concert cliqué*/
                                                $('#frame').fadeIn();
                                                $('#frame').html(
                                                    '<div style="float:left;"><br>Concert : ' + nom_concert +
                                                    '<br>Groupe(s) : ' + groupes +
                                                    '<br>Adresse : ' + adresseConcert +
                                                    '<br>Prix : ' + prix_concert + ' â‚¬    \
                                                    <br>Date : ' + date_concert +
                                                    '<br><img src="images/' + image_concert + '" class="image_concert" /></div><div style="float:left;padding-left:5px;">Description : <br>' +
                                                    description_concert + '</div>'
                                                     );
                                                });

                                                /*Si il y a des concerts mais qu'ils sont trop loin: errorUserMarker*/
                                                if (flag === 0) {
                                                    var image = "images/redMarker.png";
                                                    /*Création du marker*/
                                                    var errorUserMarker = new google.maps.Marker({
                                                        /*Position utilisateur*/
                                                        position: pos,
                                                        /*Titre au dessus du marker*/
                                                        title: 'Il y a des concerts mais plus loin',
                                                        /*Image marker utilisateur personnalisée*/
                                                        icon: image
                                                    });
                                                    /*Création du marker*/
                                                    errorUserMarker.setMap(map);
                                                    
                                                    /*option du cercle autour de l'utilisateur*/
                                                    var userOption = {
                                                        strokeColor: 'red',
                                                        strokeOpacity: 1,
                                                        strokeWeight: 1,
                                                        fillColor: '#FCA9A9',
                                                        fillOpacity: 0.35,
                                                        map: map,
                                                        center: pos,
                                                        radius: 50000/*5000 metres*/ 
                                                    };
                                                    /*Création du cercle autour du concert*/
                                                    cityCircle = new google.maps.Circle(userOption);
                                                }/*fin errorUserMarker*/
                                            }/*fin statut json ok*/
                                        }/*fin de success*/
                                    });/*fin création concert marker*/
                                }
                                /*Utilisation de la fonction scopeVariable pour créer les markers des concerts*/
                                scopeVariable();
                            }/*Fin de la boucle for de la création des concerts*/
                           
                            /*si aucun concert*/
                        } else {
                            var image = "images/redMarker.png";
                             /*image marker utilisateur personnalisé*/
                            var userMarker = new google.maps.Marker({
                                /*position utilisateur*/
                                position: pos,
                                /*titre au dessus du marker*/
                                title: 'Aucun concert',                               
                                icon: image
                            });
                            /*création deu marker*/
                            userMarker.setMap(map);

                            var userOption = {
                                strokeColor: 'red',
                                strokeOpacity: 1,
                                strokeWeight: 1,
                                fillColor: '#FCA9A9',
                                fillOpacity: 0.35,
                                map: map,
                                center: pos,
                                radius: 50000/*metres*/
                            };
                            cityCircle = new google.maps.Circle(userOption);
                            /*centre la map sur l'utilisateur grace à la variable "pos"*/
                        }/*Fin du else*/
                    }/*Fin de success*/
                });/*Fin requete ajax*/
            });/*fin de la géolocalisation*/
        }/*fin de verification si le navigateur supporte la géolocalisation*/
    }/*Fin de la fonction initialize*/

    google.maps.event.addDomListener(window, 'load', initialize);
});

