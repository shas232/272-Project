
import { BarChart, Card } from '@tremor/react';
import { AlertOctagon, TrendingUp, Receipt, Clock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface MonthlyExpenseStats {
  name: string;  // Month-Year key (e.g., "Nov 2024")
  Approved: number;  // Approved expense count
  Flagged: number;   // Flagged expense count
}
interface MonthlyFraudStats {
  name: string;
  fraudCount: number;
}

interface FraudData {
  name: string;
  fraudCount: number;
  date: string; // Assuming date is passed as an ISO string
}

export default function RiskInsights() {
  const [chartData, setChartData] = useState<
    { name: string; Approved: number; Flagged: number }[]
  >([]);
  
  const [fraudData, setFraudData] = useState<FraudData[]>([]);


  // useEffect(() => {
  //   const fetchFraudData = async () => {
  //     try {
  //       const response = await fetch('http://3.90.114.66:5008/api/getMonthlyFraudStats'); // Adjust endpoint as necessary
  //       const data = await response.json();
        
  //       setFraudData(data.chartData);
  //     } catch (error) {
  //       console.error('Error fetching fraud data:', error);
  //     }
  //   };

  //   fetchFraudData();
  // }, []);


  useEffect(() => {
    const fetchFraudData = async () => {
      try {
        const response = await fetch('http://3.90.114.66:5008/api/getMonthlyFraudStats');
        const data = await response.json();
  
        // Sort data by the date field
        const sortedData = data.chartData.sort(
          (a: FraudData, b: FraudData) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
  
        setFraudData(sortedData);
      } catch (error) {
        console.error('Error fetching fraud data:', error);
      }
    };
  
    fetchFraudData();
  }, []);
  
  
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://3.90.114.66:5008/api/getMonthlyExpenseStats');
        const data = await response.json();

        console.log("API Data:", data); // Check API data structure

        // Transform data to match expected format
        const transformedData = data.chartData.map((item: MonthlyExpenseStats) => ({
          name: item.name,      // The month-year format (e.g., "Nov 2024")
          Approved: item.Approved,  // Approved count
          Flagged: item.Flagged,    // Flagged count
        }));

        setChartData(transformedData);

      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  


  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Trend Analysis</h3>
          <BarChart
            data={chartData}
            index="name"   // 'name' corresponds to the month-year key
            categories={['Approved', 'Flagged']}  // 'Approved' and 'Flagged' are the categories
            colors={['green', 'red']}  
            yAxisWidth={48}
            className="h-72"
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Fraud Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fraudData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="fraudCount"
                stroke="#ff4d4d" // Red color for fraud
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
           
        </Card>
      </div>
    </div>
  );
}