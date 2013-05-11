var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  	name : String,
	description : String,
	type : String,
	variant_option_one_name : String,
	variant_option_one_value : String,
	tags : String,
	supply_price : Number,
	retail_price : Number,
	tax_name : String,
	brand_name : String,
	supplier_name : String,
	active : Number,
	track_inventory : Number,
	inventory_auckland : Number,
	reorder_point_auckland : Number,
	restock_level_auckland : Number
});

var product = mongoose.model("Product", productSchema, "vend");

module.exports = {
  Product : product
};