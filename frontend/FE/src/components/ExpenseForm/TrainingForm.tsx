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
      const response = await fetch('http://localhost:5008/api/training/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
            Upload Receipt Files
          </label>
          <input
            type="file"
            name="receiptFiles"
            onChange={handleFileChange}
            multiple
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
