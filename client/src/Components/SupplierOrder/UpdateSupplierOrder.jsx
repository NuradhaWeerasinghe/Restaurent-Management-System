import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const UpdateSupplierOrder = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [supplierOrder, setSupplierOrder] = useState({
		supplierId: '',
		supplierOrderId: '',
		supplyItem: '',
		qty: '',
		unitPrice: '',
		date: ''
	});

	const { supplierOrderId, supplyItem, qty, unitPrice, date } = supplierOrder;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplierorder/${params.id}`
				);
				console.log(response);
				if (response.status === 200) {
					setIsLoading(false);
					setSupplierOrder(response.data.order);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
				setTimeout(() => {
					window.location.replace('/supplier-orders');
				}, 2000);
			}
		}
		getData();
	}, [params.id]);

	const handleChange = (e) => {
		setSupplierOrder({ ...supplierOrder, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await axios.put(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplierorder/update`,
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
				<h1 className='display-4 fw-bold'>
					Update Supplier Order- {params.id}
				</h1>
				<div className='container'>
					<nav aria-label='breadcrumb'>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link
									to='/supplier-orders'
									className='no-decoration'>
									View Supplier Orders
								</Link>
							</li>
							<li
								className='breadcrumb-item active'
								aria-current='page'>
								Update Supplier
							</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className='container mb-5'>
				<div className='row justify-content-center'>
					<div className='col-md-8 p-5 form-background justify-content-center'>
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
									<div className='form-group col-md-12'>
										<label htmlFor='supplierOrderId'>
											Order Id
										</label>
										<input
											type='text'
											className='form-control'
											name='supplierOrderId'
											value={supplierOrderId}
											// onChange={handleChange}
											readOnly
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
									/>
								</div>

								<button
									type='submit'
									className='btn btn-primary mt-5 w-100 float-end'>
									Update this order
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateSupplierOrder;
