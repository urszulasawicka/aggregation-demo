var Product = require("../model/product").Product;

exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
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