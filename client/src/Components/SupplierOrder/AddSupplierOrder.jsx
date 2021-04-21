import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddSupplierOrder = () => {
	const [suppliers, setSuppliers] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [supplierOrder, setSupplierOrder] = useState({
		supplierId: '',
		supplierOrderId: '',
		supplyItem: '',
		qty: '',
		unitPrice: '',
		date: ''
	});

	const {
		supplierId,
		supplierOrderId,
		supplyItem,
		qty,
		unitPrice,
		date
	} = supplierOrder;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplier`
				);
				if (response.status === 200) {
					setSuppliers(response.data.suppliers);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
			}
			setIsLoading(false);
		}
		getData();
	}, []);

	const handleChange = (e) => {
		if (e.target.name === 'supplierId') {
			console.log(e.target.value);
			let supItem = suppliers.filter(
				(sup) =>
					sup.supplierId.toLowerCase() ===
					e.target.value.toLowerCase()
			);

			if (supItem.length > 0) {
				console.log(supItem[0].supplyItem);
				setSupplierOrder({
					...supplierOrder,
					['supplyItem']: supItem[0].supplyItem,
					[e.target.name]: e.target.value
				});
				return;
			}
		}
		setSupplierOrder({
			...supplierOrder,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let supplierCheck = suppliers.filter(
			(supplier) => supplier.supplierId === supplierId
		);
		if (supplierCheck.length === 0) {
			toast(`There is no supplier for id ${supplierId}`, {
				type: toast.TYPE.ERROR,
				autoClose: false
			});
			return;
		}
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplierOrder`,
				supplierOrder,
				config
			);

			if (response.status === 200) {
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
				setSupplierOrder({
					supplierId: '',
					supplierOrderId: '',
					supplyItem: '',
					qty: '',
					unitPrice: '',
					date: ''
				});
				setTimeout(() => {
					window.location.replace('/supplier-orders');
				}, 2000);
			}
		} catch (error) {
			toast(error.response.data.message, { type: toast.TYPE.ERROR });
		}
	};
	return (
		<>
			<div className='jumbotron text-center py-4  mb-5 page-jumbotron'>
				<h1 className='display-4 fw-bold'>Add New Supplier Order</h1>
				<div className='container'>
					<nav aria-label='breadcrumb'>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link
									to='/supplier-orders'
									className='no-decoration'>
									View Supplier orders
								</Link>
							</li>
							<li
								className='breadcrumb-item active'
								aria-current='page'>
								Add Supplier Order
							</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className='container mb-5'>
				<div className='row justify-content-center'>
					<div className='col-md-8 p-5 form-background'>
						{isLoading ? (
							<div className='row text-center'>
								<Loader
									type='Oval'
									color='#0d6efd'
									height={30}
									width={30}
								/>
							</div>
						) : (
							<form onSubmit={handleSubmit}>
								<div className='row'>
									<div className='form-group col-md-6'>
										<label htmlFor='supplierId'>
											Supplier ID
										</label>
										<input
											type='text'
											className='form-control'
											name='supplierId'
											placeholder='SP0001'
											value={supplierId}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='form-group col-md-6'>
										<label htmlFor='supplierOrderId'>
											Order Id
										</label>
										<input
											type='text'
											className='form-control'
											name='supplierOrderId'
											value={supplierOrderId}
											onChange={handleChange}
											required
											placeholder='SO0004'
										/>
									</div>
								</div>
								<div className='row'>
									<div className='form-group col-md-6'>
										<label htmlFor='supplyItem'>
											Supply Item
										</label>
										<input
											type='text'
											className='form-control'
											name='supplyItem'
											placeholder='supplyItem'
											value={supplyItem}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-group col-md-6'>
										<label htmlFor='qty'>Quantity</label>
										<input
											type='number'
											className='form-control'
											name='qty'
											placeholder='10'
											value={qty}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className='row'>
									<div className='form-group col-md-6'>
										<label htmlFor='unitPrice'>
											Unit Price
										</label>
										<input
											type='number'
											className='form-control'
											name='unitPrice'
											placeholder='unitPrice'
											value={unitPrice}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-group col-md-6'>
										<label htmlFor='unitPrice'>
											Total price
										</label>
										<input
											type='number'
											className='form-control'
											name='unitPrice'
											placeholder='unitPrice'
											value={unitPrice * qty}
											readOnly
										/>
									</div>
								</div>

								<div className='form-group'>
									<label htmlFor='supplyItem'>Date</label>
									<input
										type='date'
										className='form-control'
										name='date'
										placeholder='2021-04-16'
										value={date}
										onChange={handleChange}
										required
									/>
								</div>

								<button
									type='submit'
									className='btn btn-primary mt-5 w-100 float-end'>
									Add Supplier Order
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddSupplierOrder;
