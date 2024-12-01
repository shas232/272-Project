import React from 'react';
import { Card } from '@tremor/react';
import { AlertTriangle, DollarSign, Clock, MapPin } from 'lucide-react';

const anomalies = [
  {
    id: 1,
    type: 'Amount Anomaly',
    description: 'Expense amount is 3.5x higher than the average for this category',
    severity: 'high',
    details: {
      amount: '$1,234.56',
      category: 'Travel',
      average: '$352.73',
      deviation: '+250%'
    },
    icon: DollarSign
  },
  {
    id: 2,
    type: 'Time Pattern',
    description: 'Multiple high-value expenses submitted during off-hours',
    severity: 'medium',
    details: {
      submissions: '3 expenses',
      timeframe: '11 PM - 2 AM',
      totalAmount: '$2,845.67'
    },
    icon: Clock
  },
  {
    id: 3,
    type: 'Location Mismatch',
    description: 'Expense location conflicts with employee travel history',
    severity: 'high',
    details: {
      expenseLocation: 'New York, USA',
      knownLocation: 'London, UK',
      timestamp: 'Same day submission'
    },
    icon: MapPin
  }
];

export default function AnomalyDetection() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Detected Anomalies</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          3 High Risk Anomalies
        </span>
      </div>

      <div className="space-y-4">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className={`p-4 rounded-lg border-l-4 ${
              anomaly.severity === 'high'
                ? 'border-red-500 bg-red-50'
                : 'border-yellow-500 bg-yellow-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                anomaly.severity === 'high' ? 'bg-red-200' : 'bg-yellow-200'
              }`}>
                <anomaly.icon className={`w-5 h-5 ${
                  anomaly.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{anomaly.type}</h4>
                  <AlertTriangle className={`w-5 h-5 ${
                    anomaly.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                </div>
                
                <p className="text-sm text-gray-600 mt-1">{anomaly.description}</p>
                
                <div className="mt-2 text-sm">
                  {Object.entries(anomaly.details).map(([key, value]) => (
                    <div key={key} className="flex items-center text-gray-500">
                      <span className="font-medium capitalize">{key}:</span>
                      <span className="ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}