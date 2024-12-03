import React from 'react';
import Navbar from '../Navbar';
import ExpenseForm from '../ExpenseForm';
import { useAuth } from '../../hooks/useAuth';
interface EmployeeDashboardProps {
  user: { username: string; role: string };
  onLogout: () => void;
}

export default function EmployeeDashboard() {

  return (
    <div>
      
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Submit Expense</h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the form below to submit a new expense for approval
            </p>
          </div>
          <ExpenseForm />
        </div>
      </main>
    </div>
  );
}