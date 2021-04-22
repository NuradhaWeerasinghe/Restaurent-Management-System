const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //use for convert json format to javaScript
const cors = require('cors');

const app = express();

//import routes
const employeeRoutes = require('./routes/employees');



const orderRoutes = require('./routes/orders');
const itemRoutes = require('./routes/items');



//app middleware
app.use(bodyParser.json());
app.use(cors());

//roote middleware
app.use(employeeRoutes);
app.use(billRoutes);


app.use(orderRoutes);
app.use(itemRoutes);



const PORT = 8000;// sever port
const DB_URL = `mongodb+srv://Admin:admin321@project.0tb9c.mongodb.net/highGarden_Db?retryWrites=true&w=majority`; 

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