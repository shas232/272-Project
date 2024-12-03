import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './components/Auth/LoginPage';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import HRDashboard from './components/Dashboard/HRDashboard';
import TravelForm from './components/ExpenseForm/TravelForm';
import LandingPage from './components/ExpenseForm/Landing';

function App() {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let { user, isAuthenticated, login, logout } = useAuth();
  console.log(user,isAuthenticated)


  // Adjusted handleLogin to match the expected signature
  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Page */}
          <Route
            path="/login"
            element={
              isAuthenticated && user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  onLogin={handleLogin} // Passing the updated onLogin function
                />
              )
            }
          />

          {/* Dashboard for Employee and HR */}
          <Route
            path="/dashboard"
            element={
               isAuthenticated&&user ? (
                user.role === 'EMPLOYEE' ? (
                  <EmployeeDashboard />
                ) : (
                  <HRDashboard/>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
          path="/employeeDashboard"
          element={
          
              <EmployeeDashboard />
  
          }
          />


        <Route
          path="/hrDashboard"
          element={
              <HRDashboard />
          }
          />

          {/* Expense Forms */}
          <Route
            path="/submit-travel-expense"
            element={
              isAuthenticated && user ? (
                <TravelForm
                  onSubmit={async (data) => {
                    console.log('Travel expense submitted:', data);
                  }}
                  isSubmitting={false}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
