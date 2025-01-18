import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const EntryList = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const [editId, setEditId] = useState(null); 
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState('income');

  const handleEdit = (entry) => {
    setEditId(entry.id);
    setEditDescription(entry.description);
    setEditAmount(Math.abs(entry.amount));
    setEditType(entry.type);
  };

  const handleSave = () => {
    const updatedEntry = {
      id: editId,
      description: editDescription,
      amount: editType === 'income' ? parseFloat(editAmount) : -Math.abs(parseFloat(editAmount)),
      type: editType,
    };
    dispatch({ type: 'EDIT_ENTRY', payload: updatedEntry });
    setEditId(null); 
  };

  const handleCancel = () => {
    setEditId(null); 
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id });
  };

  return (
    <div className="entry-list">
      <h2>Entries</h2>
      {state.entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        state.entries.map((entry) => (
          <div key={entry.id} className={`entry-item ${entry.type}`}>
            {editId === entry.id ? (
              
              <div className="edit-form">
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Amount"
                />
                <select value={editType} onChange={(e) => setEditType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              
              <div className="entry-view">
                <span>{entry.description}</span>
                <span
                  style={{
                    color: entry.type === 'income' ? 'green' : 'red',
                  }}
                >
                  {entry.type === 'income' ? '+' : '-'}${Math.abs(entry.amount).toFixed(2)}
                </span>
                <button onClick={() => handleEdit(entry)}>Edit</button>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EntryList;
