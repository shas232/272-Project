import React from 'react';
import { BarChart, Card } from '@tremor/react';
import { AlertOctagon, TrendingUp, Receipt, Clock } from 'lucide-react';

const riskFactors = [
  {
    name: 'Duplicate Submissions',
    score: 85,
    description: 'Multiple claims for the same expense',
    icon: Receipt,
    details: 'Found 3 similar receipts submitted within 48 hours'
  },
  {
    name: 'Unusual Amount',
    score: 92,
    description: 'Amount significantly higher than average',
    icon: TrendingUp,
    details: '234% above department average'
  },
  {
    name: 'Time Pattern',
    score: 78,
    description: 'Suspicious submission timing',
    icon: Clock,
    details: 'Submitted outside normal business hours'
  },
  {
    name: 'Policy Violation',
    score: 95,
    description: 'Non-compliance with expense policy',
    icon: AlertOctagon,
    details: 'Exceeds maximum allowed amount'
  }
];

const chartdata = [
  {
    name: 'Jan',
    'Risk Score': 45,
    'Flagged Expenses': 12,
  },
  {
    name: 'Feb',
    'Risk Score': 52,
    'Flagged Expenses': 18,
  },
  {
    name: 'Mar',
    'Risk Score': 68,
    'Flagged Expenses': 24,
  },
];

export default function RiskInsights() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Trend Analysis</h3>
          <BarChart
            data={chartdata}
            index="name"
            categories={['Risk Score', 'Flagged Expenses']}
            colors={['red', 'orange']}
            yAxisWidth={48}
            className="h-72"
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Key Risk Indicators</h3>
          <div className="space-y-4">
            {riskFactors.map((factor) => (
              <div key={factor.name} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  factor.score > 90 ? 'bg-red-100' : 
                  factor.score > 80 ? 'bg-orange-100' : 'bg-yellow-100'
                }`}>
                  <factor.icon className={`w-5 h-5 ${
                    factor.score > 90 ? 'text-red-600' : 
                    factor.score > 80 ? 'text-orange-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-gray-900">{factor.name}</h4>
                    <span className={`text-sm font-semibold ${
                      factor.score > 90 ? 'text-red-600' : 
                      factor.score > 80 ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {factor.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{factor.details}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}