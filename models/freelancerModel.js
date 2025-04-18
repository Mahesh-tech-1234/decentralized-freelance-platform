const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [String],
    portfolio: [String],
    rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Freelancer', freelancerSchema);
