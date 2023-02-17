const mongoose = require("mongoose");

const FileList = {
    fileData : {
        type : File,
        require : true
    }
}

FileList = mongoose.model("FileList" , FileList);

module.exports = FileList;
