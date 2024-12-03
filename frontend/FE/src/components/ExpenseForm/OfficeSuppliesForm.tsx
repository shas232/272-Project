import React, { useState } from 'react';
import { ExpenseFormProps, OfficeSuppliesExpense } from './types';
import { Package, FileText, BookIcon } from 'lucide-react';

export default function OfficeSuppliesForm({ onSubmit, isSubmitting }: ExpenseFormProps) {
  const [formData, setFormData] = useState<OfficeSuppliesExpense>({
    itemName: '',
    quantity: 1,
    unitPrice: 0,
    vendor: '',
    purchaseDate: '',
    department: '',
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

      const response = await fetch('http://localhost:5008/api/officeSupplies/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
  
      if (response.ok) {
        alert('Office Supplies expense submitted successfully!');
        setFormData({
          itemName: '',
          quantity: 1,
          unitPrice: 0,
          vendor: '',
          purchaseDate: '',
          department: '',
          purpose: '',
          receipts: []
        });
      } else {
        alert(result.message || 'Failed to submit expense');
      }
    } catch (error) {
      console.error('Error submitting office supplies expense:', error);
      alert('An error occurred while submitting the expense');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
        <div className="flex">
        <div className="flex-shrink-0">
            <BookIcon className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Expense Receipts</h3>
            <p className="text-sm text-green-700 mt-1">
              Please provide accurate information for proper expense tracking
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vendor
          </label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Unit Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select department</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="ENGINEERING">Engineering</option>
            <option value="HR">Human Resources</option>
            <option value="FINANCE">Finance</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Purpose
        </label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Receipts
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