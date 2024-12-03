export type ExpenseCategory = '' | 'TRAVEL' | 'ACCOMMODATION' | 'OFFICE' | 'MEALS' | 'TRAINING';

export interface ExpenseFormProps {
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

interface Expense {
  id: number;
  category: string;
  date: string;
  amount: string;
  status: string;
}

interface ExpenseApiResponse {
  success: boolean;
  expenses: Expense[];
}


export interface TravelExpense {
  departureLocation: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  transportationType: string;
  totalAmount: number;
  purpose: string;
  receipts: File[];
}

export interface AccommodationExpense {
  location: string;
  checkIn: string;
  checkOut: string;
  accommodationType: string;
  hotelName: string;
  numberOfGuests: number;
  totalAmount: number;
  purpose: string;
  receipts: File[];
}

export interface OfficeSuppliesExpense {
  itemName: string;
  quantity: number;
  unitPrice: number;
  vendor: string;
  purchaseDate: string;
  department: string;
  purpose: string;
  receipts: File[];
}