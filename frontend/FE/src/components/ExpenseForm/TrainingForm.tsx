import React, { useState } from 'react';
import { ExpenseFormProps } from './types';
import { FileText, GraduationCap } from 'lucide-react';

interface TrainingExpense {
  courseTitle: string;
  providerName: string;
  startDate: string;
  endDate: string;
  amount: number;
  trainingType: string;
  businessPurpose: string;
  receiptFiles: File[];
}

export default function TrainingForm({ onSubmit, isSubmitting }: ExpenseFormProps) {
  const [formData, setFormData] = useState<TrainingExpense>({
    courseTitle: '',
    providerName: '',
    startDate: '',
    endDate: '',
    amount: 0,
    trainingType: '',
    businessPurpose: '',
    receiptFiles: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        receiptFiles: Array.from(e.target.files || []),
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

      const response = await fetch('http://54.159.98.140:5008/api/training/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Training expense submitted successfully!');
        setFormData({
          courseTitle: '',
          providerName: '',
          startDate: '',
          endDate: '',
          amount: 0,
          trainingType: '',
          businessPurpose: '',
          receiptFiles: [],
        });
      } else {
        alert(result.message || 'Failed to submit expense');
      }
    } catch (error) {
      console.error('Error submitting training expense:', error);
      alert('An error occurred while submitting the expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <div className="flex">
        <div className="flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800"> Training Expense Receipts</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Please provide accurate information for proper expense tracking
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Title {/* Updated label */}
          </label>
          <input
            type="text"
            name="courseTitle" // Updated field name
            value={formData.courseTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Training Provider Name {/* Updated label */}
          </label>
          <input
            type="text"
            name="providerName" // Updated field name
            value={formData.providerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Training Type {/* Updated label */}
          </label>
          <input
            type="text"
            name="trainingType" // Updated field name
            value={formData.trainingType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Purpose {/* Updated label */}
          </label>
          <input
            type="text"
            name="businessPurpose" // Updated field name
            value={formData.businessPurpose}
            onChange={handleChange}
            required
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

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Training Expense'}
          </button>
        </div>
      </div>
    </form>
  );
}
