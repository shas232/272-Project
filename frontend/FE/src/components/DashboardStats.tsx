import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertTriangle, DollarSign, Users } from 'lucide-react';

type Stats = {
  totalExpenses: string;
  flaggedTransactions: number;
  activeEmployees: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null); // Specify the type

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://54.159.98.140:5008/api/dashboard-stats');
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading...</p>;
  }

  const statsData = [
    {
      name: 'Total Expenses',
      value: stats.totalExpenses,
      change: '+2.5%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      name: 'Flagged Transactions',
      value: stats.flaggedTransactions.toString(),
      change: '-12%',
      icon: AlertTriangle,
      trend: 'down',
    },
    {
      name: 'Active Employees',
      value: stats.activeEmployees.toString(),
      change: '+3.2%',
      icon: Users,
      trend: 'up',
    },
    {
      name: 'Risk Score',
      value: '2.4',
      change: '-0.8',
      icon: TrendingUp,
      trend: 'down',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div
              className={`p-3 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <stat.icon
                className={`w-6 h-6 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              />
            </div>
          </div>
          <div className="mt-2">
            <span
              className={`text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
