import React, { useState } from 'react';
import { ExpenseFormProps } from './types';
import { FileText, Users, ForkKnifeCrossed } from 'lucide-react';

interface MealsExpense {
  restaurantName: string;
  date: string;
  numberOfAttendees: number;
  attendeeNames: string;
  mealType: string;
  totalAmount: number;
  purpose: string;
  receipts: File[];
}

export default function MealsForm({ onSubmit, isSubmitting }: ExpenseFormProps) {
  const [formData, setFormData] = useState<MealsExpense>({
    restaurantName: '',
    date: '',
    numberOfAttendees: 1,
    attendeeNames: '',
    mealType: '',
    totalAmount: 0,
    purpose: '',
    receipts: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        receipts: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const user = localStorage.getItem('user');
      let employee = null;

      if (user) {
        try {
          const parsedUser = JSON.parse(user); // Parse the JSON string
          employee = parsedUser.username; // Access the username
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
        }
      }

      const dataToSend = {
        ...formData,
        employee, 
      };

      const response = await fetch('http://54.162.232.80:5008/api/meals/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
  
      if (response.ok) {
        alert('Meal expense submitted successfully!');
        setFormData({
          restaurantName: '',
          date: '',
          numberOfAttendees: 1,
          attendeeNames: '',
          mealType: '',
          totalAmount: 0,
          purpose: '',
          receipts: [],
        });
      } else {
        alert(result.message || 'Failed to submit meal expense');
      }
    } catch (error) {
      console.error('Error submitting meal expense:', error);
      alert('An error occurred while submitting the expense');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex">
        <div className="flex-shrink-0">
            <ForkKnifeCrossed className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Dining Receipts</h3>
            <p className="text-sm text-red-700 mt-1">
              Please provide accurate information for proper expense tracking
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Attendees
          </label>
          <input
            type="number"
            name="numberOfAttendees"
            value={formData.numberOfAttendees}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meal Type
          </label>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="CLIENT_MEETING">Client Meeting</option>
            <option value="TEAM_EVENT">Team Event</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Attendee Names
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
            <Users className="h-5 w-5" />
          </span>
          <textarea
            name="attendeeNames"
            value={formData.attendeeNames}
            onChange={handleChange}
            required
            placeholder="Enter names of all attendees (one per line)"
            rows={3}
            className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Purpose
        </label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Describe the business purpose of this meal"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Receipt
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload files</span>
                <input
                  type="file"
                  name="receipts"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                  accept="image/*,.pdf"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Expense'}
        </button>
      </div>
    </form>
  );
}