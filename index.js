var express = require('express');
const cors = require('cors');

var app = express();
app.use(cors())

var table_name = "contacts-table"

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});
const docClient = new AWS.DynamoDB.DocumentClient();

app.get('/', function (req, res) {
   res.send("Contact List API");
})

app.get('/fetchAllContacts', function (req, res) {
    var params = {
        TableName:table_name
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
    console.log(contactName);
    console.log(contactNumber);
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

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Contact apis listening at http://%s:%s", host, port);
})