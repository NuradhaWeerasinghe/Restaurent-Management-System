const Supplier = require('../models/Supplier-model');
const SupplierOrder = require('../models/Supplier-Order-model');

const addSupplier = async (req, res, next) => {
	const {
		supplierId,
		supplierName,
		email,
		phoneNumber,
		address,
		supplyItem
	} = req.body;

	let suppliers;
	try {
		suppliers = await Supplier.find({
			$or: [
				{
					supplierId: supplierId.toUpperCase()
				},
				{
					email: email
				},
				{
					phoneNumber: phoneNumber
				}
			]
		});

		if (suppliers.length > 0) {
			return res.status(400).json({
				message:
					'There is an another supplier using either same supplier Id , email or the phone number. Please re check and try again'
			});
		}

		const supplier = new Supplier({
			supplierId: supplierId.toUpperCase(),
			supplierName,
			email,
			phoneNumber,
			address,
			supplyItem
		});

		await supplier.save();
		return res.status(201).json({ message: 'Supplier added', supplier });
	} catch (err) {
		return res.status(500).json({
			message: 'Server error while adding a supplier. Please try again'
		});
	}
};

const getSuppliers = async (req, res, next) => {
	try {
		const suppliers = await Supplier.find();
		if (suppliers.length == 0) {
			return res.status(404).json({ message: 'No suppliers found yet' });
		}
		return res.status(200).json({ message: 'Suppliers found', suppliers });
	} catch (err) {
		return res.status(500).json({
			message: 'Server error while getting suppliers. Please try again'
		});
	}
};

const getSupplierById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const supplier = await Supplier.findOne({
			supplierId: id.toUpperCase()
		});
		if (!supplier) {
			return res.status(404).json({
				message: `No supplier found for the id - ${id}, please re-check and try again`
			});
		}
		return res.status(200).json({ message: 'Supplier found', supplier });
	} catch (err) {
		return res.status(500).json({
			message: `Server error while getting supplier with id - ${id}. Please try again`
		});
	}
};

const updateSupplier = async (req, res, next) => {
	const {
		supplierId,
		supplierName,
		email,
		phoneNumber,
		address,
		supplyItem
	} = req.body;
	let upSupplier;
	try {
		upSupplier = await Supplier.findOne({ supplierId });
		if (!upSupplier) {
			return res
				.status(404)
				.json({ message: 'No supplier found for this id' });
		}
		if (upSupplier.email != email) {
			let checkSupplier = await Supplier.findOne({ email });
			if (checkSupplier) {
				return res.status(400).json({
					message:
						'There is an another supplier using this new email. Please select a new one'
				});
			}
			upSupplier.email = email;
		}
		if (upSupplier.phoneNumber != phoneNumber) {
			let checkSupplier = await Supplier.findOne({ phoneNumber });
			if (checkSupplier) {
				return res.status(400).json({
					message:
						'There is an another supplier using this new Phone Number. Please select a new one'
				});
			}
			upSupplier.phoneNumber = phoneNumber;
		}
		if (upSupplier.supplierName != supplierName)
			upSupplier.supplierName = supplierName;

		if (upSupplier.address != address) upSupplier.address = address;
		if (upSupplier.supplyItem != supplyItem)
			upSupplier.supplyItem = supplyItem;

		console.log(upSupplier);
		await upSupplier.save();
		return res
			.status(200)
			.json({ message: 'Supplier updated successfully', upSupplier });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message:
				'Server error while updating the supplier, please try again'
		});
	}
};

const deleteSupplier = async (req, res, next) => {
	const { id } = req.body;
	try {
		let supplier = await Supplier.findOne({ supplierId: id });
		if (!supplier) {
			return res.status(404).json({
				message: `There is no supplier with ${id} - id, Please recheck and try again`
			});
		}

		await SupplierOrder.deleteMany({
			supplierId: supplier._id
		});

		await supplier.remove();
		return res
			.status(200)
			.json({ message: 'Supplier removed successfully' });
	} catch (err) {
		return res.status(500).json({
			message:
				'Server error while deleting the supplier, Please try again'
		});
	}
};

exports.addSupplier = addSupplier;
exports.getSuppliers = getSuppliers;
exports.getSupplierById = getSupplierById;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;
