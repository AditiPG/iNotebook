const express= require("express")
// const bodyparser = require('body-parser')
const User= require('../models/User')
const router= express.Router();
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const fetchuser= require('../middleware/fetchUser');

const JWT_SECRET= "aditi$2002";

const { body, validationResult }= require('express-validator');

//Route 1: create user

router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a vald email').isEmail(),
    body('password', 'Enter a password').isLength({min:5})
] ,async (req,res)=>{
    let success= false;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(404).json({success, errors:errors.array()});
    }
    try{
        let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(404).json({success, Error: 'User already exists with this email'})
    }
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    });

    const data={
        user:{
            id:user.id
        }
    }
    
    const authtoken= jwt.sign(data,JWT_SECRET );
    // res.json(user);
    success= true;
    res.json({success, authtoken});


    
    }catch(error){
        console.log(error)
        return res.status(500).json({success, Error: 'Something went wrong'})
    }
    

});

//Route 2: login


router.post('/login',[
    body('email', 'Enter a vald email').isEmail(),
    body('password', 'Password Cannot be blank').exists(),
] ,async (req,res)=>{
    var success=false;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()});
    }

const {email,password}= req.body;

try{
    let user= await User.findOne({email});
    if(!user){
        let success=false;
        return res.status(404).json({Error: 'Please try to login with correct credentials'});
    }

    const passwordcompare= await bcrypt.compare(password, user.password);
    if(!passwordcompare){
        return res.status(404).json({success, Error: 'Please try to login with correct credentials'});
    }

    const data={
        user:{
            id:user.id
        }
    }
    const authtoken= jwt.sign(data,JWT_SECRET );
    success= true;
    res.json({success, authtoken});

}catch(error){
    console.log(error)
        res.status(500).json({Error: 'Something went wrong'});
}

})

//Route 3: get user detail. Login required. 
router.post('/getUser', fetchuser, async (req,res)=>{
try {
    var userId= req.user.id;
    const user= await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.log(error);
    res.status(500).json({Error: 'Something went wrong'});
}
})



module.exports= router