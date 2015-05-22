/*Auto Complet jQuery UI de l'onglet "Concert par groupe"*/
$(function() {
        $("#concert").hide();
        $("#concertDescription").hide();
        /*Auto complet*/
        $("#nom_groupe").autocomplete({
            source: 'getConcert.php',
            /*une lettre pour commencer la recherche en BDD*/
            minLength: 1,
            dataType: "json",            
            select: function(event, ui) {
                /*On ferme le champ de sélection de l'utilisateur pour ensuite ouvrire la div concert
                 pour y afficher les informations sur le concert choisis*/
                $('#selection').hide();
                $("#concert").fadeIn('slow');
                //s'il y a des concerts en retour.(s'il n'y a pas de concert,rien ne s'affiche pour l'utilisateur)
                if (ui.item) {
                    $("#concertDescription").fadeIn('slow');
                    $("#description_concert").html('<br><div class="etiquette">description</div> <br>' + ui.item.description_concert);                   
                    $('#nom_concert').html('Concert :' + ui.item.nom_concert);
                    $('#prix_concert').html('prix :' + ui.item.prix_concert + ' â‚¬');
                    $('#genre_groupe').html('Genre :' + ui.item.genre_groupe);
                    $('#image_concert').attr('src', 'images/' + ui.item.image_concert);
                    $('#date_concert').html('Date :' + ui.item.date_concert);
                }
            }
        });
        
        /*Arrête l'envoi du formulaire si l'utilisateur appuie sur entrée*/
         $('#formConcert').submit(function() {
            return false;
        });
});