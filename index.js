const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./Handlers/jwt');
const errorHandler = require('./Handlers/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categoriesRoute');
const productsRoutes = require('./routes/productsRoute');
const usersRoutes = require('./routes/usersRoute');
const ordersRoutes = require('./routes/ordersRoute');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB connection successfull.')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(process.env.PORT, ()=>{

    console.log('Server started on port 8888.');
})
