const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,"Name missing"]
    },
    email:{
        type:String,
        required:[true,"email missing"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Password missing"]
    }
},{
    timestamps:true,
});


module.exports=mongoose.model("User",userSchema);