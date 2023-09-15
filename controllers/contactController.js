
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");


const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});






const createContact = asyncHandler(async(req, res) => {
    console.log("Details of the client:", req.body);
    //Error handling
    const { name, email, phone } = req.body;//destructuring
    if (!name || !email || !phone) {
        res.status(400);//status code
        throw new Error("All fields are mandatory");
    }

    //if everything is present
    const contact = await Contact.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        user_id:req.user.id
    });
    console.log(req.body
        .name);
        console.log(contact)
    res.status(201).json(contact);
});






const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(403);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});





const getContacts = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(403);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});






const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(403);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});




module.exports = { getContact, createContact, deleteContact, updateContact, getContacts }