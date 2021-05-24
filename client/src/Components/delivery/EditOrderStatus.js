import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import './stylesDelivery.css';


export default class FetchAllDeliveries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers:[],
      deliveries: []
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
    
      const title = "Delivery Status";
      const headers = [['Order No','Customer Name','Total Amount','Address', 'Order Date', 'Driver No', 'Status' ]];        
      
      const data = this.state.deliveries.map(elt=> [elt.orderNo, elt.custName,elt.total,elt.address,elt.orderDate,elt.driverNo,elt.status ]);
    
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("Delivery Progress List.pdf")
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
            <p><a href="ManageDelivery">Delivery Management</a> {'>'} Order status</p>
          </div>
        </div>
        <div className="row">
          <div className="col-9 position-relative">
            <h2>Order Status</h2>
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
                    <th>Action</th>
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
                    <td>
                      <a href={`/update_delivery/${deliveries._id}`} type="button" class="btn btn-success">
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>&nbsp;&nbsp;
                    </td>
                  </tr>
                </tbody>
                ))}
              </table>
            </div>
          </div>
          <div className="row" style={{marginTop:'50px'}}>
            <div className="col-4"></div>
            <div className="col-4 addv d-flex justify-content-center">
                <Link onClick={()=>this.exportPDF()} to="#" className="btn btn-success"><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</Link>
            </div>                  
            <div className="col-4"></div>
          </div>
        </div>
      </div>
    )
  }
}