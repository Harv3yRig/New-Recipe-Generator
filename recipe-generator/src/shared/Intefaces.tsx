export interface ExtendedIngredient {
    name: string;
    amount: number;
    unit: string;
    meta: string[];
}

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    extendedIngredients: ExtendedIngredient[];
    ingredients: Ingredient[];
    instructions: string[];
}

export const apiUrl = "https://api.spoonacular.com/recipes/complexSearch?"
    + "&apiKey=a2d710ecb97447adb544186973989382"
    + "&query={ingredients}"
    + "&diet={diet}"
    + "&addRecipeInformation=true"
    + "&fillIngredients=true"
    + "&addRecipeNutrition=true"
    + "&addRecipeInstructions=true"
    + "&number=10"
    + "&offset={offset}"