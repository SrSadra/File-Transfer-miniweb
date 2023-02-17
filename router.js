const rout = require("express").Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const File = require("./models/File");
const path = require("path");

var storage = multer.diskStorage(
  {
      destination: './uploads/',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);

const upload = multer({storage : storage});

rout.get("/" ,async (req ,res) => {
  let temp = await File.collection.find().toArray();
  res.render("index" , {arrFile : temp});
})


rout.post("/" , upload.single("fileInp") , async (req ,res) => {
    const {password , upFile ,nameFile} = req.body;
    const fileData = {
        path : upFile,
        originalName : nameFile,
    }
    if (password != null && password !== ""){
        fileData.password = await bcrypt.hash(password , 10);
    }
    let fileInp = await File.create(fileData);
    console.log(fileData);
    let temp = await File.collection.find().toArray();
    res.render("index" , {arrFile : temp});
})

rout.route("/file/:id").post(downloadFunc).get(downloadFunc);


async function downloadFunc(req , res){
    const file = await File.findById(req.params.id)
    if (file.password != null) {
        if (req.body.password == null) {
          res.render("password");
          return;
        }
        if (!(await bcrypt.compare(req.body.password, file.password))) {
          res.render("password", { error: true });
          return;
        }
      }
    
      file.downloadCount += 1; 
      await file.save();
      console.log(file.downloadCount);
      let fileLoc = path.join("./uploads" , file.originalName);
      res.download(fileLoc ,file.originalName);
}


module.exports = rout;