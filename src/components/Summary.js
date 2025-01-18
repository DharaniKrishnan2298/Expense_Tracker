import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const Summary = () => {
  const { state } = useContext(ExpenseContext);

  const income = state.entries
    .filter((entry) => entry.amount > 0)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = state.entries
    .filter((entry) => entry.amount < 0)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const balance = income + expenses;

  return (
    <div className="summary">
      <div>Total Income: ${income.toFixed(2)}</div>
      <div>Total Expenses: ${Math.abs(expenses).toFixed(2)}</div>
      <div>Balance: ${balance.toFixed(2)}</div>
    </div>
  );
};

export default Summary;
