import './shared/scss/index.scss'
import { ViewRecipes } from './pages/ViewRecipes'
import { useMemo, useState } from 'react'
import data from './assets/exampleResponse.json'
import type { Recipe } from './shared/Intefaces'
import { RecipeInformation } from './pages/RecipeInformation'
import { GenerateRecipe } from './pages/GenerateRecipe'

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
  
  const [state, setState] = useState({
    activeRecipe: null as Recipe | null,
    ingredients: [] as string[],
    selectedAllergies: [] as string[],
    selectedDiets: [] as string[],
    apiKey: '',
    loading: false as boolean,
    recipes: recipes as Recipe[],
    page: 'generate' as 'generate' | 'view'
  })

  const addIngredient = (ingredient: string) => {
    setState(prev => ({ ...prev, ingredients: [...prev.ingredients, ingredient] }))
  }

  const removeIngredient = (index: number) => {
    setState(prev => ({ ...prev, ingredients: prev.ingredients.filter((_, i) => i !== index) }))
  }

  const updateAllergies = (allergies: string[]) => {
    setState(prev => ({ ...prev, selectedAllergies: allergies }))
  }

  const updateDiets = (diets: string[]) => {
    setState(prev => ({ ...prev, selectedDiets: diets }))
  }

  const updateApiKey = (apiKey: string) => {
    setState(prev => ({ ...prev, apiKey }))
  }

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

  const generateRecipes = async () => {
    const { ingredients, selectedDiets, apiKey } = state
    console.log('Generating recipes with:', { ingredients, selectedDiets, apiKey })
    if (!ingredients.length || !apiKey) {
      console.error('Please add ingredients and API key')
      return
    }

    const ingredientQuery = ingredients.join(',')
    const dietQuery = selectedDiets.length > 0 ? selectedDiets[0].toLowerCase() : ''
    
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${ingredientQuery}&addRecipeInformation=true&fillIngredients=true&addRecipeNutrition=true&addRecipeInstructions=true&number=10`
    
    if (dietQuery) {
      url += `&diet=${dietQuery}`
    }

    setState(prev => ({ ...prev, loading: true }))
    try {
      const response = await fetch(url)
      const data = await response.json()
      // Process and store recipes
      console.log('Recipes fetched:', data)
      setState(prev => ({ ...prev, recipes: (data.results as any[]).map(mapRecipe), page: 'view' }))
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
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
    selectedAllergies={state.selectedAllergies}
    selectedDiets={state.selectedDiets}
    updateAllergies={updateAllergies}
    updateDiets={updateDiets}
    onGenerateRecipes={generateRecipes}
    apiKey={state.apiKey}
    updateApiKey={updateApiKey}
  />
}

export default App