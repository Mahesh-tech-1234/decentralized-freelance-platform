const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    transactionHash: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
