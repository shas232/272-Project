import React, { useState } from 'react';
import { ExpenseFormProps } from '../types';
import { Plane, Building2 } from 'lucide-react';
import FlightForm from './FlightForm';
import HotelForm from './HotelForm';

type TravelExpenseType = 'FLIGHT' | 'HOTEL';

export default function TravelForm({ onSubmit, isSubmitting }: ExpenseFormProps) {
  const [expenseType, setExpenseType] = useState<TravelExpenseType>('FLIGHT');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setExpenseType('FLIGHT')}
          className={`flex-1 inline-flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-colors ${
            expenseType === 'FLIGHT'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Plane className={`w-5 h-5 mr-2 ${
            expenseType === 'FLIGHT' ? 'text-blue-500' : 'text-gray-400'
          }`} />
          Flight Expense
        </button>
        
        <button
          type="button"
          onClick={() => setExpenseType('HOTEL')}
          className={`flex-1 inline-flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-colors ${
            expenseType === 'HOTEL'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Building2 className={`w-5 h-5 mr-2 ${
            expenseType === 'HOTEL' ? 'text-green-500' : 'text-gray-400'
          }`} />
          Hotel Expense
        </button>
      </div>

      {expenseType === 'FLIGHT' ? (
        <FlightForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      ) : (
        <HotelForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </div>
  );
}