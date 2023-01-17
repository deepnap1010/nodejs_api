const express =require('express');
const app=express();
const cors=require('cors');
const studentRoute=require('./api/routes/student.js');
app.use(cors());

const mongoose=require('mongoose');

const bodyParser=require('body-parser');




mongoose.connect('mongodb+srv://123:123@cluster0.vhgq60p.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error',error=>{
console.log('fail');
});

mongoose.connection.on('connected',connected=>{
    console.log('database connected');
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
}



)
module.exports=app;