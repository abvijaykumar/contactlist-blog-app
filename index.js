var express = require('express');



var path = require('path');
const fs = require('fs');
var app = express();
var table_name = "contacts-table-b8e77d6"

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});
const docClient = new AWS.DynamoDB.DocumentClient();

app.get('/', function (req, res) {

   res.send("COntact List application");
})

app.get('/fetchAllContacts', function (req, res) {
    var params = {
        TableName:table_name,
    }
    docClient.scan(params,(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

app.get('/addContact', function (req, res) {

    var contactName = req.query.contactName;
    var contactNumber = req.query.contactNumber;
    var params = {
        TableName:table_name,
        Item:{
            "ContactName": contactName,
            "ContactNumber": contactNumber,
        }
    };
    
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });


    console.log(req.query.contactName);
       
})
 
app.use(express.static(path.join(__dirname, 'public')));


var server = app.listen(80, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})