const express = require('express');
const router = express.Router();
const {getContact, createContact, updateContact, deleteContact, getContacts} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenhandler');
router.use(validateToken);
router.route("/").get(getContact)

router.route("/").post(createContact);


router.route("/:id").get(getContacts);


router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports=router;