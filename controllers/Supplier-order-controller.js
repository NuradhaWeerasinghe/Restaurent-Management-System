const Supplier = require('../models/Supplier-model');
const SupplierOrder = require('../models/Supplier-Order-model');

const addSupplierOrder = async (req, res, next) => {
	const {
		supplierId,
		supplierOrderId,
		supplyItem,
		qty,
		unitPrice,
		date
	} = req.body;
	try {
		const supplier = await Supplier.findOne({
			supplierId: supplierId.toUpperCase()
		});
		if (!supplier) {
			return res.status(404).json({
				message: `No supplier found for the id - ${supplierId}, please re-check and try again`
			});
		}

		let supplierOrderCheck = await SupplierOrder.findOne({
			supplierOrderId
		});
		if (supplierOrderCheck) {
			return res.status(400).json({
				message: `There is an supplier order in databse with the id ${supplierId}, please add new supplier order id`
			});
		}
		let newSupplierOrder = new SupplierOrder({
			supplierId: supplier._id,
			supplierOrderId: supplierOrderId.toUpperCase(),
			supplyItem,
			qty,
			unitPrice,
			totalPrice: qty * unitPrice,
			date: date ? date : Date.now()
		});

		await newSupplierOrder.save();
		return res.status(200).json({
			message: 'Supplier order created successfully',
			newSupplierOrder
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Error while creating a supplier order, please try again'
		});
	}
};

const getSupplierOrders = async (req, res, next) => {
	try {
		const orders = await SupplierOrder.find().populate('supplierId');
		if (orders.length === 0) {
			return res
				.status(404)
				.json({ message: 'No Supplier Orders found yet' });
		}

		return res.status(200).json({ message: 'Orders found', orders });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'Server error while finding orders, Please try again'
		});
	}
};

const getSupplierOrderById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const order = await SupplierOrder.findOne({
			supplierOrderId: id.toUpperCase()
		});
		if (!order) {
			return res.status(404).json({
				message: `No order found for the id - ${supplierId}, please re-check and try again`
			});
		}

		return res.status(200).json({ message: 'Order found', order });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: `Server error while finding order with id - ${id}, Please try again`
		});
	}
};

const updateSupplierOrder = async (req, res, next) => {

	const {
		supplierId,
		supplierOrderId,
		supplyItem,
		qty,
		unitPrice,
		date
	} = req.body;
	try {
		const supplier = await Supplier.findById(supplierId);
		if (!supplier) {
			return res.status(404).json({
				message: `No supplier found for the id - ${supplierId}, please re-check and try again`
			});
		}

		let supplierOrder = await SupplierOrder.findOne({
			supplierOrderId
		});
		if (!supplierOrder) {
			return res.status(400).json({
				message: `There is no supplier order in databse with the id ${supplierId}, please check updating supplier order id`
			});
		}else{
			console.log(supplyItem);
		}

		if (supplierOrder.supplierId != supplierId) {
			supplierOrder.supplierId = supplier._id;
		}
		if (supplierOrder.qty != qty) {
			supplierOrder.qty = qty;
			supplierOrder.totalPrice = qty * unitPrice;
		}
		if (unitPrice != supplierOrder.unitPrice) {
			supplierOrder.unitPrice = unitPrice;
			supplierOrder.totalPrice = qty * unitPrice;
		}
		if (supplierOrder.date != date) {
			supplierOrder.date = date;
		}
		supplierOrder.supplyItem = supplyItem;
		await supplierOrder.save();
		return res.status(200).json({
			message: 'Supplier order updated successfully',
			supplierOrder
		});
	} catch (err) {
		return res.status(500).json({
			message: 'Error while updating the supplier order, please try again'
		});
	}
};

const deleteSupplierOrder = async (req, res, next) => {
	const { id } = req.body;
	try {
		await SupplierOrder.deleteOne({ supplierOrderId: id.toUpperCase() });
		return res
			.status(200)
			.json({ message: 'Supplier order deleted successfully' });
	} catch (err) {
		return res.status(500).json({
			message: 'Error while deleting the supplier order, please try again'
		});
	}
};

exports.addSupplierOrder = addSupplierOrder;
exports.getSupplierOrders = getSupplierOrders;
exports.getSupplierOrderById = getSupplierOrderById;
exports.updateSupplierOrder = updateSupplierOrder;
exports.deleteSupplierOrder = deleteSupplierOrder;
