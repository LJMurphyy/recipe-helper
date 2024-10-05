import type { LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Form, useActionData } from "@remix-run/react";
import * as search from "../api/json/v1/1/search.php";
import { useState } from "react";
import { RecipeDetail } from "~/components/RecipeDetail";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const formData = await request.formData();
  if (formData.has("s")) {
    url.searchParams.set("s", formData.get("s") as string);
  }

  const response = await search.GET(url);
  const data = await response.json();
  return json(data);
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [activeMeal, setActiveMeal] = useState<search.Meal | null>(null);
  return (
    <div className="container mx-auto p-5">
      <header className="text-center mb-10">
        <h1 className="text-4xl text-blue-500 mb-4">Recipe Finder</h1>
        <a
          href="https://github.com/LJMurphyy/recipe-finder"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link inline-block px-5 py-2.5 my-5 text-lg text-white bg-blue-500 border-none rounded transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
        >
          View Source Code on GitHub
        </a>

        <Form className="flex justify-center mb-10" method="POST">
          <input
            name="s"
            type="text"
            placeholder="Search for a recipe..."
            className="p-3 border border-gray-300 rounded w-72 text-base"
          />
          <button className="ml-3 px-5 py-3 bg-blue-500 text-white text-base rounded transition duration-300 hover:bg-blue-600">
            Search
          </button>
        </Form>
      </header>
      <div className="flex flex-wrap justify-center gap-5">
        {actionData?.meals?.map((meal) => (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setActiveMeal(meal);
              }
            }}
            onClick={() => setActiveMeal(meal)}
            key={meal.idMeal}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden w-96 cursor-pointer transition transform hover:scale-105 shadow-md"
          >
            <h2 className="text-lg my-2 text-center">{meal.strMeal}</h2>
            {meal.strMealThumb && (
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover"
              />
            )}
          </div>
        ))}
      </div>
      {activeMeal ? (
        <RecipeDetail meal={activeMeal} onClose={() => setActiveMeal(null)} />
      ) : null}
    </div>
  );
}
