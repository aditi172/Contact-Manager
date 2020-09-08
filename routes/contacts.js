const express=require("express");
const router=express.Router();
const {check, validationResult}=require("express-validator/check");
const Contacts= require("../models/Contacts");
const auth=require("../middleware/auth");

//@route        GET /api/contacts
//@description  get contacts of users
//@access       private
router.get("/", auth, async(req, res)=> {
    try {
        const contacts=await Contacts.find({ user: req.user.id }).sort({date: -1});
        res.json(contacts);
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

//@route        POST /api/contacts
//@description  add contacts to users list
//@access       private
router.post("/", [auth, [
    check("name", "Please enter a name in the field").not().isEmpty(),
    check("email", "Please enter a valid Email").not().isEmpty().isEmail(),
]], async (req, res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    const { name, email, type, phone}= req.body;
    try {
        const newContact=new Contacts({
            name,
            email,
            type,
            phone,
            user: req.user.id
        });
        const contact=await newContact.save();
        res.json(contact);
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

//@route        PUT /api/contacts/:id
//@description  update contact
//@access       private
router.put("/:id", auth, async (req, res)=> {
    const { name, email, type, phone}= req.body;
    //build contact object
    const contactField={};
    if(name) contactField.name=name;
    if(email) contactField.email=email;
    if(type) contactField.type=type;
    if(phone) contactField.phone=phone;

    try {
        let contact=await Contacts.findById(req.params.id);
        if(!contact) {
            return(res.status(404).json({ msg: "Contact not found"}));
        }
        //make sure change maker is authenticated
        if(contact.user.toString()!==req.user.id) {
            return(res.status(401).json({ msg: "Not Authorized"}));
        }
        contact=await Contacts.findByIdAndUpdate(req.params.id, {$set: contactField}, {new: true});
        res.json(contact);
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

//@route        DELETE /api/contacts/:id
//@description  delete a contact
//@access       private
router.delete("/:id", auth, async (req, res)=> {
    try {
        let contact=await Contacts.findById(req.params.id);
        if(!contact) {
            return(res.status(404).json({ msg: "Contact not found"}));
        }
        //make sure change maker is authenticated
        if(contact.user.toString()!==req.user.id) {
            return(res.status(401).json({ msg: "Not Authorized"}));
        }
        await Contacts.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed"});
 
    } catch(er) {
        console.error(er.message);
        res.status(500).send("Server Error");
    }
});

module.exports= router;
