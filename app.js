const express=require('express');
const path=require("path");
const app= express();
const mongoose = require('mongoose');
const port=8000;
const bodyparser = require("body-parser");

//Connection of Mongodb
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}

//Mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS RELATED STUFF
app.use('/static',express.static('static')) // for serving static files
app.use(express.urlencoded());

// PUG RELATED STUFF
app.set('view engine','pug'); // set view enginge as pug
app.set('views',path.join(__dirname,'views')) //set the views directory


app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params); 
});
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params); 
});

app.post("/contact",(req,res)=>{
    console.log(req.body);
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{
        res.send("Item saved")
    }).catch(()=>{
        res.status(400).send("item was not saved")
    });
})

//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started succesfully on port ${port}`);
});