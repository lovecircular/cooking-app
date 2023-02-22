import { useEffect, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Input from "../../components/Input/Input";
import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

import type { Recipe } from "../../components/RecipeList/RecipeList";

import "./CreatePage.css";

type NewRecipe = Omit<Recipe, "id">;
type RecipeForm = Pick<NewRecipe, Exclude<keyof NewRecipe, "ingredients">> & {
  ingredients: string;
};

const initialFormData: RecipeForm = {
  title: "",
  method: "",
  image: "",
  cookingTime: 30,
  ingredients: "",
};

export default function CreatePage() {
  const { formData, updateFormField } = useForm<RecipeForm>(initialFormData);

  const { postData, data, error } = useFetch<NewRecipe>(
    `${process.env.REACT_APP_DB_URL}`,
    { method: "POST" }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ingredientsAsArray = formData.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    postData({
      ...formData,
      // Using Set will ensure that our values are unique
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
      ingredients: Array.from(new Set(ingredientsAsArray)),
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-right", className: "toast" });
    }

    //  Adding error to the dependency array ensures
    //  that useEffect will run every time error is updated
  }, [error]);

  // Redirect user when we get data response
  if (data) {
    return <Navigate to="/" />;
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <Toaster />
      <h1>Create recipe</h1>
      <p>
        Required fields are followed by{" "}
        <strong>
          <span aria-label="required">*</span>
        </strong>
      </p>
      <Input
        label="Title"
        name="title"
        placeholder="Veggie Pizza"
        value={formData.title}
        setValue={(e) => updateFormField(e)}
        required
      />
      <Input
        label="Image"
        name="image"
        type="url"
        placeholder="https://images.unsplash.com/your-image-url"
        value={formData.image}
        setValue={(e) => updateFormField(e)}
        required
      />
      <Input
        label="Ingredients (separated by a comma)"
        name="ingredients"
        placeholder="2 onions, 1 clove of garlic"
        value={formData.ingredients}
        setValue={(e) => updateFormField(e)}
      />
      <Input
        label="Method"
        multiline
        name="method"
        value={formData.method}
        setValue={(e) => updateFormField(e)}
        required
      />
      <Input
        label="Cooking time (in minutes)"
        name="cookingTime"
        type="number"
        value={formData.cookingTime}
        setValue={(e) => updateFormField(e)}
        required
      />
      <input type="submit" value="Create" className="btn btn-primary" />
    </form>
  );
}
