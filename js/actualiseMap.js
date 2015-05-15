$(function() {
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    /*lorsque l'on clique sur l'overlay (la div fond noir) apres un clique sur un marker concert de la carte,
      la div se ferme ainsi que la div frame contenant les informations du concert*/
    $('#overlay').click(function() {
        $('#overlay').fadeOut();
        $('#frame').fadeOut();
    });
    
    /*Formulaire d'actualisation de la carte*/
    $('#actualiseMap').submit(function() {
       /*récuperation des choix utilisateur*/ 
        var km = $('#km :selected').val();
        var url = $(this).attr('action');
        var genre = $('#genre :selected').val();
        var from = $('#from').val();
        var to = $('#to').val();

        /*Requete ajax pour requete BDD dans actualiseMap.php*/
        $.ajax({
            method: "POST",
            url: url,
            dataType: 'json',
            data: {'genre': genre, 'from': from, 'to': to},
            success: function(datas) {
                /*Selection du zoom de la carte selon le choix utilisateur,du rayon de recherche en KM*/
                    if (km == 10) {
                        var zoom = 11;
                    }
                    else if (km == 20) {
                        var zoom = 9;
                    }
                    else if (km == 30) {
                        var zoom = 9;
                    }
                    else if (km == 40) {
                        var zoom = 8;
                    }
                    else if (km == 50) {
                        var zoom = 8;
                    }
                    else if (km == 60) {
                        var zoom = 8;
                    }
                    else if (km == 70) {
                        var zoom = 8;
                    }
                    else if (km == 80) {
                        var zoom = 7;
                    }
                    else if (km == 100) {
                        var zoom = 7;
                    }

                    /*option du zoom de la carte*/
                    var mapOptions = {
                        zoom: zoom
                    };
                    /*création de la carte*/
                    map = new google.maps.Map(document.getElementById('map'), mapOptions);
                    /*récuperation de la position de l'utilisateur*/
                    var userLatLng = readCookie('position');

                    /*Nettoyage de la variable userLatLng*/
                    var splitLatLng = userLatLng.split(",");
                    var userLat = splitLatLng[0].replace('(', '');
                    var userLng = splitLatLng[1].replace(')', '');
                    
                    /*position utilisateur*/
                    var userPosition = new google.maps.LatLng(userLat, userLng);
                    
                    /*option du cercle autour de l'utilisateur*/
                    var userOption = {
                        strokeColor: '',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: 'white',
                        fillOpacity: 0.35,
                        map: map,
                        center: userPosition,
                        radius: km * 1000
                    };
                    
                     /*création du cercle*/
                    cityCircle = new google.maps.Circle(userOption);
                    
                    /*centre la map sur l'utilisateur grace à la variable "userPosition"*/
                    map.setCenter(userPosition);
                    
                    /*si il y a des concerts*/
                if (datas) {
                    
                    /*image personnalisée de l'épingle sur la carte*/
                    var image = "images/redMarker.png";
                    
                    /*création du marker utilisateur*/
                    var userdMarker = new google.maps.Marker({
                        /*position utilisateur*/
                        position: userPosition,
                        /*titre au dessus du marker*/
                        title: 'vous etes ici',
                        /*image marker utilisateur personnalisée*/
                        icon: image
                    });
                    /*création du marker utilisateur*/
                    userdMarker.setMap(map);                   
                    
                    if (navigator.geolocation) {

                        /*boucle pour parcourir les concerts*/
                        for (i = 0; i < datas.length; i++) {
                            function scopeVariable() {
                                /*on récupere les information dont on à besoin*/
                                var adresseConcert = datas[i]['adresseConcert'];
                                var nom_concert = datas[i][2]['nom_concert'];
                                var groupes = datas[i][0]['title'];                                
                                var prix_concert = datas[i][3]['prix_concert'];
                                var date_concert = datas[i][4]['date_concert'];
                                var image_concert = datas[i][5]['image_concert'];
                                var description_concert = datas[i][6]['description_concert'];
                                var changeAdress = adresseConcert.replace(/ /g, '+');
                                var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + changeAdress + "&sensor=true";
                                
                                /*on compte le nombre de concert incrémenté de +1 à chaque boucle*/
                                var flag = 0;
                                
                                /*requete ajax pour récupérer la latitude et longitude du concerc (variable oncertLatLng)*/
                                $.ajax({
                                    url: url,
                                    dataType: 'json',
                                    success: function(json) {
                                        if (json.status === 'OK') {
                                            /*rÃ©cupÃ©ration de la lar lng du concert*/
                                            var ConcertLatitude = json.results[0].geometry.location.lat;
                                            var ConcertLongitude = json.results[0].geometry.location.lng;
                                            /*conertLatLng*/
                                            var Concertlatlng = new google.maps.LatLng(ConcertLatitude, ConcertLongitude);
                                            var distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, Concertlatlng);
                                            /*la distance recupérée par google est en Metre alors que
                                             l'on veux la comparer en KM*/
                                            var changeDist = Math.round(distance / 1000);
                                            /*verification de la distance*/
                                            if (changeDist <= km) {
                                                /*incrémentation +1 de la variable flag*/
                                                flag++;
                                                
                                                var image = "images/blueMarker.png";
                                                /*marker concert*/
                                                var concertMarker = new google.maps.Marker({
                                                    position: Concertlatlng,
                                                    title: groupes,
                                                    icon: image,
                                                    draggable: true
                                                });
                                                /*création du marker concert*/
                                                concertMarker.setMap(map);
                                                
                                                /*evenement "click" sur le marker du concert*/
                                                google.maps.event.addListener(concertMarker, 'click', function() {
                                                    /*ouverure de la div overlay pour fond noir*/
                                                    $('#overlay').fadeIn();
                                                    /*ouverture de la div pour prÃ©senter le concert*/
                                                    $('#frame').fadeIn();
                                                    /*envoi des information*/
                                                    $('#frame').html(
                                                            '<div style="float:left;"><br>Concert : ' + nom_concert +
                                                            '<br>Groupe(s) : ' + groupes +
                                                            '<br>Adresse : ' + adresseConcert +
                                                            '<br>Prix : ' + prix_concert + ' â‚¬\
                                                            <br>Date : ' + date_concert +
                                                            '<br><img src="images/' + image_concert + '" class="image_concert" />\
                                                             </div><div style="float:left;">Description : <br>' +
                                                            description_concert + '</div>'
                                                    );
                                            
                                                });/*fin addListener concertMarker */
                                            }/*fin verif distance*/

                                            /*si il y a des concerts mais trop loin*/
                                            if (flag === 0) {
                                                var image = "images/redMarker.png";
                                                /*création du marker utilisateur*/
                                                var errorUserMarker = new google.maps.Marker({
                                                    /*position utilisateur*/
                                                    position: userPosition,
                                                    /*titre au dessus du marker*/
                                                    title: 'Il y a des concerts mais plus loin',
                                                    /*image marker utilisateur personnalisée*/
                                                    icon: image
                                                });
                                                
                                                /*création du errorUserMarker si aucun concert n'est comptabilisé*/
                                                errorUserMarker.setMap(map);
                                                
                                                /*Option du cercle autour de l'utilisateur*/
                                                var userOption = {
                                                    strokeColor: 'red',
                                                    strokeOpacity: 1,
                                                    strokeWeight: 1,
                                                    fillColor: '#FCA9A9',
                                                    fillOpacity: 0.35,
                                                    map: map,
                                                    center: userPosition,
                                                    radius: zoom/*km*/
                                                };
                                                
                                                /*Création du cercle autour de l'utilisateur*/
                                                cityCircle = new google.maps.Circle(userOption);
                                                
                                            }/*fin flag*/
                                        }/*fin json status ok*/
                                    }/*fin success*/
                                });/*fin requete ajax*/
                            }/*fin scope variable*/
                            /*chaque variable de la fonction scopeVariable*/
                            scopeVariable();
                        }/*boucle concerts*/
                    }
                    /*s'il n y a pas de concert touvé dès le depart*/
                } else {
                    
                    if (navigator.geolocation) {                       
                        
                        var image = "images/redMarker.png";
                        /*création du marker utilisateur*/
                        var errorUserMarker = new google.maps.Marker({
                            /*position utilisateur*/
                            position: userPosition,
                            /*titre au dessus du marker*/
                            title: 'aucun concert :(',
                            /*image marker utilisateur personnalisée*/
                            icon: image,
                            draggable: true
                        });
                        
                        /*création du markeur utilisateur si aucun concert n'est comptabilisé*/
                        errorUserMarker.setMap(map);
                    }
                }/*Fin else*/
            }/*Fin success*/
        });/*Fin requête ajax*/        
        return false;
    });    
});