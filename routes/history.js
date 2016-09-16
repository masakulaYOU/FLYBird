var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myDB';

function history(history){
	this.endplace = history.endpalce;
	this.time = history.time;
	this.startplace = history.startplace;
}

history.prototype.save = function hisSave(callback){
	var newhis = {
		startplace:this.startplace,
		endpalce:this.endplace,
		time:this.time
	};


}

history.get = function get(callback){
	MongoClient.connect(url,function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('users',function(err,collection){
			if(err){
				db.close();
				return callback(err);
			}

			collection.findOne({name:username},function(err,doc){
				db.close();
				if(doc){
					var user = new User(doc);
					callback(err,user);
				} else{
					callback(err,null);
				}
			})
		})
	})
}


var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}