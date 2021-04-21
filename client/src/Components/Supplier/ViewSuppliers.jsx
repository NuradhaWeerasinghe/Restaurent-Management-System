import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SuppliersTable from './SuppliersTable';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const ViewSuppliers = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [suppliers, setSuppliers] = useState([]);
	const [baseData, setBaseData] = useState([]);
	const [deleted, setDeleted] = useState(0);

	useEffect(() => {
		async function gedData() {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/supplier`
				);
				if (response.status === 200) {
					setSuppliers(response.data.suppliers);
					setBaseData(response.data.suppliers);
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
			setSuppliers(baseData);
		} else {
			// if(inputvalue === supplierID || inputvalue === supplierName)
			let searchList = baseData.filter(
				(data) =>
					data.supplierId
						.toLowerCase()
						.includes(inp.target.value.toLowerCase()) ||
					data.supplierName
						.toLowerCase()
						.includes(inp.target.value.toLowerCase())
			);
			setSuppliers(searchList);
		}
	};
	
	return (
		<>
			<div className='jumbotron text-center py-4  mb-5 page-jumbotron'>
				<h1 className='display-4 fw-bold'>Suppliers Details</h1>
			</div>
			<div className='container my-3'>
				<div className='row justify-content-between'>
					<div className='col-md-3'>
						<div className='input-group w-100'>
							<div className='form-outline w-100'>
								<input
									placeholder='🔍 Search Supplier (use id or name)'
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
							to='/add-new-supplier'>
							+ Add New
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
			) : suppliers.length > 0 ? (
				<SuppliersTable
					suppliers={suppliers}
					setDeleted={setDeleted}
					deleted={deleted}
				/>
			) : (
				<div className='container text-center py-5'>
					<h3>No suppliers found</h3>
				</div>
			)}
		</>
	);
};

export default ViewSuppliers;
