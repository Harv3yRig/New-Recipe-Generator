import { useState } from 'react';
import './index.scss';
import { RadialMenu } from '../../elements/RadialMenu';

interface GenerateRecipeProps {
  ingredients: string[];
  addIngredient: (ingredient: string) => void;
  removeIngredient: (index: number) => void;
  updateDiets: (diets: string[]) => void;
  updateIntolerances: (intolerances: string[]) => void;
  onGenerateRecipes: () => void;
  apiKey: string;
  updateApiKey: (apiKey: string) => void;
}

export const GenerateRecipe = ({ 
  ingredients, 
  addIngredient, 
  removeIngredient,
  updateIntolerances,
  updateDiets,
  onGenerateRecipes,
  apiKey,
  updateApiKey
}: GenerateRecipeProps) => {
  const [ingredientInput, setIngredientInput] = useState('');

  const handleAddIngredient = () => {
    const trimmed = ingredientInput.trim();
    if (!trimmed) return;
    addIngredient(trimmed);
    setIngredientInput('');
  };

  const handleIngredientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  return (
    <div className="generate-recipe container">
      <h1>Generate Recipe</h1>
      <div className='grid grid__columns-2'>
        <div className='flex flex-column generate-recipe__parameters'>
          <h2>Enter Ingredients</h2>
          <div className='generate-recipe__parameters-list'>
            <input
              name="ingredient"
              type="text"
              placeholder='Enter ingredient...'
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleIngredientKeyDown}
            />
            {ingredients.length > 0 && (
              <ul className='flex flex-column ingredients-list'>
                {ingredients.map((ing, index) => (
                  <li className='flex flex-space-between ingredients-list-item' id={ing} key={index}>
                    {ing}
                    <button
                      type="button"
                      className="ingredient-remove"
                      onClick={() => removeIngredient(index)}
                    >
                      <i className="fa-solid fa-x" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <input 
              className='generate-recipe__key' 
              name='apiKey' 
              required 
              type='text' 
              placeholder='Enter API key...' 
              value={apiKey}
              onChange={(e) => updateApiKey(e.target.value)}
            />
            <button className='button button--large button--solid' type='button' onClick={onGenerateRecipes}>Generate Recipes</button>
          </div>
        </div>
        <div className='flex flex-column generate-recipe__filters'>
          <h2>Allergies/Dietary Requirements</h2>
          <RadialMenu inputs={['Dairy', 'Gluten', 'Nuts', 'Shellfish']} onSelectionChange={updateIntolerances} />
          <RadialMenu inputs={['Vegan', 'Vegetarian', 'Pescatarian', 'Keto']} onSelectionChange={updateDiets} />
        </div>
      </div>
    </div>
  )
}