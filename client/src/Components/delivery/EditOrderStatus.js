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
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
              <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </symbol>
              <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
              </symbol>
              <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </symbol>
            </svg>
            <div class="alert alert-warning d-flex alert-dismissible fade show align-items-center" role="alert">
              <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use href="#exclamation-triangle-fill"/></svg>
              <div>
                <strong>New Order added!</strong> &nbsp;&nbsp;&nbsp;Waiting for an action.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
          </div>          
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