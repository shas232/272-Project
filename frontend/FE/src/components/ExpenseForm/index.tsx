import React from "react";
import { ExpenseCategory } from "./types";
import { useExpenseForm } from "../ExpenseForm//useExpenseForm";
import TravelForm from "./TravelForm";
import AccommodationForm from "./AccommodationForm";
import OfficeSuppliesForm from "./OfficeSuppliesForm";
import MealsForm from "./MealsForm";
import TrainingForm from "./TrainingForm";
import {
  AlertCircle,
  CheckCircle,
  Plane,
  Building2,
  ShoppingBag,
  Utensils,
  GraduationCap,
} from "lucide-react";

export default function ExpenseForm() {
  const {
    selectedCategory,
    setSelectedCategory,
    isSubmitting,
    analysisResult,
    handleSubmit,
  } = useExpenseForm();

  const categories = [
    { id: "TRAVEL", name: "Travel", icon: Plane, color: "blue" },
    {
      id: "ACCOMMODATION",
      name: "Accommodation",
      icon: Building2,
      color: "purple",
    },
    {
      id: "OFFICE",
      name: "Office Supplies",
      icon: ShoppingBag,
      color: "green",
    },
    {
      id: "MEALS",
      name: "Meals & Entertainment",
      icon: Utensils,
      color: "orange",
    },
    {
      id: "TRAINING",
      name: "Training & Development",
      icon: GraduationCap,
      color: "pink",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Submit Expense
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.id as ExpenseCategory)
              }
              className={`relative flex flex-col items-center p-4 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? `bg-${category.color}-50 border-2 border-${category.color}-500`
                  : "bg-white border-2 border-gray-200 hover:border-gray-300"
              }`}
            >
              <category.icon
                className={`w-6 h-6 mb-2 ${
                  selectedCategory === category.id
                    ? `text-${category.color}-500`
                    : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  selectedCategory === category.id
                    ? `text-${category.color}-700`
                    : "text-gray-600"
                }`}
              >
                {category.name}
              </span>
              {selectedCategory === category.id && (
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-${category.color}-500 flex items-center justify-center`}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="border-t border-gray-200 pt-8">
            {selectedCategory === "TRAVEL" && (
              <TravelForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}

            {selectedCategory === "ACCOMMODATION" && (
              <AccommodationForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {selectedCategory === "OFFICE" && (
              <OfficeSuppliesForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {selectedCategory === "MEALS" && (
              <MealsForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}

            {selectedCategory === "TRAINING" && (
              <TrainingForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        )}

        {analysisResult && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              analysisResult.isFraudulent
                ? "bg-red-50 border-l-4 border-red-500"
                : "bg-green-50 border-l-4 border-green-500"
            }`}
          >
            <div className="flex items-start space-x-3">
              {analysisResult.isFraudulent ? (
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              )}
              <div>
                <h3
                  className={`text-sm font-medium ${
                    analysisResult.isFraudulent
                      ? "text-red-800"
                      : "text-green-800"
                  }`}
                >
                  {analysisResult.isFraudulent
                    ? "Expense Flagged"
                    : "Expense Approved"}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {analysisResult.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
