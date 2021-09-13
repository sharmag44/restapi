require.config("dotenv");
const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const auth = require("./middleware/auth")
mongoose.connect("mongodb://localhost:27017/store",{useNewUrlParser:true,useUnifiedTopology:true});


const port = process.env.PORT||3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const isAdminstrator =(req,res,next)=> {
if(req.payload.role !=='admin'){
    return res.status(403).json({status:403,message:"unauthorised aceess"});
}
next();
}

const userSchema = new mongooseSchema({
    role :{
        type:String,
        enum :['user','admin'],
        default:"user"
    },
    password:String,
    
})
const Users = mongoose.model("User",userSchema);
const productSchema = new mongooseSchema({
    item:{
        type:String
    },
    rate:{
        type:Number
    }
});
const Product = mongoose.model("Product",productSchema);


app.post("/welcome",auth,isAdminstrator,(req,res) =>{
    res.status(200).send("welcome🖐")
});

//post a products
app.post("/product",(req,res)=>{
    const stuff =  new Product({
        item:req.body.item,
        rate:req.body.rate
    })
    stuff.save((err) =>{
        if (!err){
            res.status(200).send("item inserted successfully")
        }
        else{
            res.status(404).send(err);
        }
    })
});
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})