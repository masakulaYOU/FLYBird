// var mongodb = require('mongodb');
// var monk = require('monk');
// var db = monk('localhost:27017/myDB');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myDB';
// Use connect method to connect to the Server


function User(user){
	this.name = user.name;
	this.password = user.password;
};

module.exports = User;

User.prototype.save = function save(callback){
	//存入MongoDB的文档
	var user = {
		name:this.name,
		password:this.password
	};
	MongoClient.connect(url, function(err, db) {
  	if(err){
  		db.close();
  		return callback(err);
  	}
  	db.collection('users',function(err,collection){
			if(err){
				db.close();
				return callback(err);
			}
			collection.ensureIndex('name',{unique:true});
			//写入文档
			collection.insert(user,{safe:true},function(err,user){
				db.close();
				callback(err,user);
			})
		})

  	db.close();
	});
}

User.get = function get(username,callback){
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
					callback(err,doc);
				} else{
					callback(err,null);
				}
			})
		})
	})
}

User.savehis = function savehis(username,history,callback){
	var newhis = {
		startplace:history.startplace,
		endplace:history.endplace,
		time:history.time
	}
	var his = User.get(username,function(err,doc){
		if(!doc.history){
			MongoClient.connect(url,function(err,db){
				if(err){
		  		db.close();
		  		return callback(err);
		  		}
		  	db.collection('users',function(err,collection){
					if(err){
						db.close();
						return callback(err);
					}
					//写入文档
					collection.update({name:username},{$set:{history:[newhis]}},function(err,result){
						db.close();
						callback(err,result);
					})
				})

		  	db.close();
			})
		} else{
			MongoClient.connect(url, function(err, db) {
		  	if(err){
		  		db.close();
		  		return callback(err);
		  	}
		  	db.collection('users',function(err,collection){
					if(err){
						db.close();
						return callback(err);
					}
					//写入文档
					collection.update({name:username},{$push:{history:newhis}},function(err,result){
						db.close();
						callback(err,result);
					})
				})

		  	db.close();
			});
		}
	})
}