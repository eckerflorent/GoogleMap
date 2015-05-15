<!--requete AJAX pour trouver les concerts liÈs ‡ un groupe-->
<script src="js/getConcert.js"></script>  


<section>
    <!--formulaire--> 
    <form action="" method="POST" id="formConcert">
        <small>(Recherche √† effectuer avec Foo Fighters, Blur, Deftones, Marcus Miller<br>
            dans un rayon de 100km autour de paris sinon cr√©ez des concerts dans vos alentours)</small><br><br>
        <label for="nom_groupe" style="width: 39%;">Je veux aller voir :</label>
        <input type="text" name="nom_groupe" id="nom_groupe" />        
    </form>
    
    <!--l'article receptionne le concert trouvÈ-->
    <article >
        <div id="no_date"></div>
        <section id="concert" >
           
            <div id="nom_concert" class="etiquette"></div><br>           
            <div id="prix_concert" class="etiquette"></div><br>
            <div id="genre_groupe" class="etiquette"></div><br>
            <div id="date_concert" class="etiquette"></div><br>
            <img src="" id="image_concert" />
        </section>
        <section id="concertDescription">
            <div id="description_concert" > </div>
        </section>
    </article >
    <h1 id="selection">Trouve ton groupe et va √† leur<br><br> concerts tres prochainement</h1>
</section>