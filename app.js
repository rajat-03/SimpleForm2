
const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const path= require("path");

const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/', (req,res) => {

    const { uid, password, name, address, email} = req.body;

    // make sure fields are filled
    if(!uid || !password || !name || !address || !email) {
        res.redirect("/failure.html");
        return;
    }
//construct data
const data = {
    members: [
    {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            USERID: uid,
            NAME: name,
            PASSWORD: password,
            ADDRESS: address
        }
    }]
}

const postData = JSON.stringify(data);

     const options = {
        url: "https://us1.api.mailchimp.com/3.0/lists/7db2d7f155",
        method: "POST",

        headers : {
            Authorization: "auth 98aa85dd02c977f72add01be164474c6-us1"
        },
        body: postData
     }
    request(options, (err, response,body) => {

            if(err) {
                res.redirect("failure.html");
            }else {
                if(response.statusCode === 200) {
                    res.redirect("success.html");
                }else {
                    res.redirect("failure.html");
                }
            }
    });


});


app.listen(process.env.PORT || 5000, function(){

console.log("server is running on port 5000");
});



// api key
// 98aa85dd02c977f72add01be164474c6-us1

//list id
// 7db2d7f155