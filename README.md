# Recipe Generator App

A small React + TypeScript + Vite application that generates recipe suggestions based on ingredients, diet preferences, and intolerances using the Spoonacular API.

## Features

- Generate recipes based on entered ingredients
- Optional diet preference selection
- Optional food intolerance selection
- Fetch detailed recipe information including:
  - Ingredients
  - Instructions
  - Nutrition data
  - Images
- View recipe details
---

## Tech Stack

- React
- TypeScript
- Vite
- Spoonacular API

---

## How It Works

1. Enter ingredients in the generate form
2. Optionally select diets and intolerances
3. Provide your Spoonacular API key
4. Click **Generate Recipes**

The app calls Spoonacular’s `complexSearch` endpoint with the following parameters:

```ts
query=<ingredient list>
addRecipeInformation=true
fillIngredients=true
addRecipeNutrition=true
addRecipeInstructions=true
number=10
```

The API response is mapped into the app’s `Recipe` shape and displayed in the `ViewRecipes` page.

From the results page, users can:
- View detailed recipe information
- Return to the generate page

---

## Project Structure

```bash
src/
│
├── App.tsx
│   Main app logic and state handling
│
├── components/
│   ├── GenerateRecipe.tsx
│   │   Ingredient input, diet/intolerance selection,
│   │   API key entry, and generate button
│   │
│   ├── ViewRecipes.tsx
│   │   Displays fetched recipes and includes the back button
│   │
│   └── RecipeInformation.tsx
│       Shows detailed recipe data for a selected recipe
```

---

## Getting a Spoonacular API Key

1. Visit the Spoonacular Food API website:

   [Spoonacular Food API](https://spoonacular.com/food-api?utm_source=chatgpt.com)

2. Sign up for a free account or log in

3. Open your dashboard or API section

4. Copy your API key

5. Paste the API key into the app when generating recipes

---

## Installation

Install dependencies:

```bash
npm install
```

---

## Running the App

Start the development server:

```bash
npm run dev
```

Open the app in your browser using the address shown in the terminal.

---

## Usage Notes

- You must provide:
  - At least one ingredient
  - A valid Spoonacular API key

- If no recipes are found, the app displays:

```text
No recipes found.
```

---

## Example Search

### Ingredients
```text
chicken, rice, broccoli
```

### Diet
```text
High Protein
```

### Intolerance
```text
Dairy
```

The app will generate recipe suggestions matching those preferences.

---

## License

This project is open source and available under the MIT License.