import RecipeList, {
  type Recipe,
} from "../../components/RecipeList/RecipeList";
import { useFetch } from "../../hooks/useFetch";

import "./HomePage.css";

export default function HomePage() {
  const { data, error } = useFetch<Recipe[]>(process.env.REACT_APP_DB_URL);

  if (error)
    return (
      <p aria-live="polite" role="status">
        {error.message}
      </p>
    );
  if (!data)
    return (
      <p aria-live="polite" role="status">
        Loading...
      </p>
    );

  return <RecipeList recipes={data} />;
}
