import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import RecipeList, {
  type Recipe,
} from "../../components/RecipeList/RecipeList";

export default function SearchPage() {
  let [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data, error } = useFetch<Recipe[]>(
    `${process.env.REACT_APP_DB_URL}?q=${query}`
  );

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

  return (
    <>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {/* Only render the recipe list if there is one or more recipes */}
      {data.length >= 1 ? (
        <RecipeList recipes={data} />
      ) : (
        <p>There are no recipes for this search term.</p>
      )}
    </>
  );
}
