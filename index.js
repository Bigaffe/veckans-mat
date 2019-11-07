const mongo = require('mongodb').MongoClient;
const express = require("express");
const conString = "mongodb+srv://Mat:Good@matsedel-qtl3v.mongodb.net/test?retryWrites=true&w=majority";
let app;

makeConnection();
async function makeConnection(){
    
    const con = await mongo.connect(conString,{ useNewUrlParser: true, useUnifiedTopology: true });
    const db = await con.db("my-dishes-ab");
    const col = await db.collection("cars");
    // nu vet vi att vi har en uppkoppling till vår DB så att vi kan starta vår applikation
    app = express();
    // middleware för att kunna parsa req.body 
    app.use(express.urlencoded({extended:false}));
    app.listen(3500, function(){console.log("port: 3500")});
    // lägg kopplingen till vår kollektion till vårt app-objekt så att vi kan använda det om och om igen
    app.dishes = col;
    // ladda in vår egen route-modul och skicka in app som argument.
    require("./router")(app);
}
