import './shared/scss/index.scss'
import { ViewRecipes } from './pages/ViewRecipes'
import { useMemo, useState } from 'react'
import data from './assets/exampleResponse.json'
import type { Recipe } from './shared/Intefaces'
import { RecipeInformation } from './pages/RecipeInformation'

function App() {
  const recipes = useMemo<Recipe[]>(() => {
    return (data.results as any[]).map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenFree: recipe.glutenFree,
      dairyFree: recipe.dairyFree,
      extendedIngredients: (recipe.extendedIngredients ?? []).map((ingredient: any) => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`),
      ingredients: (recipe.extendedIngredients ?? []).map((ingredient: any) => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`),
      instructions: (recipe.analyzedInstructions ?? [])
        .flatMap((instruction: any) => instruction.steps ?? [])
        .map((step: any) => step.step ?? ''),
      nutrition: (recipe.nutrition?.nutrients ?? []).map((nutrient: any) => `${nutrient.amount}${nutrient.unit} ${nutrient.name}`)
    }))
  }, [])

  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)

  if (activeRecipe) {
    return <RecipeInformation recipe={activeRecipe} onBack={() => setActiveRecipe(null)} />
  }

  return <ViewRecipes recipes={recipes} setActiveRecipe={setActiveRecipe} />
}

export default App