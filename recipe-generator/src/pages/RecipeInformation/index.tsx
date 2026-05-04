import type { Recipe } from "../../shared/Intefaces";
import { jsPDF } from "jspdf";
import './index.scss';

type RecipeInformationProps = {
    recipe: Recipe
    onBack: () => void
}

const CreatePDFSection = (content: string, fontSize: number, doc: jsPDF, x: number, y: number) => {
    doc.setFontSize(fontSize)
    doc.text(content, x, y);
}

const CreatePDFColumSection = (title: string, items: string[], doc: jsPDF, x: number, y: number, maxWidth: number = 85) => {
    CreatePDFSection(title, 14, doc, x, y);
    
    doc.setFontSize(10);
    let currentY = y + 7;
    const lineHeight = 7;
    
    items.forEach((item, index) => {
        const lines = doc.splitTextToSize(`${index + 1}. ${item}`, maxWidth);
        doc.text(lines, x, currentY);
        currentY += lines.length * lineHeight;
    });
}

export const RecipeInformation = ({ recipe, onBack }: RecipeInformationProps) => {
    const downloadRecipeAsPDF = () => {
        const doc = new jsPDF();
        const titleStartY = 10;
        CreatePDFSection(recipe.title, 18, doc, 10, titleStartY);
        CreatePDFSection(`Ready in: ${recipe.readyInMinutes} minutes`, 12, doc, 10, titleStartY + 10);
        CreatePDFSection(`Servings: ${recipe.servings}`, 12, doc, 10, titleStartY + 18);
        CreatePDFColumSection('Ingredients', [...recipe.ingredients, ...recipe.extendedIngredients], doc, 10, titleStartY + 34);
        CreatePDFColumSection('Instructions', recipe.instructions, doc, 110, titleStartY + 34);
        doc.save(`${recipe.title}.pdf`);
    }
    return (
        <div className="grid recipe-information">
            <div className="flex flex-center recipe-information__image">
                <img className="recipe-information__image-img" src={recipe.image} alt={recipe.title} />
                <i className="fa-solid fa-chevron-right image-chevron"/>
            </div>
            <div className="recipe-information__content container">
                <h1>{recipe.title}</h1>
                <div className="flex flex-space-between recipe-information__content">
                    <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                    <p><strong> {recipe.servings} {recipe.servings === 1 ? "Serving" : "Servings"}</strong></p>
                </div>
                {RecipeInformationAccordion("Ingredients", [...recipe.ingredients, ...recipe.extendedIngredients], false)}
                {RecipeInformationAccordion("Instructions", recipe.instructions, true)}
                {RecipeInformationAccordion("Nutrition", recipe.nutrition, false)}
                <div className="flex flex-space-between">
                    <button className="button" onClick={onBack}>
                        Back to Recipes
                        <i className="fa-solid fa-chevron-right"/>
                    </button>
                    <button className="button" onClick={downloadRecipeAsPDF}>
                        Download as PDF
                    </button>
                </div>
            </div>
        </div>
    )
}

const RecipeInformationAccordion = (title: string, array: string[], numberedList: boolean) => {
    return (
        <details name="details" className="recipe-information__details">
            <summary className="flex flex-space-between recipe-information__details-summary">{title}
                <div className="summary-icon"/>
            </summary>
            {numberedList ? (
                <ol>
                    {array.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            ) : (
                <ul>
                    {array.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </details>
    )
}