import { type Recipe } from '../../shared/Intefaces'
import './index.scss';

export const RecipeCard = ({ recipe, onViewDetails }: { recipe: Recipe, onViewDetails: (recipe: Recipe) => void }) => {
    const diets = [];
    if (recipe.vegetarian) diets.push('Vegetarian');
    if (recipe.vegan) diets.push('Vegan');
    if (recipe.glutenFree) diets.push('Gluten Free');
    if (recipe.dairyFree) diets.push('Dairy Free');

    return (
        <div className="recipe-card">
            <img className='recipe-card__image' src={recipe.image} alt={recipe.title} />
            <div className='recipe-card__content'>
                <h2>{recipe.title}</h2>
                <div className='recipe-card__inner'>
                    <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                    {diets.length > 0 && 
                    <div className='recipe-card__pills'>
                        {diets.map((diet, index) => (
                            <p key={index} className='recipe-card__pills-pill'>{diet}</p>
                        ))}
                    </div>
                    }
                    <button className='button' onClick={() => onViewDetails(recipe)}>
                        View Details
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                </div>
            </div>
        </div>
    )
}