const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
// const mysql = require('mysql');
// const path = require('path');
const app = express();
const http = require('http').createServer(app)
const sch = require('node-schedule')
const drivers = require('./models/Drivers');
const riders = require('./models/Riders');
const pairs = require('./models/Pairs');

const io = require('socket.io')(http)

io.of('communication').on('connection', (socket)=>{
    const job = sch.scheduleJob('*/5 * * * * *', function(){
        makePair(socket);
    });
})

function makePair(socket) {
    let rIn = -1;
        let dIn = -1;
        riders.forEach((rider) => {
            rIn +=1;
            let mdIn;
            let shortest =  Number.MAX_VALUE;
            dIn = -1;
            if(drivers.length) {
                drivers.forEach((driver)=> {
                    dIn +=1;
                    let distance = Math.sqrt( Math.pow((driver.currentX-rider.currentX), 2) + Math.pow((driver.currentY - rider.currentY), 2) );
                    cost = 2*distance
                    if(distance < shortest)
                    {
                        shortest = distance;
                        mdIn = dIn;
                    }
                        
                })
                var pair = {
                    "riderName" : rider.name,
                    "driverName" : drivers[mdIn].name,
                    "carNumber" : drivers[mdIn].car,
                    "cost" : cost
                  };
              
                  pairs.push(pair);
                  console.log(`Rider ${pair.riderName} matches with driver ${pair.driverName}, car number ${pair.carNumber}. Toatl cost = ${pair.cost}`);
                  drivers.splice(mdIn, 1);
                  riders.splice(rIn, 1);

            }

        })
        socket.emit("welcome",pairs);
        pairs.length = 0;
}


const logger = (req, res, next) => {
    // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}}`);
    next();
};

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', require('./routes/root'));
app.use('/api', require('./routes/driver'));
app.use('/api', require('./routes/rider'));

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
    console.log(`Server and Socket Running on port: ${PORT}`);
});
