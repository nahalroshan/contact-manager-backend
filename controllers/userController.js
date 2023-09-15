
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/contactRoutes");
const registerUser = asyncHandler(async(req,res)=>{
    const {username , email , password} =req.body;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //checking if there is an user with the specified email address
    const userAvailable = await User.findOne({email}) ;
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already registered")
    }
    
    //hashed password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,}
    )

    console.log(user);
    if(user)
    {
        res.status(201).json({_id:user.id,email:user.email})
    }
    else
    {
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({message:"Register the user"})
});


const loginUser = asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const user = await User.findOne({email})//checking if user is present
    
    //comparison of password
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
            //payload
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
    else
    {
        res.status(400);
        throw new Error("Email or password does not match")
    }

    res.json({message:"Login the user"})
});

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports= {registerUser,loginUser,currentUser};