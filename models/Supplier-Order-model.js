const mongoose = require('mongoose');

const SupplierOrderSchema = mongoose.Schema({
	supplierId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Supplier'
	},
	supplierOrderId: {
		type: String,
		require: true,
		unique: true
	},
	supplyItem: {
		type: String,
		require: true
	},
	qty: {
		type: Number,
		require: true
	},
	unitPrice: {
		type: Number,
		require: true
	},
	totalPrice: {
		type: Number,
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('SupplierOrder', SupplierOrderSchema);
