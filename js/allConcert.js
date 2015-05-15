/*Requête ajax pour remonter tout les concerts de l'onglet "Tous les concerts"*/
$(function() {
    $.ajax({
        url: 'findConcert.php',
        dataType: 'json',
        success: function(concert) {
            for (i = 0; i < concert.length; i++) {
                var adresseConcert = concert[i]['adresseConcert'];
                var nom_concert = concert[i][2]['nom_concert'];
                var groupes = concert[i][0]['title'];                
                var prix_concert = concert[i][3]['prix_concert'];
                var date_concert = concert[i][4]['date_concert'];
                var image_concert = concert[i][5]['image_concert'];

                $('#nom_groupe_concert').append(
                    '<p>Concert : ' + nom_concert +
                    '<br>Date : ' + date_concert +
                    '<br> Groupes : ' + groupes +
                    '<br> Adresse : ' + adresseConcert +
                    '<br>Prix : ' + prix_concert + ' â‚¬' + '</p><img src="images/'
                    + image_concert + '" class="image_concert" /> '
                );
               }
            }
        });
    });