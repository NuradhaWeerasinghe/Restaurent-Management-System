const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //use for convert json format to javaScript
const cors = require('cors');

const app = express();

//import routes
const employeeRoutes = require('./routes/employees');
//Supplier details
const supplierRoutes = require('./routes/Supplier-routes');
//supplier orders route
const SupplierOrderRoutes = require('./routes/Supplier-order-routes');


//app middleware
app.use(bodyParser.json());
app.use(cors());

//roote middleware
app.use(employeeRoutes);
//supplier routes
app.use('/api/supplier', supplierRoutes);
app.use('/api/supplierorder', SupplierOrderRoutes);


const PORT = 8000;// sever port
const DB_URL = `mongodb+srv://ipl:ipl@db1.hdtak.mongodb.net/Employee?retryWrites=true&w=majority`; 

//crate options
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
    
})


//db Connection
mongoose.connect(DB_URL)
.then(()=>{
    console.log('MongoDB Connected!');
})
.catch((err)=> console.log('DB Connection Error!',err));                 

app.listen(PORT, ()=>{
         console.log(`App is running on ${PORT}`);
});