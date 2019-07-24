var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/todo';
var str = "";
app.route('/').get(function(req,res) {
    MongoClient.connect(url,function(err,client) {
        var db = client.db('todoDB');
        var cursor = db.collection('todo').find();
        cursor.forEach(function(item) {
            if(item != null) {
                str = str + item + "</br>";
            }
        }, function(err) {
            res.send(str);
            client.close();
        });
    });
});
app.listen(3000, function());