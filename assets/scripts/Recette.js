export default class Recette {
    id;
    title;
    image;
    category;
    preptime;
    cooktime;
    portion;
    ingredientList;
    instructionList;

    constructor(id, title, image, category, preptime, cooktime, portion, ingredientList, instructionList) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.category = category;
        this.preptime = preptime;
        this.cooktime = cooktime;
        this.portion = portion;
        this.ingredientList = ingredientList;
        this.instructionList = instructionList;
    }
}