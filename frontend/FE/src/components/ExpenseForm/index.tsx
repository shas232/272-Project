import React, { useState, useEffect } from 'react';
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

  interface Expense {
    id: number;
    category: string;
    date: string;
    amount: string;
    status: string;
  }

  interface ExpenseApiResponse {
    success: boolean;
    expenses: Expense[];
  }
  
  const [expenseHistory, setExpenseHistory] = useState<Expense[]>([]);


  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {       
        const luser=localStorage.getItem('user');
  
        const user=JSON.parse(luser)
         
         const response = await fetch(`http://3.90.114.66:5008/api/expenses/${user.username}`);
 
        const contentType = response.headers.get("Content-Type");
  
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid content type: Expected application/json");
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        if (data.success) {
          setExpenseHistory(data.expenses);
        }
      } catch (error) {
        console.error("Error fetching expense history:", error);
      }
    };
  
    fetchExpenseHistory();
  }, []);
  
  
  

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
      color: "red",
    },
    {
      id: "TRAINING",
      name: "Training & Development",
      icon: GraduationCap,
      color: "yellow",
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
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center`}
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

      {/* Expense History Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Expense History</h2>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {expenseHistory.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4">{expense.category}</td>
                <td className="px-6 py-4">{expense.amount}</td>
                <td className={`px-6 py-4 font-medium ${expense.status === "Flagged" ? "text-red-600" : expense.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
                  {expense.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
