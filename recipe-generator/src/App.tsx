import './shared/scss/index.scss'
import { ViewRecipes } from './pages/ViewRecipes'
import { useMemo } from 'react'
import data from './assets/exampleResponse.json'
import type { Recipe } from './shared/Intefaces'

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
      extendedIngredients: (recipe.extendedIngredients ?? []).map((ingredient: any) => ({
        name: ingredient.name ?? '',
        amount: ingredient.amount ?? 0,
        unit: ingredient.unit ?? '',
        meta: Array.isArray(ingredient.meta) ? ingredient.meta : [],
      })),
      ingredients: (recipe.extendedIngredients ?? []).map((ingredient: any) => ({
        name: ingredient.name ?? '',
        amount: ingredient.amount ?? 0,
        unit: ingredient.unit ?? '',
      })),
      instructions: (recipe.analyzedInstructions ?? [])
        .flatMap((instruction: any) => instruction.steps ?? [])
        .map((step: any) => step.step ?? ''),
    }))
  }, [])

  return (
    <>
      <ViewRecipes recipes={recipes} />
    </>
  )
}

export default App