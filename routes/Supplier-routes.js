const express = require('express');
const {
	getSuppliers,
	getSupplierById,
	addSupplier,
	updateSupplier,
	deleteSupplier
} = require('../controllers/Supplier-controller');

const router = express.Router();

router.get('/:id', getSupplierById);
router.get('/', getSuppliers);
router.post('/', addSupplier);
router.put('/update', updateSupplier);
router.delete('/delete', deleteSupplier);

module.exports = router;
