import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuppliersTable = ({ suppliers, deleted, setDeleted }) => {
	const deleteSupplier = async (supplier) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplier/delete`,
				{
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						id: supplier.supplierId
					}
				}
			);

			if (response.status === 200) {
				setDeleted(deleted + 1);
				toast(response.data.message, { type: toast.TYPE.SUCCESS });
			}
		} catch (error) {
			toast(error.response.data.message, { type: toast.TYPE.ERROR });
		}
	};
	return (
		<div className='container'>
			<table className='table table-striped border'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Supplier ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Email</th>
						<th scope='col'>Phone number</th>
						<th scope='col'>Address</th>
						<th scope='col'>Supply Item</th>
						<th scope='col'>Manage</th>
					</tr>
				</thead>
				<tbody>
					{suppliers.map((supplier, index) => {
						return (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								<td>{supplier.supplierId}</td>
								<td>{supplier.supplierName}</td>
								<td>{supplier.email}</td>
								<td>{supplier.phoneNumber}</td>
								<td>{supplier.address}</td>
								<td>{supplier.supplyItem}</td>
								<td>
									<Link
										to={`/update-supplier/${supplier.supplierId}`}
										className='btn btn-primary m-2'>
										update
									</Link>
									<button
										className='btn btn-danger'
										onClick={() => {
											if (
												window.confirm(
													'Are you sure you need to delete this supplier? If yes, suppliers orders will be deleted too'
												)
											)
												deleteSupplier(supplier);
										}}>
										delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default SuppliersTable;
