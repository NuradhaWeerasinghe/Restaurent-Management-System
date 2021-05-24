import React, { Component } from 'react'
import axios from "axios";
import './stylesDelivery.css';


export default class FetchAllDeliveries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveries: []
    };
  }
  
    
  componentDidMount(){
    this.retrieveDeliveries();
  }


//http://localhost:8000/display_delivery
  retrieveDeliveries() {
    axios.get("http://localhost:8000/display_delivery").then(res => {
      if (res.data.success) {
        this.setState({
          deliveries:res.data.existingDeliveries,          
        });
        console.log(this.state.deliveries)
      }
    });
  }


 //Search a driver function
  filterData(deliveries, searchKey) {
    const result = deliveries.filter((delivery) =>   
      delivery.orderNo.toLowerCase().includes(searchKey) ||
      delivery.custName.toLowerCase().includes(searchKey)      
    )
    this.setState({ deliveries: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("http://localhost:8000/display_delivery").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingDeliveries, searchKey)
      }
    });
  } 

  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <h1 className="top"></h1>
        </div>
        <div className="row">
          <div className="col position-relative link">
            <p><a href="/">Home</a> {'>'} MyOrder </p>
          </div>
        </div>
        <div className="row">
          <div className="col-9 position-relative">
            <h2>My Order</h2>
          </div>
          <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
        </div>
        <div className="shadowBox">
          <div className="row">
            <div className="col-4" />
            <div className="col-4 search position-relative">
              <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search order no" name="searchQuery" onChange={this.handleSearchArea} />
            </div>
            <div className="col-4" />
          </div>
          <div className="row">
            <div className="col-12 ">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order No</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Address</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Driver No</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                {this.state.deliveries.map((deliveries, index) => (
                <tbody>
                  <tr>
                  <th scope="row">{index+1}</th>
                    <td><a href={`/delivery/${deliveries._id}`} style={{ textDecoration: 'none' }}>{deliveries.orderNo}</a></td>
                    <td>{deliveries.custName}</td>
                    <td>{deliveries.total}</td>
                    <td>{deliveries.address}</td>
                    <td>{deliveries.orderDate}</td>
                    <td>{deliveries.driverNo}</td>                    
                    <td>{deliveries.status}</td>
                  </tr>
                </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}