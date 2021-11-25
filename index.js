var express = require('express');
var path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');


var app = express();
var docClient = new AWS.DynamoDB.DocumentClient();

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/addContact', function (req, res) {

    var contactName = req.query.contactName;
    var contactNumber = req.query.contactNumber;
    var params = {
        TableName:"contacts-table",
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


var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})