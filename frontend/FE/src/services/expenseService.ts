import { analyzeExpense } from '../services/openai';
import { ExpenseInput, IExpense } from '../../../../backend/models/Expense';

const API_BASE = 'http://localhost:5008/'; // Update to match your backend URL

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function submitExpense(data: any): Promise<IExpense> {
  try {
    // Analyze the expense using OpenAI
    const analysis = await analyzeExpense(data);

    // Calculate total amount based on provided form data
    const amount = data.totalAmount || data.unitPrice * data.quantity || 0;

    // Prepare expense data
    const expenseData: ExpenseInput = {
      userId: localStorage.getItem('username') || 'unknown',
      category: data.category,
      amount,
      status: analysis.isFraudulent ? 'FLAGGED' : 'PENDING',
      flagged: analysis.isFraudulent,
    };

    // Submit expense to the backend API
    const savedExpense = await fetchApi<IExpense>('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData),
    });

    return savedExpense;
  } catch (error) {
    console.error('Failed to submit expense:', error);
    throw error;
  }
}
