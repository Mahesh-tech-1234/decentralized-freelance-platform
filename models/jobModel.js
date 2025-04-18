const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['open', 'in-progress', 'completed'], default: 'open' },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }
});

module.exports = mongoose.model('Job', jobSchema);
