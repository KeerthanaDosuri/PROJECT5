const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Financial Data Model
const FinancialData = require('./models/FinancialData');


app.post('/api/financial-data', async (req, res) => {
    try {
        const { income, expenses, savings } = req.body;

 
        let advice = '';
        if (savings < 0.1 * income) {
            advice = 'Consider saving more! Your savings are less than 10% of your income.';
        } else if (expenses > 0.8 * income) {
            advice = 'Try to cut down on discretionary spending. Your expenses exceed 80% of your income.';
        } else {
            advice = 'Your financials are in good shape!';
        }

        const financialData = new FinancialData({ income, expenses, savings, advice });
        await financialData.save();
        res.json({ advice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
