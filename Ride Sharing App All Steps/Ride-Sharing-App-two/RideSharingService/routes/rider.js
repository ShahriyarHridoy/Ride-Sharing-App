const express = require('express');
const router = express.Router();
const riders = require('../models/Riders');
const uuid = require('uuid');



// Get Riders
router.get('/riders', (req, res) => {
    res.status(200).json(riders);
})

// Add Rider Request
router.post('/rider', (req, res) => {
    const newRider = {
        id: uuid.v4(),
        name: req.body.name,
        currentX: req.body.currentX,
        currentY:req.body.currentY,
        destinationX: req.body.destinationX,
        destinationY: req.body.destinationY,
    }
    riders.push(newRider);
    console.log(`Rider ${newRider.name} is looking for a Driver....`);
    res.status(201).json(newRider);

})


module.exports = router;