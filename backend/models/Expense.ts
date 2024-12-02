import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the full document
export interface IExpense extends Document {
  userId: string;
  category: string;
  amount: number;
  status?: string;
  flagged?: boolean;
}

// Define the TypeScript interface for raw expense data (input to API)
export interface ExpenseInput {
  userId: string;
  category: string;
  amount: number;
  status?: string;
  flagged?: boolean;
}

// Define the Mongoose schema
const ExpenseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  flagged: { type: Boolean, default: false },
});

// Create and export the Mongoose model
const Expense = mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
