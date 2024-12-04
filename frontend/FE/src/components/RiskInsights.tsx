import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

interface MonthlyExpenseStats {
  name: string; // Month-Year key (e.g., "Nov 2024")
  Approved: number; // Approved expense count
  Flagged: number; // Flagged expense count
}

interface FraudData {
  name: string;
  fraudCount: number;
  date: string; // ISO date string
}

export default function RiskInsights() {
  const [chartData, setChartData] = useState<MonthlyExpenseStats[]>([]);
  const [fraudData, setFraudData] = useState<FraudData[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://3.90.114.66:5008/api/getMonthlyExpenseStats");
        const data = await response.json();
        setChartData(data.chartData);
      } catch (error) {
        console.error("Error fetching expense stats:", error);
      }
    };

    const fetchFraudData = async () => {
      try {
        const response = await fetch("http://3.90.114.66:5008/api/getMonthlyFraudStats");
        const data = await response.json();
        const sortedData = data.chartData.sort(
          (a: FraudData, b: FraudData) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setFraudData(sortedData);
      } catch (error) {
        console.error("Error fetching fraud data:", error);
      }
    };

    fetchChartData();
    fetchFraudData();
  }, []);

  const barChartData = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        label: "Approved",
        data: chartData.map((item) => item.Approved),
        backgroundColor: "#34d399", // Green
      },
      {
        label: "Flagged",
        data: chartData.map((item) => item.Flagged),
        backgroundColor: "#f87171", // Red
      },
    ],
  };

  const lineChartData = {
    labels: fraudData.map((item) => item.name),
    datasets: [
      {
        label: "Fraud Count",
        data: fraudData.map((item) => item.fraudCount),
        borderColor: "#ff4d4d", // Red line
        backgroundColor: "rgba(255, 77, 77, 0.3)", // Transparent fill
        pointBackgroundColor: "#ff4d4d",
        pointBorderColor: "#ff4d4d",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Risk Trend Analysis",
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Fraud Trend Analysis",
      },
    },
  };

  return (
    <div className="space-y-8 bg-gray-50 p-6 md:p-10">
      <h1 className="text-2xl font-bold text-indigo-600 text-center mb-8">Risk Insights Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="p-6 shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white">
          <Bar options={barChartOptions} data={barChartData} />
        </div>

        {/* Line Chart */}
        <div className="p-6 shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white">
          <Line options={lineChartOptions} data={lineChartData} />
        </div>
      </div>
    </div>
  );
}