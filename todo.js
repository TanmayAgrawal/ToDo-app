var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/todoDB';
var str = "";
app.route('/').get(function(req,res) {
    var insert = req.query.insert;
    var remove = req.query.remove;
    var edit = req.query.edit;
    MongoClient.connect(url,{useNewUrlParser : true},function(err,client) {
        var db = client.db('todoDB');
        db.collection('todo').insertOne( {
            task : insert
        });
        db.collection('todo').deleteOne(
            { task : remove
            });
        var cursor = db.collection('todo').find();
        cursor.forEach(function(item) {
            if(item != null) {
                str = str + item.task + "</br>";
            }
        }, function(err) {
            res.send(str);
            client.close();
        });
    });
});
app.listen(3000, function(){
    console.log("Working");
});