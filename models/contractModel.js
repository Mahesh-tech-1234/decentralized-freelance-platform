const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobDetails: { type: String, required: true },
    amount: { type: Number, required: true },
    milestone: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'disputed'], default: 'pending' },
    transactionHash: { type: String }
});

module.exports = mongoose.model('Contract', contractSchema);
