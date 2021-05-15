import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const UpdateSupplier = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [supplier, setSupplier] = useState({
		supplierId: '',
		supplierName: '',
		email: '',
		phoneNumber: '',
		address: '',
		supplyItem: ''
	});

	const {
		supplierId,
		supplierName,
		email,
		phoneNumber,
		address,
		supplyItem
	} = supplier;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplier/${params.id}`
				);
				
				if (response.status === 200) {
					setIsLoading(false);
					setSupplier(response.data.supplier);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
				setTimeout(() => {
					window.location.replace('/supplier');
				}, 2000);
			}
		}
		getData();
	}, [params.id]);

	const handleChange = (e) => {
		setSupplier({ ...supplier, [e.target.name]: e.target.value });
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
				`${process.env.REACT_APP_BACKEND_URL}/api/supplier/update`,
				supplier,
				config
			);

			if (response.status === 200) {
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
				setSupplier({
					supplierId: '',
					supplierName: '',
					email: '',
					phoneNumber: '',
					address: '',
					supplyItem: ''
				});
				setTimeout(() => {
					window.location.replace('/supplier');
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
					Update Supplier - {params.id}
				</h1>
				<div className='container'>
					<nav aria-label='breadcrumb'>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>
								<Link to='/supplier' className='no-decoration'>
									View Suppliers
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
											required
										/>
									</div>

									<div className='form-group col-md-6'>
										<label htmlFor='name'>Name</label>
										<input
											type='text'
											className='form-control'
											name='supplierName'
											value={supplierName}
											onChange={handleChange}
											required
											placeholder='Prima '
										/>
									</div>
								</div>
								<div className='row'>
									<div className='form-group col-md-6'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											className='form-control'
											name='email'
											placeholder='Email'
											value={email}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-group col-md-6'>
										<label htmlFor='phoneNumber'>
											Phone
										</label>
										<input
											type='text'
											className='form-control'
											name='phoneNumber'
											placeholder='+9471-122-4223'
											value={phoneNumber}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className='row'>
									<div className='form-group col-md-6'>
										<label htmlFor='address'>Address</label>
										<textarea
											className='form-control'
											name='address'
											placeholder='Address'
											value={address}
											onChange={handleChange}
											required
										/>
									</div>
									<div className='form-group col-md-6'>
										<label htmlFor='supplyItem'>
											Supply Item
										</label>
										<input
											type='text'
											className='form-control'
											name='supplyItem'
											placeholder='Flour'
											value={supplyItem}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<button
									type='submit'
									className='btn btn-primary mt-5 w-100 float-end'>
									Update supplier
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateSupplier;
