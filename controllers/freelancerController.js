const Freelancer = require('../models/freelancerModel');
const User = require('../models/userModel'); // Assuming you have a user model to reference

// Register Freelancer
exports.registerFreelancer = async (req, res) => {
    try {
        const { username, email, password, skills, portfolio } = req.body;

        // Create a new freelancer record
        const freelancer = new Freelancer({
            userId: req.user._id,  // Assuming you're using some form of authentication like JWT
            skills: skills.split(','),
            portfolio: portfolio.split(',')
        });

        await freelancer.save();
        
        // Return success response
        res.status(201).json({
            message: 'Freelancer registered successfully',
            freelancer
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering freelancer', error });
    }
};

// Get Freelancer Profile
exports.getFreelancer = async (req, res) => {
    try {
        const freelancer = await Freelancer.findOne({ userId: req.params.freelancerId }).populate('userId');
        if (!freelancer) return res.status(404).json({ message: 'Freelancer not found' });

        res.json(freelancer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching freelancer profile', error });
    }
};

// Update Freelancer Profile
exports.updateFreelancer = async (req, res) => {
    try {
        const { skills, portfolio } = req.body;
        const freelancer = await Freelancer.findOneAndUpdate(
            { userId: req.params.freelancerId },
            { skills: skills.split(','), portfolio: portfolio.split(',') },
            { new: true }
        );

        if (!freelancer) return res.status(404).json({ message: 'Freelancer not found' });

        res.json({ message: 'Freelancer profile updated successfully', freelancer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating freelancer profile', error });
    }
};
