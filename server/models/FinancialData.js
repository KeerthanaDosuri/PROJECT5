const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    savings: { type: Number, required: true },
    advice: { type: String, required: true }
});

module.exports = mongoose.model('FinancialData', financialDataSchema);
