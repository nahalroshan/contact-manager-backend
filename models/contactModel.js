const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },


    name:{
        type:String,
        required:[true,"Name missing"]
    },
    email:{
        type:String,
        required:[true,"email missing"]
    },
    phone:{
        type:String,
        required:[true,"phone number missing"]
    }
},{
    timestamps:true,
});


module.exports=mongoose.model("Contact",contactSchema);