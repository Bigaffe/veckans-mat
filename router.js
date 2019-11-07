const objectId = require("mongodb").ObjectID;
const renderHtml = require("./render-html");

module.exports = async function(app){
    app.get("/dishes", async function(req,res){

    
    try {
        const data = await app.dishes.find().toArray();

        let html = data.reverse().map(function(dish){

            return `
            
            <h2>${dish.food} </h2>
            <h4>${dish.mainingredient} </h4>
            <p> ${dish.supplement} </p>

            <a href = "/dishes/delete/${dish._id}"> Delete </a>
             <a href = "/dishes/edit/${dish._id}"> Edit </a> 
            `;

        });

        res.send(renderHtml("All dishes",html.join("")));
    } catch (error) {
        res.send("no data");
    }
    });


    app.get("/dishes/create",async function(req,res){
    res.sendFile(__dirname+"/form.html");
    });
    


    app.post("/dishes/create",async function(req,res){
        try {
            await app.dishes.insertOne(req.body);
            res.redirect("/dishes");

        } catch (error) {
            res.send("No dish is created");
        }
});

    app.get("/dishes/delete/:id", async function(req,res){

        try {

            let id = req.params.id;

            await app.dishes.deleteOne({"_id":objectId(id)});
            res.redirect("/dishes");
        } catch (error) {
            res.send("Error occurred");
        }

    })

}