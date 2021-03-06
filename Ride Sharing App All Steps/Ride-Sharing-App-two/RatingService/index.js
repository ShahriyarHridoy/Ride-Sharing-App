const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const mongoose = require('mongoose')
const url = 'mongodb://localhost/distributedSystemAssignment'
const app = express();
const Rating = require('./models/Rating')


//Create Connection
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection

con.once('open',function (){
    console.log('Connection established with mongodb...')
})

const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Store Rating
app.post('/rating',async (req,res)=>{
    console.log(`Driver ${req.body.name} got a rating of ${req.body.rating}.`);
    const rating = new Rating({
        driverName: req.body.driverName,
        car: req.body.car,
        rating: req.body.rating,
    });

    rating.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        //console.log(err)
    });
})



const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
});