import type { Recipe } from '../../shared/Intefaces'
import { RecipeCard } from '../../elements/RecipeCard'

type ViewRecipesProps = {
    recipes: Recipe[]
}

export const ViewRecipes = ({ recipes }: ViewRecipesProps) => {
    return (
        <div className='container'>
            <h1 className='flex flex-center'>View Recipes</h1>
            <div className="grid grid__columns-3 card-grid">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}
