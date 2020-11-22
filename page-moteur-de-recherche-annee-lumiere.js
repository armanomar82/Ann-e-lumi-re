"use strict";

// définir votre clé d'accès à l'API de OMDb
let APIkey = "4f1d0ddb";

// création d'une fonction `dbSearch`
let dbSearch = async function(movieTitle) {
  try { 
    let url = `https://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle}&plot=full`;
    let response = await fetch(url, { cache: "no-cache" });
    let json = await response.json();
    if (json.Response != "False") {
      document.getElementById("Style").setAttribute("href","css/style.css");
      document.querySelector(".Bg-img").innerHTML=`.Bg{background-image: url('${json.Poster}'); } `;
      document.querySelector(".res").innerHTML =
        
        `<fieldset >`
        +`<legend>Résultat de la recherche ""</legend>`
        +`<h1>${json.Title}</h1>`
        +`<img src="${json.Poster}"  class= "poster" alt="affiche du film">`
        +`<ul class="discrip">`
        +`<li><span>Réalisateur :</span> ${json.Director}</li>`
        +`<li><span>Année de sortie : </span>${json.Year}</li>`
        +`<li><span>Durée : </span>${json.Runtime}</li>`
        +`<li><span>Avec : </span>${json.Actors}</li>`
        +`<li><span>Genre (en anglais) :</span> ${json.Genre}</li>`
        +`<li><span>Intrigue (en anglais) : </span>${json.Plot}</li>`
        +`</ul>`
        +`</fieldset>`;
    } else {
      document.querySelector(".res").innerHTML =
        `<fieldset>`
        +`<legend>Résultat de la recherche "${movieTitle}"</legend>`
        +`<p>Désolé mais je n'ai pas de résultat pour cette recherche (${json.Error})</p>`
        +`</fieldset>`;
    }
  } catch (error) {
    alert(`Aïe!\nZut!\nUne erreur (diabolique, forcément) est survenue :\n${error}`);
  }
}

// écoute l'envoi du formulaire
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // bloque l'envoi par défaut
  dbSearch(event.target[0].value); // récupère la valeur du premier élément et la transmet à notre fonction `dbSearch`
});

