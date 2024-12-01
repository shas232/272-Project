// import React, { useState, useEffect } from 'react';
// import { MoreVertical, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
// import { getExpenseStats } from '../services/expenseService';

// interface ExpenseTableProps {
//   isHR?: boolean;
// }

// export default function ExpenseTable({ isHR = false }: ExpenseTableProps) {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadExpenses();
//   }, []);

//   const loadExpenses = async () => {
//     try {
//       const { recentExpenses } = await getExpenseStats();
//       setExpenses(recentExpenses);
//     } catch (error) {
//       console.error('Failed to load expenses:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (expenseId: string) => {
//     // Implement expense approval logic
//   };

//   const handleReject = async (expenseId: string) => {
//     // Implement expense rejection logic
//   };

//   if (loading) {
//     return <div>Loading expenses...</div>;
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Employee
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Risk Score
//               </th>
//               {isHR && (
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {expenses.map((expense: any) => (
//               <tr key={expense._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{expense.employeeId}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">{expense.category}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">${expense.amount.toFixed(2)}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     expense.status === 'FLAGGED'
//                       ? 'bg-red-100 text-red-800'
//                       : expense.status === 'APPROVED'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {expense.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className={`h-2 w-24 rounded-full ${
//                       expense.riskScore > 0.7
//                         ? 'bg-red-200'
//                         : expense.riskScore > 0.3
//                         ? 'bg-yellow-200'
//                         : 'bg-green-200'
//                     }`}>
//                       <div
//                         className={`h-2 rounded-full ${
//                           expense.riskScore > 0.7
//                             ? 'bg-red-500'
//                             : expense.riskScore > 0.3
//                             ? 'bg-yellow-500'
//                             : 'bg-green-500'
//                         }`}
//                         style={{ width: `${expense.riskScore * 100}%` }}
//                       />
//                     </div>
//                     <span className="ml-2 text-sm text-gray-500">
//                       {(expense.riskScore * 100).toFixed(0)}%
//                     </span>
//                   </div>
//                 </td>
//                 {isHR && (
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleApprove(expense._id)}
//                         className="text-green-600 hover:text-green-900"
//                       >
//                         <CheckCircle className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={() => handleReject(expense._id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         <XCircle className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }