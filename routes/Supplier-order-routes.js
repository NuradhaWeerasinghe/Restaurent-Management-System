const express = require('express');
const {
	addSupplierOrder,
	getSupplierOrders,
	getSupplierOrderById,
	updateSupplierOrder,
	deleteSupplierOrder
} = require('../controllers/Supplier-order-controller.js');
const router = express.Router();

router.get('/:id', getSupplierOrderById);
router.get('/', getSupplierOrders);
router.post('/', addSupplierOrder);
router.put('/update', updateSupplierOrder);
router.delete('/delete', deleteSupplierOrder);

module.exports = router;
