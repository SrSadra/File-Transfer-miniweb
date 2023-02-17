const mongoose = require("mongoose");

const file = {
    path: {
        type: String ,
        require : true
    },
    originalName : {
        type: String,
        require : true
    },
    password : {
        type : String,
        require : false
    },
    downloadCount : {
        type : Number,
        default : 0,
        require : true
    },
}

const File = mongoose.model("file" , file);

module.exports = File;