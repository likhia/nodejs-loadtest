var express = require('express');
var mongodb = require('mongodb');
const fs = require('fs');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

var uri="mongodb+srv://<username>:<password>@<atlas cluster>/?retryWrites=true&w=majority";

// Initialize connection once
MongoClient.connect(uri, function(err, client) {
  if(err) throw err;

  db = client.db("playerDB");
  //console.log(db);
  
  //db.collection("playerCredit");

  // Start the application after the database connection is ready
  app.listen(9230);
  console.log("Listening on port 9230");
});

// Reuse database object in request handlers
app.get("/find", function(req, res) {

  const collection = db.collection("playerCredit");
  var query = { _id : req.query.name };
  collection.findOne(query, function(err, doc) {
      
      res.json(doc);

      
  });

});

app.get("/modify", function(req, res) {

  const collection = db.collection("playerCredit");
  var findOneQuery = { _id : req.query.name };
  const updateDoc = { $inc : { validCredit: 1 } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const updateOptions = { includeResultMetadata: true, returnDocument: "after" };
 
    collection.findOneAndUpdate(findOneQuery,updateDoc,updateOptions, function(err, result) {

	    if(err) {
		console.error(`Something went wrong trying to update one document: ${err}\n`);
	    }
	    res.json(result);
    });

});




