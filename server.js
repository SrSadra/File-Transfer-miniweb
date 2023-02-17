let express = require("express");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config();
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");


app.set("view engine" , "ejs");
app.set('views', __dirname + '\\views');

app.use(bodyParser.json());
app.use(express.static(__dirname + "/scripts"));
app.use(bodyParser.urlencoded({
    extended: true
}))
// app.use(expressLayouts); 

// app.get("/" , (req ,res) => {
//     res.render("index");
// })
mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser : true} ).then(() => {
    console.log("mongoose connected");
}).catch((error) => {console.log(error);});


app.listen(3000 , (err , res) => {
    if (err){
        console.log(err);
    }
    else {
        console.log("listening on port 3000");
    }
})

 app.use("/" , require("./router"));