import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [savings, setSavings] = useState('');
    const [advice, setAdvice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/financial-data', {
                income: parseFloat(income),
                expenses: parseFloat(expenses),
                savings: parseFloat(savings)
            });
            setAdvice(response.data.advice);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <h1>Financial Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Income:</label>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} required />
                </div>
                <div>
                    <label>Expenses:</label>
                    <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} required />
                </div>
                <div>
                    <label>Savings:</label>
                    <input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {advice && <h2>Advice: {advice}</h2>}
        </div>
    );
}

export default App;
