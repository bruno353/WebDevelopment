//app that allows to sign people for a mail list - like a newsletter.
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
 
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    
    const url = "https://us14.api.mailchimp.com/3.0/lists/31497af653";

    const options = {
        method: "POST",
        auth:"brunolaureanors1@gmail.com:46e6b5eb3fbf138f80dfc85a38347bf2-us14"
    }

    const request = https.request(url, options, function(response){



        response.on("data", function(data){
             const JsonFile = JSON.parse(data);
             if(JsonFile.error_count === 0){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
             
        })


    })

    request.write(jsonData);
    request.end();


});



app.listen(3000, function(){
    console.log("server ready to go");
});

//API KEY
//46e6b5eb3fbf138f80dfc85a38347bf2-us14

//list ID
//31497af653