import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SupplierOrderTable from './SupplierOrderTable';

const ViewSupplierOrders = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [supplierOrders, setSupplierOrders] = useState([]);
	const [baseData, setBaseData] = useState([]);
	const [deleted, setDeleted] = useState(0);

	useEffect(() => {
		async function gedData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplierorder`
				);
				if (response.status === 200) {
					setSupplierOrders(response.data.orders);
					setBaseData(response.data.orders);
				}
			} catch (error) {
				toast(error.response.data.message, { type: toast.TYPE.ERROR });
			}
			setIsLoading(false);
		}
		gedData();
	}, [deleted]);
	const search = (inp) => {
		if (!inp.target.value) {
			setSupplierOrders(baseData);
		} else {
			let searchList = baseData.filter(
				(data) =>
					data.supplierOrderId
						.toLowerCase()
						.includes(inp.target.value.toLowerCase()) ||
					data.supplyItem
						.toLowerCase()
						.includes(inp.target.value.toLowerCase())
			);
			setSupplierOrders(searchList);
		}
	};
	return (
		<>
			<div className='jumbotron text-center py-4  mb-5 page-jumbotron'>
				<h1 className='display-4 fw-bold'>Supplier order Details</h1>
			</div>
			<div className='container my-3'>
				<div className='row justify-content-between'>
					<div className='col-md-4'>
						<div className='input-group w-100'>
							<div className='form-outline w-100'>
								<input
									placeholder='🔍 Search Orders (use id or item name)'
									type='search'
									id='form1'
									className='form-control'
									onChange={search}
								/>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<Link
							className='btn btn-primary w-100'
							to='/new-supplier-order'>
							+ NEW ORDER
						</Link>
					</div>
				</div>
			</div>
			{isLoading ? (
				<div className='container text-center py-5'>
					<Loader
						type='Oval'
						color='#0d6efd'
						height={30}
						width={30}
					/>
				</div>
			) : supplierOrders.length > 0 ? (
				<SupplierOrderTable
					supplierOrders={supplierOrders}
					setDeleted={setDeleted}
					deleted={deleted}
				/>
			) : (
				<div className='container text-center py-5'>
					<h3>No supplier orders found</h3>
				</div>
			)}
		</>
	);
};

export default ViewSupplierOrders;
