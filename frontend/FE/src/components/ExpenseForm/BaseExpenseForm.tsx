import React, { useState } from 'react';
import { useExpenseForm } from '../ExpenseForm/useExpenseForm';

const ExpenseForm = () => {
  const { selectedCategory, setSelectedCategory, isSubmitting, analysisResult, handleSubmit } =
    useExpenseForm();
  const [formData, setFormData] = useState({
    category: selectedCategory,
    totalAmount: '',
    description: '',
    receipts: [''],
    departureDate: '',
    returnDate: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="totalAmount"
        placeholder="Amount"
        value={formData.totalAmount}
        onChange={onChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
      />
      {selectedCategory === 'TRAVEL' && (
        <>
          <input
            name="departureDate"
            placeholder="Departure Date"
            type="date"
            value={formData.departureDate}
            onChange={onChange}
          />
          <input
            name="returnDate"
            placeholder="Return Date"
            type="date"
            value={formData.returnDate}
            onChange={onChange}
          />
        </>
      )}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {analysisResult && <p>{analysisResult.explanation}</p>}
    </form>
  );
};

export default ExpenseForm;
