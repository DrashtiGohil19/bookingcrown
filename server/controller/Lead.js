const Lead = require('../model/Lead');

// Create a new lead (public endpoint)
exports.createLead = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required: name, email, phone, and message' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email format' 
            });
        }

        // Clean and validate phone (should be 10 digits)
        const cleanedPhone = phone.toString().replace(/\D/g, ''); // Remove all non-digit characters
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(cleanedPhone)) {
            return res.status(400).json({ 
                success: false,
                message: 'Phone number must be exactly 10 digits' 
            });
        }

        const lead = new Lead({
            name,
            email,
            phone: cleanedPhone, // Use cleaned phone number
            message,
            status: 'pending'
        });

        await lead.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Thank you for contacting us! We will get back to you soon.',
            lead 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while saving your message',
            error: err.message 
        });
    }
};

// Get all leads (admin only)
exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            success: true, 
            leads,
            count: leads.length 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while fetching leads',
            error: err.message 
        });
    }
};

// Update lead status (admin only)
exports.updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        if (!id) {
            return res.status(400).json({ 
                success: false,
                message: 'Lead ID is required' 
            });
        }

        const validStatuses = ['pending', 'contacted', 'converted', 'rejected'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false,
                message: `Status must be one of: ${validStatuses.join(', ')}` 
            });
        }

        const updateData = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const lead = await Lead.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: 'Lead not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Lead status updated successfully',
            lead 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while updating lead status',
            error: err.message 
        });
    }
};

// Get single lead by ID (admin only)
exports.getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: 'Lead not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            lead 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while fetching lead',
            error: err.message 
        });
    }
};

// Delete lead (admin only)
exports.deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return res.status(404).json({ 
                success: false,
                message: 'Lead not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Lead deleted successfully' 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false,
            message: 'An error occurred while deleting lead',
            error: err.message 
        });
    }
};

