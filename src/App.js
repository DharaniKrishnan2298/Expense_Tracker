import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import AddEntryForm from './components/AddEntryForm';
import EntryList from './components/EntryList';
import Summary from './components/Summary';
import Chart from './components/chart';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="app-container">
        <h1>Expense Tracker</h1>
        <Summary />
        <AddEntryForm />
        <Chart />
        <EntryList />
      </div>
    </ExpenseProvider>
  );
}

export default App;
