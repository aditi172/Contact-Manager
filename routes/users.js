const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require("config");
const {check, validationResult}=require("express-validator/check");
const User= require("../models/User");

//@route         POST /api/users
//@description   register a user
//@access        public
router.post("/",[
    check("name", "Please enter a name in the field").not().isEmpty(),
    check("email", "Please enter a valid Email").not().isEmpty().isEmail(),
    check("password", "Please enter a strong password of more than 6 characters").not().isEmpty().isLength({min: 6})
], async(req, res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    const {name, email, password}=req.body;
    try {
       let user=await User.findOne({ email });
       if(user) {
           return res.status(400).json({ msg: "The User already exists..."});
       }
       user=new User({
           name,
           email,
           password
       });
       const salt= await bcrypt.genSalt(10);
       user.password=await bcrypt.hash(password, salt);
       await user.save();
       const payload= {
           user: {
               id: user.id
           }
       }
       jwt.sign(payload, config.get("jwtSecret"), {
           expiresIn: 360000
       }, (err, token)=> {
            if(err) {
                throw err;
            }
            res.json({token});
       });
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

module.exports= router;
