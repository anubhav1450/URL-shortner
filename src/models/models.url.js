const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortCode:{
        type:String,
        unique:true,
        required : true,
        index:true
    },
    originalURL:{
        type: String,
        required: true,

    },
    visitHistory:[{
        timestamp: {type: Date}}],
},
{timestamps: true}
);
const URL  = mongoose.model("url", urlSchema);
module.exports = URL;
