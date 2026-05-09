import './shared/scss/index.scss'
import { ViewRecipes } from './pages/ViewRecipes'
import { useState } from 'react'
import type { Recipe } from './shared/Intefaces'
import { RecipeInformation } from './pages/RecipeInformation'
import { GenerateRecipe } from './pages/GenerateRecipe'

function App() {
  const [state, setState] = useState({
    activeRecipe: null as Recipe | null,
    ingredients: [] as string[],
    selectedIntolerances: [] as string[],
    selectedDiets: [] as string[],
    apiKey: '',
    loading: false as boolean,
    recipes: [] as Recipe[],
    page: 'generate' as 'generate' | 'view'
  })

  const mapRecipe = (recipe: any): Recipe => ({
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
  })

  const addIngredient = (ingredient: string) => {
    setState(prev => ({ ...prev, ingredients: [...prev.ingredients, ingredient] }))
  }

  const removeIngredient = (index: number) => {
    setState(prev => ({ ...prev, ingredients: prev.ingredients.filter((_, i) => i !== index) }))
  }

  const updateDiets = (diets: string[]) => {
    setState(prev => ({ ...prev, selectedDiets: diets }))
  }

  const updateIntolerances = (intolerances: string[]) => {
    setState(prev => ({ ...prev, selectedIntolerances: intolerances }))
  }

  const updateApiKey = (apiKey: string) => {
    setState(prev => ({ ...prev, apiKey }))
  }

  const generateRecipes = async () => {
    const { ingredients, selectedDiets, apiKey, selectedIntolerances } = state
    console.log('Generating recipes with:', { ingredients, selectedDiets, apiKey, selectedIntolerances })
    if (!ingredients.length || !apiKey) {
      console.error('Please add ingredients and API key')
      return
    }

    const ingredientQuery = ingredients.join(',')
    const dietQuery = selectedDiets.join(',') || ''
    const intoleranceQuery = selectedIntolerances.join(',') || ''
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${ingredientQuery}&addRecipeInformation=true&fillIngredients=true&addRecipeNutrition=true&addRecipeInstructions=true&number=10`
    
    if (dietQuery) {
      url += `&diet=${dietQuery}`
    }

    if (intoleranceQuery) {
      url += `&intolerances=${encodeURIComponent(intoleranceQuery)}`
    }

    setState(prev => ({ ...prev, loading: true }))
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log('Recipes fetched:', data)
      setState(prev => ({ ...prev, recipes: (data.results as any[]).map(mapRecipe), page: 'view', loading: false }))
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  if (state.activeRecipe) {
    return <RecipeInformation recipe={state.activeRecipe} onBack={() => setState(prev => ({ ...prev, activeRecipe: null }))} />
  }

  if (state.page === 'view') {
    return <ViewRecipes recipes={state.recipes} setActiveRecipe={(recipe) => setState(prev => ({ ...prev, activeRecipe: recipe }))} />
  }

  return <GenerateRecipe 
    ingredients={state.ingredients} 
    addIngredient={addIngredient} 
    removeIngredient={removeIngredient}
    updateDiets={updateDiets}
    updateIntolerances={updateIntolerances}
    onGenerateRecipes={generateRecipes}
    apiKey={state.apiKey}
    updateApiKey={updateApiKey}
  />
}

export default App