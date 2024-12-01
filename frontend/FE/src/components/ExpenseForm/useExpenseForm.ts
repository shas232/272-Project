import { useState } from 'react';
import { ExpenseCategory } from './types';

export const useExpenseForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    isFraudulent: boolean;
    explanation: string;
  } | null>(null);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Validate required fields
      if (!data || Object.values(data).some(val => val === '')) {
        throw new Error('Please fill in all required fields');
      }
  
      // For travel expenses, validate dates
      if (selectedCategory === 'TRAVEL') {
        const departureDate = new Date(data.departureDate);
        const returnDate = new Date(data.returnDate);
        
        if (returnDate < departureDate) {
          throw new Error('Return date cannot be earlier than departure date');
        }
      }
  
      // Submit expense via API route
      const response = await fetch('/api/expenses/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          ...data,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit expense');
      }
  
      const expense = await response.json();
  
      setAnalysisResult({
        isFraudulent: expense.flagged,
        explanation: expense.flagged ? 'Expense flagged by AI model' : 'Expense submitted successfully',
      });
  
      if (!expense.flagged) {
        setSelectedCategory('');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit expense';
      setAnalysisResult({
        isFraudulent: true,
        explanation: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return {
    selectedCategory,
    setSelectedCategory,
    isSubmitting,
    analysisResult,
    handleSubmit
  };
};