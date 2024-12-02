import React from 'react';
import { Card } from '@tremor/react';
import { FileText, Check, AlertCircle, Image } from 'lucide-react';

const receiptAnalysis = {
  confidence: 92,
  extracted: {
    merchant: 'Luxury Hotel & Spa',
    date: '2024-03-15',
    total: '$1,234.56',
    items: [
      { description: 'Executive Suite', amount: '$899.00' },
      { description: 'Room Service', amount: '$156.78' },
      { description: 'Spa Treatment', amount: '$178.78' }
    ]
  },
  flags: [
    {
      type: 'Policy Violation',
      description: 'Luxury accommodation exceeds policy limit of $500/night',
      severity: 'high'
    },
    {
      type: 'Duplicate Detection',
      description: 'Similar receipt submitted 3 days ago',
      severity: 'high'
    }
  ]
};

export default function ReceiptAnalysis() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Receipt Analysis</h3>
            <p className="text-sm text-gray-500">AI-powered OCR analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Confidence:</span>
          <span className="text-sm font-semibold text-green-600">{receiptAnalysis.confidence}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Extracted Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Merchant</span>
                <span className="text-sm font-medium">{receiptAnalysis.extracted.merchant}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium">{receiptAnalysis.extracted.date}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span className="text-sm font-medium">{receiptAnalysis.extracted.total}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Line Items</h4>
            <div className="space-y-2">
              {receiptAnalysis.extracted.items.map((item, index) => (
                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{item.description}</span>
                  <span className="text-sm font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Detected Issues</h4>
          <div className="space-y-4">
            {receiptAnalysis.flags.map((flag, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  flag.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-yellow-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-5 h-5 ${
                    flag.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">{flag.type}</h5>
                    <p className="text-sm text-gray-600 mt-1">{flag.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Receipt Image</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Image className="w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Receipt image preview</p>
                <button className="mt-2 btn-secondary">View Original</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}