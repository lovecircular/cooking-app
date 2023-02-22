import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CreatePage from "./pages/create/CreatePage";
import ErrorPage from "./pages/error/ErrorPage";
import HomePage from "./pages/home/HomePage";
import RecipePage from "./pages/recipe/RecipePage";
import SearchPage from "./pages/search/SearchPage";
import NavBar from "./components/NavBar/NavBar";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <ErrorPage />, // will be rendered if we go to a route that doesn't exist, eg /creating
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/recipe/:recipeId",
        element: <RecipePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

function LayoutWrapper() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
