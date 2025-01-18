import React, { useContext } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { ExpenseContext } from '../context/ExpenseContext';
import './chartjs-setup'; 

const Chart = () => {
  const { state } = useContext(ExpenseContext);


  const income = state.entries.filter((entry) => entry.type === 'income');
  const expenses = state.entries.filter((entry) => entry.type === 'expense');

  const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);

  const pieData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, Math.abs(totalExpenses)],
        backgroundColor: ['#4CAF50', '#FF5722'],
        hoverBackgroundColor: ['#66BB6A', '#FF7043'],
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: new Array(12).fill(0).map((_, index) =>
          income
            .filter((entry) => new Date(entry.id).getMonth() === index)
            .reduce((sum, entry) => sum + entry.amount, 0)
        ),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expenses',
        data: new Array(12).fill(0).map((_, index) =>
          expenses
            .filter((entry) => new Date(entry.id).getMonth() === index)
            .reduce((sum, entry) => sum + entry.amount, 0)
        ),
        backgroundColor: '#FF5722',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="chart-container">
      <h2>Visual Summary</h2>
      <div className="pie-chart">
        <h3>Income vs Expenses</h3>
        <Pie data={pieData} />
      </div>
      <div className="bar-chart">
        <h3>Monthly Trends</h3>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
