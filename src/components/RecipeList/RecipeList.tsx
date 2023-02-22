import { Link } from "react-router-dom";
import { getCookingTime } from "../../utils/getCookingTime";

import "./RecipeList.css";

export type Recipe = {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  method: string;
  cookingTime: number;
};

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <article key={recipe.id} className="recipe-card">
          <div className="image-wrapper">
            <img src={recipe.image} alt="" />
          </div>
          <h3>{recipe.title}</h3>
          <time dateTime={getCookingTime(recipe.cookingTime).dateTime}>
            {getCookingTime(recipe.cookingTime).readable}
          </time>
          <p>
            {recipe.method.substring(0, 80)}
            {recipe.method.length > 80 ? "..." : ""}
          </p>
          <Link to={`/recipe/${recipe.id}`} className="btn btn-secondary">
            View recipe
          </Link>
        </article>
      ))}
    </div>
  );
}
