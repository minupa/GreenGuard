const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

// Get solution by disease name
router.get('/:name', async (req, res) => {
  try {
    const disease = await Disease.findOne({ 
      name: { $regex: new RegExp(req.params.name, 'i') }
    });
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new disease
router.post('/', async (req, res) => {
  try {
    const disease = new Disease({
      name: req.body.name,
      solution: req.body.solution
    });
    
    const newDisease = await disease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

// Delete disease by name
router.delete('/:name', async (req, res) => {
  try {
    const disease = await Disease.findOneAndDelete({ 
      name: { $regex: new RegExp(req.params.name, 'i') }
    });
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    res.json({ message: 'Disease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;