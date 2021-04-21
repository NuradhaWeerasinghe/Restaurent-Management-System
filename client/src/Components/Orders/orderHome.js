import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";


export default class orderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  retrieveOrders() {
    axios.get("http://localhost:8000/orders").then(res => {
      if (res.data.success) {
        this.setState({
          orders: res.data.existingOrders
        });
        console.log(this.state.orders)
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/order/delete/${id}`).then((res) => {
      alert("Order Deleted");
      this.retrieveOrders();
    })
  }

  filterData(orders, searchKey) {
    const result = orders.filter((order) =>

      order.deliveryMethod.toLowerCase().includes(searchKey) ||
      order.deliveryMethod.toUpperCase().includes(searchKey) ||
      order.paymentMethod.toLowerCase().includes(searchKey) ||
      order.paymentMethod.toUpperCase().includes(searchKey) ||
      order.orderId.toLowerCase().includes(searchKey) ||
      order.orderId.toUpperCase().includes(searchKey)

    )
    this.setState({ orders: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:8000/orders").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingOrders, searchKey)
      }
    });

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Orders</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

          </div>

        </div>

        <table className="table border shadow  table table-striped border ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order ID</th>
              <th scope="col">Total (LKR.)</th>
              <th scope="col">Delivery Method</th>
              <th scope="col">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((orders, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><a href={`/order/orders/${orders._id}`} style={{ textDecoration: 'none' }}>{orders.orderId}</a></td>
                <td>{orders.total}</td>
                <td>{orders.deliveryMethod}</td>
                <td>{orders.paymentMethod}</td>
                <td><Link className="btn btn-outline-primary" to={`/order/edit/${orders._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
          </Link>
          &nbsp;
          <Link className="btn btn-danger" href="#" onClick={() => this.onDelete(orders._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/order/add" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Create New Order</Link>

      </div>
    )
  }
};