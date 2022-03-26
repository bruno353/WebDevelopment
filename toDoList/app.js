const express = require("express");
const bodyParser = require("body-parser");

var items = [];
var workItems = [];

const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
//temos que especificar quais arquivos o ejs deve olhar e pegar informações:
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItem: items});
});

app.post("/", function(req, res){
    var item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        // não vamos renderizar d novo, ao invés disso passamos o valor aonde
        //chamamos o primeiro "render" - linha 18 - e aqui nós apenas redirecionamos
        //para lá.
        res.redirect("/");
    }

})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItem: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function(){
});