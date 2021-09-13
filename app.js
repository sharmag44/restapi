const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/store",{useNewUrlParser:true,useUnifiedTopology:true});


const port = process.env.PORT||3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
})
const Users = mongoose.model("User",userSchema);
const productSchema = mongoose.Schema({
    item:{
        type:String
    },
    rate:{
        type:Number
    }
});
const Product = mongoose.model("Product",productSchema);
app.get("/",(req,res) => {
    res.send("Hello")
})
app.post("/Login",(req,res)=>{
    const email = req.body.email;
    bcrypt.hash(req.body.password,saltRounds,function(err,hash){
        if(err){
            res.status(400).send(err);
        }
        else{
            const pass=hash;
        }
    })
    const value = new Users({
        email : email,
        password:pass,
    });
    value.save((err)=>{
        if(!err){
            res.send("user successfully created")
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})