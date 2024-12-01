import React from 'react';
import Navbar from '../Navbar';
import DashboardStats from '../DashboardStats';
// import ExpenseTable from '../ExpenseTable';
import RiskInsights from '../RiskInsights';
import AnomalyDetection from '../AnomalyDetection';

interface HRDashboardProps {
  user: { username: string; role: string };
  onLogout: () => void;
}

export default function HRDashboard({ user, onLogout }: HRDashboardProps) {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Expense Management Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage employee expenses
            </p>
          </div>

          <DashboardStats />
          
          <div className="mb-8">
            <RiskInsights />
          </div>
          
          <div className="mb-8">
            <AnomalyDetection />
          </div>
          
          {/* <ExpenseTable isHR={true} /> */}
        </div>
      </main>
    </div>
  );
}