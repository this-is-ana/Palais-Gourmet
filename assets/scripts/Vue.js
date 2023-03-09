export default class Vue {
    //Affiche la liste de recettes
    listeRecette(liste) {
        let recettes = document.querySelector('.recettes');
        recettes.innerHTML = '<section class="liste"></section>';
        let recetteListe = document.querySelector('.liste');

        for (let obj of liste) {
            recetteListe.innerHTML +=
                `<article class="carte" id="${obj.id}" onclick="controleur.getRecetteIndex(${obj.id})">
                    <img src="assets/images/${obj.image}" alt="${obj.title}">
                    <p>${obj.title}</p>
                </article>`;
        }
    }

    //Affiche une seule recette
    uneRecette(recette) {
        let recettes = document.querySelector('.recettes');
        let txt =
            `<section class="sect1Recette" id="${recette.id}">
                <article class="art1Recette">
                    <img class="img1Recette" src="assets/images/${recette.image}" alt="${recette.title}">
                    <article>
                        <h2>${recette.title}</h2>
                        <ul>
                            <li>Temps de préparation: ${recette.preptime}</li>
                            <li>Temps de cuisson: ${recette.cooktime}</li>
                            <li>Portion: ${recette.portion}</li>
                        </ul>
                    </article>
                </article>
                <article>
                    <h3>Ingredients</h3>
                    <ul>
            `

        for (let ingredient of recette.ingredientList) { //Affiche la liste des ingrédients
            txt += `<li>${ingredient}</li>`
        }

        txt += `</ul>
                </article>
                <article>
                    <h3>Preparation</h3>
                    <ul>
                `

        for (let instruction of recette.instructionList) { //Affiche la liste des instructions
            txt += `<li>${instruction}</li>`
        }

        txt += `    </ul>
                </article>
            </section>`;

        recettes.innerHTML = txt;
    }

    //Affiche la page pas de résultat
    aucunResultat() {
        let recettes = document.querySelector('.recettes');

        recettes.innerHTML = '<p class="resultatZero">Pas de résultat.</p>';
    }

    //Basculer le tiroir gauche
    basculerTiroir() {
        let aside = document.getElementById("tiroir");
        aside.classList.toggle("afficher");
    }
}