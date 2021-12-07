const express = require('express');
const router = express.Router();
const drivers = require('../models/Drivers');
const uuid = require('uuid');


// Get Drivers
router.get('/drivers', (req, res) => {
    res.status(200).json(drivers);
})

// Add Driver Request
router.post('/driver', (req, res) => {
    const newDriver = {
        id: uuid.v4(),
        name: req.body.name,
        car: req.body.car,
        currentX: req.body.currentX,
        currentY:req.body.currentY,
    }
    drivers.push(newDriver);
    console.log(`Driver ${newDriver.name} is looking for a Rider....`);
    res.status(201).json(newDriver);

})


module.exports = router;