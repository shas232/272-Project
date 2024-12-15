import { Card } from '@tremor/react';
import { AlertTriangle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface HistoryItem {
  id: number;
  category: string;
  date: string;
  amount: string;
  currency: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  role: string;
  expenses: {
    history: HistoryItem[];
  };
}

export default function AnomalyDetection() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://54.162.232.80:5008/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <Card className="p-6 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">User Analysis</h3>
        <AlertTriangle className="text-red-500 w-6 h-6" />
      </div>

      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user.email}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* User Details */}
            <div className="flex items-center space-x-4">
              {/* Conditional Display Picture */}
              {user.role !== 'HR' && (
                <div className="flex-shrink-0">
                  <img
                    src={"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <span
                  className={`inline-block px-3 py-1 mt-2 text-sm rounded-full ${
                    user.role === 'ADMIN'
                      ? 'bg-blue-100 text-blue-800'
                      : user.role === 'OWNER'
                      ? 'bg-green-100 text-green-800'
                      : user.role === 'HR'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            {/* Expense History */}
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800">Expense History</h3>
              {user.expenses.history.length === 0 ? (
                <p className="mt-2 text-gray-500">No expenses found.</p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-600 border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Amount</th>
                        <th className="px-4 py-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.expenses.history.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{expense.category}</td>
                          <td className="px-4 py-2 border">{expense.date}</td>
                          <td className="px-4 py-2 border">
                            {expense.amount} {expense.currency}
                          </td>
                          <td
                            className={`px-4 py-2 border font-medium ${
                              expense.status === 'Approved'
                                ? 'text-green-600'
                                : expense.status === 'Pending'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {expense.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}