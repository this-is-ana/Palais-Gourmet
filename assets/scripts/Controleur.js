import Recette from "./Recette.js";
import Vue from "./Vue.js";

window.onload = function() {
    window.controleur = new Controleur();
}

class Controleur {
    constructor() {
        this.vue = new Vue();
        this.recettes = Array();

        this.init();
    }

    //Traitement initial
    init() {
        let url = 'recettes.xml';

        fetch(url)
            .then(reponse => reponse.text()) //Recevoir une chaîne de caractères contenant le XML
            .then(xmlText => this.remplirTableau(xmlText)) //Remplir le tableau d'objets avec les informations du XML
    }

    //Remplir le tableau d'objet avec les informations du XML
    remplirTableau (xmlText) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlText, "application/xml"); // Remplir le tableau d'objets avec les informations du XML
        let tabRecettes = xmlDoc.getElementsByTagName("recipe"); // Contient un tableaux de recettes XML

        for (let i = 0; i < tabRecettes.length; i++) {
            let recette = new Recette(); //Créer une nouvelle recette
            
            recette.id = +tabRecettes[i].getAttribute("id");
            recette.title = tabRecettes[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            recette.image = tabRecettes[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
            recette.category = tabRecettes[i].getElementsByTagName("category")[0].childNodes[0].nodeValue;
            recette.preptime = tabRecettes[i].getElementsByTagName("preptime")[0].childNodes[0].nodeValue;
            recette.cooktime = tabRecettes[i].getElementsByTagName("cooktime")[0].childNodes[0].nodeValue;
            recette.portion = tabRecettes[i].getElementsByTagName("yield")[0].childNodes[0].nodeValue;

            let tabIngredient = tabRecettes[i].getElementsByTagName("ingredient_list")[0].getElementsByTagName("ingredient");
            recette.ingredientList = Array();

            for (let ingredient of tabIngredient) {
                recette.ingredientList.push(ingredient.childNodes[0].nodeValue);
            }

            let tabInstruction = tabRecettes[i].getElementsByTagName("instruction_list")[0].getElementsByTagName("instruction");
            recette.instructionList = Array();
            
            for (let instruction of tabInstruction) {
                recette.instructionList.push(instruction.childNodes[0].nodeValue);
            }

            this.recettes.push(recette); //Ajouter la recette dans le tableau de recettes
        }

        this.vue.listeRecette(this.recettes);
    }

    //Afficher une recette selon son index
    getRecetteIndex(id) {
        for(let recette of this.recettes) {
            if(recette.id == id)
                this.vue.uneRecette(recette);
        }
    }

    //Afficher la liste de recettes
    afficherListe(choixCategorie) {
        if(choixCategorie == null) //Sans catégorie d'affichage
            this.vue.listeRecette(this.recettes);
        else { //Avec catégorie d'affichage
            let tabRecettes = [];

            for (let recette of this.recettes) {
                if(recette.category.toLowerCase() == choixCategorie)
                    tabRecettes.push(recette);
            }

            if (tabRecettes.length != 0)
                this.vue.listeRecette(tabRecettes);
            else
                this.vue.aucunResultat();
        }
    }

    //Rechercher les recettes selon une valeur entrée
    rechercher(recherche) {
        let tabRecettes = [];
            
        for (let recette of this.recettes) {
            let trouve = true;
            
            if(recherche != "") {
                if (
                    recette.title.toLowerCase().indexOf(recherche.toLowerCase()) == -1 &&
                    recette.category.toLowerCase().indexOf(recherche.toLowerCase()) == -1 &&
                    recette.ingredientList.filter((ingredient) => ingredient.toLowerCase().indexOf(recherche.toLowerCase()) != -1).length == 0 &&
                    recette.instructionList.filter((instruction) => instruction.toLowerCase().indexOf(recherche.toLowerCase()) != -1).length == 0
                ) 
                    trouve = false;
            }
            
            if (trouve)
                tabRecettes.push(recette);
        }

        if (tabRecettes.length != 0)
            this.vue.listeRecette(tabRecettes);
        else
            this.vue.aucunResultat();
    }
}