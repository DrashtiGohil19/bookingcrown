const express = require('express');
const { createLead, getAllLeads, updateLeadStatus, getLeadById, deleteLead } = require('../controller/Lead');
const VerifyAdmin = require('../middlewere/VerifyAdmin');
const router = express.Router();

// Public route - anyone can create a lead
router.post("/create-lead", createLead);

// Admin only routes
router.get("/leads", VerifyAdmin, getAllLeads);
router.get("/leads/:id", VerifyAdmin, getLeadById);
router.put("/leads/:id/status", VerifyAdmin, updateLeadStatus);
router.delete("/leads/:id", VerifyAdmin, deleteLead);

module.exports = router;

