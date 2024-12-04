import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-50 shadow-md">
        <div className="text-2xl font-bold text-blue-600">ExpenseShield</div>
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {/* <a href="#features" className="hover:text-blue-600">
            Features
          </a>
          <a href="#pricing" className="hover:text-blue-600">
            Pricing
          </a> */}
          {/* <a href="#about" className="hover:text-blue-600">
            About Us
          </a> */}
          {/* <a href="#contact" className="hover:text-blue-600">
            Contact
          </a> */}
        </nav>
        <button onClick={() => navigate("/login")}  className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight">
              Smarter Expense Management for Your Business
            </h1>
            <p className="text-lg">
              Streamline your expense reporting and approvals with intelligent
              automation. Save time and focus on growing your business.
            </p>
            <div className="space-x-4">
              {/* <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100">
                
              </button> */}
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            <img
              src="https://img.freepik.com/premium-vector/calculate-expenses-isolated-cartoon-vector-illustrations_107173-21705.jpg"
              alt="Expense Management Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20 space-y-12 text-center"
      >
        <h2 className="text-3xl font-bold">Why Choose ExpenseShield</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14h2v-2h-2v2zm1-12C8.477 4 6 6.477 6 10h2a4 4 0 118 0h2c0-3.523-2.477-6-6-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Automated Reporting</h3>
            <p className="text-gray-600">
              Generate reports and approve expenses with one click.
            </p>
          </div>

          {/* Feature 2
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1L3 5v6c0 5.525 3.66 10.74 8 12 4.34-1.26 8-6.475 8-12V5l-9-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Secure Data</h3>
            <p className="text-gray-600">
              Protect your business with enterprise-grade security.
            </p>
          </div> */}

          {/* Feature 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L1.74 9l10.26 13 10.26-13L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Real-Time Insights</h3>
            <p className="text-gray-600">
              Track expenses and control budgets in real time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section
      <section
        id="cta"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12"
      >
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Ready to take control of your expenses?
          </h2>
          <p className="text-lg">
            Join thousands of businesses that trust ExpensePro to streamline
            their workflows.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100">
            Get Started for Free
          </button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>© 2024 ExpenseShield. All rights reserved.</p>
      </footer>
    </div>
  );
}
