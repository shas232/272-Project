import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../src/hooks/useAuth';
import LoginPage from './components/Auth/LoginPage';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import TravelForm from './components/ExpenseForm/TravelForm';


function App() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated || !user) {
    // Ensure user exists and is authenticated
    return <LoginPage onLogin={login} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Dashboard for Employee and HR */}
        <Routes>
          <Route
            path="/"
            element={
              user.role === 'EMPLOYEE' ? (
                <EmployeeDashboard user={user} onLogout={logout} />
              ) : (
                <HRDashboard user={user} onLogout={logout} />
              )
            }
          />

          {/* Expense Forms */}
          <Route path="/submit-travel-expense" element={<TravelForm onSubmit={function (data: any): Promise<void> {
            throw new Error('Function not implemented.');
          } } isSubmitting={false} />} />
          {/* <Route path="/submit-meal-expense" element={<MealsForm />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
