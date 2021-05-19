import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SupplierOrderTable = ({ supplierOrders, deleted, setDeleted }) => {
	const deleteOrder = async (order) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BACKEND_URL}/api/supplierorder/delete`,
				{
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						id: order.supplierOrderId
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
						<th scope='col'>Order ID</th>
						<th scope='col'>Supplier ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Supply Item</th>
						<th scope='col'>QTY</th>
						<th scope='col'>Unit price (LKR)</th>
						<th scope='col'>Total price (LKR)</th>
						<th scope='col'>Date</th>
						<th scope='col'>Manage</th>
					</tr>
				</thead>
				<tbody>
					{supplierOrders.map((order, index) => {
						return (
							<tr key={index}>
								<th scope='row'>{index + 1}</th>
								<td>{order.supplierOrderId}</td>
								<td>{order.supplierId.supplierId}</td>
								<td>{order.supplierId.supplierName}</td>
								<td>{order.supplyItem}</td>
								<td>{order.qty}</td>
								<td>{order.unitPrice}</td>
								<td>{order.unitPrice * order.qty}</td>
								<td>{order.date.substring(0,10)}</td>
								<td>
									<Link
										to={`/update-supplier-order/${order.supplierOrderId}`}
										className='btn btn-primary m-2'>
										update
									</Link>
									<button
										className='btn btn-danger'
										onClick={() => {
											if (
												window.confirm(
													'Are you sure you need to delete this order?'
												)
											)
												deleteOrder(order);
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

export default SupplierOrderTable;
