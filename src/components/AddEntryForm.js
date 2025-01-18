import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const AddEntryForm = () => {
  const { dispatch } = useContext(ExpenseContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustedAmount = type === 'income' ? parseFloat(amount) : -Math.abs(parseFloat(amount));
    const newEntry = {
      id: Date.now(),
      description,
      amount: adjustedAmount,
      type,
    };
    dispatch({ type: 'ADD_ENTRY', payload: newEntry });
    setDescription('');
    setAmount('');
    setType('income');
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntryForm;
