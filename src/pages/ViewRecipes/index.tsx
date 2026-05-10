import type { Recipe } from '../../shared/Intefaces'
import { RecipeCard } from '../../elements/RecipeCard'

type ViewRecipesProps = {
    recipes: Recipe[]
    setActiveRecipe: (recipe: Recipe) => void
    onBack: () => void
}

export const ViewRecipes = ({ recipes, setActiveRecipe, onBack }: ViewRecipesProps) => {
    return (
        <div className='container'>
            <div className='flex flex-space-between flex-center'>
                <h1 className='flex flex-center'>View Recipes</h1>
                <button type='button' className='button button--small button--outline' onClick={onBack}>
                    Back to Generate
                    <i className="fa-solid fa-chevron-right"/>
                </button>
            </div>
            <div className="grid grid__columns-3 card-grid">
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} onViewDetails={setActiveRecipe} />
                    ))
                ) : (
                    <h2 className='flex flex-center'>No recipes found.</h2>
                )}
            </div>
        </div>
    )
}
