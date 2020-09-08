const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const config=require("config");
const auth=require("../middleware/auth");
const {check, validationResult}=require("express-validator/check");
const User= require("../models/User");

//@route          GET /api/auth
//@description    get a logged in user 
//@access         private
router.get("/", auth, async(req, res)=> {
    try {
        const user=await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

//@route          POST /api/auth
//@description    Auth user and get token
//@access         public
router.post("/", [
    check("email", "Please enter a valid Email").not().isEmpty().isEmail(),
    check("password", "Please enter a strong password of more than 6 characters").exists()
], async (req, res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    const { email, password }=req.body;
    try {
        let user=await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: "Invalid User Credentials..."});
        }
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ msg: "Invalid User Credentials..."});
        }
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
        })
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

module.exports= router;
