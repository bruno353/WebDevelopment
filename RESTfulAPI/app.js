//jshint esversion:6
//API with a article's database

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connecting to mongodb local database:
mongoose.connect("mongodb://localhost:27017/<db-name>", {useNewUrlParser: true});

//creating collections, using "Articles db" as an example :
const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

//route:
//initializing connections:
app.route("/articles")
.get(function(req, res){
    Article.find(function(err, foundArticles){
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        } 
    });
})
.post(function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    }); 
    newArticle.save(function(err){
        if (!err){
            res.send("Successfully added a new article.");
        } else{
            res.send(err);
        }
    });
 })
 .delete(function(req, res){
    Article.deleteMany(function(err){
        if (!err){
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

//Requests targetting a specific article:
app.route("/articles/:articleTitle")
.get(function(req, res){

    Article.findOne({title:req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles was found")}
    });
})
.put(function(req, res){
     Article.replaceOne(
         {title: req.params.articleTitle},
         {title: req.body.title, content: req.body.content},
         {overwrite: true},
         function(err){
             if (!err){
                 res.send("No errors!")
             }
         }
         );
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});