import React, { Component } from 'react'
import axios from 'axios';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';


export default class orderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  // Creating report 
  exportPDF = () => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = "Orders";
    const headers = [['Order Id','Name', 'Phone','Total','address','deliveryMethod','paymentMethod','Status' ]];
  
    const data = this.state.orders.map(elt=> [elt.orderId, elt.name,elt.phone,elt.total,elt.address,elt.deliveryMethod,elt.paymentMethod,elt.status ]);
  
    let content = {
      startY: 50,
      head: headers,
      body: data
    };
  
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Order List.pdf")
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
      toast(`Order Deleted `, {
        type: toast.TYPE.SUCCESS,
        autoClose: 4000
    });  
    
      this.retrieveOrders();
    })
  }

  filterData(orders, searchKey) {
    const result = orders.filter((order) =>

      order.deliveryMethod.toLowerCase().includes(searchKey) ||
      order.deliveryMethod.toUpperCase().includes(searchKey) ||
      order.name.toLowerCase().includes(searchKey) ||
      order.name.toUpperCase().includes(searchKey) ||
      order.address.toLowerCase().includes(searchKey) ||
      order.address.toUpperCase().includes(searchKey) ||
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
          <div>
              <div className="filter-size">
                  Filter{" "}  
                  <select value={this.props.size} onChange={this.props.filterProducts}>
                    <option value="">All</option>
                    <option value="Starters">Pending</option>
                    <option value="Mains">Accepted</option>
                    <option value="Deserts">Completed</option>
                    <option value="Beverages">Cancelled</option>
                </select></div>
          <div className="col-lg-3 mt-2 mb-2" style={{float:'right'}}>
            <input
              className="form-control"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

          </div></div>

        </div>

        <table className="table border shadow  table table-striped border ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Order ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Total (LKR.)</th>
              <th scope="col">Address</th>
              <th scope="col">Delivery Method</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((orders, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><a href={`/order/orders/${orders._id}`} style={{ textDecoration: 'none' }}>{orders.orderId}</a></td>
                <td>{orders.name}</td>
                <td>{orders.phone}</td>
                <td>{orders.total}</td>
                <td>{orders.address}</td>
                <td>{orders.deliveryMethod}</td>
                <td>{orders.paymentMethod}</td>
                <td>{orders.status}</td>
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
        <Link to="/order/add" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Create New Order</Link>&nbsp;&nbsp;
        <Link onClick={()=>this.exportPDF()} to="#" className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
      </div>
    )
  }
};