const Payment = require('../models/paymentModel');
const Contract = require('../models/contractModel');

// Process Payment
exports.processPayment = async (req, res) => {
    try {
        const { contractId, amount } = req.body;

        // Validate contract and check if contract exists
        const contract = await Contract.findById(contractId);
        if (!contract) return res.status(404).json({ message: 'Contract not found' });

        // Assuming that a third-party payment gateway or blockchain interaction is required here
        const transactionHash = "generated_transaction_hash";  // This would be the result of the payment process

        // Create a new payment record
        const payment = new Payment({
            contractId,
            amount,
            paymentStatus: 'pending',
            transactionHash
        });

        await payment.save();
        
        // Simulate the completion of payment after blockchain interaction
        setTimeout(async () => {
            payment.paymentStatus = 'completed';
            await payment.save();
            res.status(200).json({ message: 'Payment processed successfully', payment });
        }, 5000);  // Simulate delay, replace this with real blockchain interaction.

    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
};

// Get Payment Status
exports.getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment status', error });
    }
};
