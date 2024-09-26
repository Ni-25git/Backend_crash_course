const express = require('express');
const connectDB = require('./db');
const bus = require('./routes/busRoutes');
const operator = require('./routes/operatorRoutes');
const route = require('./routes/routeRoutes');
const passenger = require('./routes/passengerRoutes');
const reservation = require('./routes/reservationRoutes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());


app.use('/bus' , bus);
app.use('/operator' , operator);
app.use('/route' , route);
app.use('/passenger' , passenger);
app.use('/reservation' , reservation);





app.listen(PORT , async ()=>{
    try {
        await connectDB()
        console.log(`server is running on PORT ${PORT} and db is connected`)
    } catch (error) {
        console.log('Error in connecting db with server')
    }
})