var Product = require("../model/product").Product;

exports.index = function(req, res) {
	res.render('index', {
		title : 'Wykresy'
	});
};
exports.wykres1 = function(req, res) {
	res.render('wykres1', {
		title : 'Wykresy'
	});
};
exports.wykres2 = function(req, res) {
	res.render('wykres2', {
		title : 'Wykresy'
	});
};
exports.dostawcymarki = function(req, res) {
	Product.aggregate({ $match : { name : { $ne : "unknown" },
					 supplier_name : { $ne : "unknown" } } },
		{ $group : { _id : "$supplier_name",
					products : { $addToSet : "$name" } } }
	, function(err, docs) {
		if (!err) {
			res.send(JSON.stringify(docs));
		} else {
			console.log("Error kosztyprzeceny!!!");
			console.log(err);
		}
	});
};


exports.kosztyprzeceny = function(req, res) {
	Product.aggregate({	$sort : { type : 1 } },
		{ $match : { retail_price : { $gte : 1 },
					 supply_price : { $gte : 1 } } },
		{ $group : { _id : "$type",
					retail_price : { $sum : "$retail_price" },
					supply_price : { $sum : "$supply_price" } } }
	, function(err, docs) {
		if (!err) {
			res.send(JSON.stringify(docs));
		} else {
			console.log("Error kosztyprzeceny!!!");
			console.log(err);
		}
	});
};

exports.strata = function(req, res) {
	Product.aggregate({	$sort : { type : 1 } },
		{ $match : { retail_price : { $gte : 1 },
					 supply_price : { $gte : 1 } } },
		{ $project : { _id : { $toLower : "$name" } ,
					loss : { $add : [ "$retail_price", "$supply_price" ] } } }
	, function(err, docs) {
		if (!err) {
			res.send(JSON.stringify(docs));
		} else {
			console.log("Error strata!!!");
			console.log(err);
		}
	});
};

exports.przeceny = function(req, res) {
	Product.aggregate({	$sort : { type : 1 } },
		{ $match : { retail_price : { $gte : 1 } } },
		{ $group : { _id : "$type",
					retail_price : { $sum : "$retail_price" } } }
	, function(err, docs) {
		if (!err) {
			res.send(JSON.stringify(docs));
		} else {
			console.log("Error przeceny!!!");
			console.log(err);
		}
	});
};

exports.przecenaubrania = function(req, res) {
	Product.aggregate({	$sort : { type : 1 } },
		{ $match : { retail_price : { $gte : 1 },
					 type: "clothing" } },
		{ $group : { _id : "$type",
					retail_price : { $sum : "$retail_price" } } }
	, function(err, docs) {
		if (!err) {
			res.send(JSON.stringify(docs));
		} else {
			console.log("Error przecenaubrania!!!");
			console.log(err);
		}
	});
};

m = function() {
 	this.name.match(/[A-Z]?[a-z]+/g).forEach(function(word) {
    	emit(word, 1);
  	});
};

r = function(old, actual) { 
    var count = 0; 
    for (index in actual) {  
        count += actual[index]; 
    } 
    return count; 
}; 

var command = { 
    mapreduce: "vend", query: { name : { $ne : "unknown" }},
    map: m.toString(), reduce: r.toString(), 
    sort: { name : 1}, out: "counted" 
};

exports.mapreduce = function(req, res) {
	db.db.executeDbCommand(command, function(err, dbres) {
        console.log('Map reduce: ');
        console.log(dbres);
	});

	db.db.collection('counted', function(err, collection) {
        collection.find({value : { $gte : 2 }}).sort({'value': 1})
         .limit(100).toArray(function(err, vends) {
            res.send(JSON.stringify(vends));
        });

    });
};