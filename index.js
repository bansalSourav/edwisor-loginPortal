const express=require('express');
const app=express();
const signUp=require('./routes/signUp');
const login=require('./routes/login');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');


const port=process.env.port||3000;

mongoose.connect('mongodb://localhost/edwisor')
.then(()=>console.log('-------------Connected to mongoDB--------------'))
.catch(err=>console.error('----------Connection failed with mongoDB-----------'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/',login);
app.use('/api/signup',signUp);
app.use('/api/login',login);

app.listen(port,()=>{
    console.log(`Server started listening on ${port}`);
    console.log("__________Following are the APIs to use__________");
    console.log("localhost:3000/api/signup");
    console.log("localhost:3000/api/login");

});
