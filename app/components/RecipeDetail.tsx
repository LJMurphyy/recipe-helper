import type { Meal } from "../api/json/v1/1/search.php";

export function RecipeDetail({
  meal,
  onClose,
}: {
  meal: Meal;
  onClose(): void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-3xl w-full h-auto relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">
          {meal.strMeal}
        </h2>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-1/2 h-auto object-cover mx-auto mb-4 rounded-lg"
        />
        <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
        <p className="text-base leading-6">{meal.strInstructions}</p>
      </div>
    </div>
  );
}
