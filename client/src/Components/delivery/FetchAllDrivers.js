import React, {Component} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import  './stylesDelivery.css';

export default class FetchAllDrivers extends Component{
    constructor(props){
        super(props);
        this.state={
            drivers:[]
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
  
    const title = "Driver Details";
    const headers = [['Driver No','Name','Licence No','NIC', 'Mobile', 'Address' ]];
  
    const data = this.state.drivers.map(elt=> [elt.driverNo, elt.name,elt.licenceNo,elt.nic,elt.mobile,elt.address ]);
  
    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Driver List.pdf")
  }
      componentDidMount(){
        this.retrieveDrivers();
      }
      //display driver function
      retrieveDrivers(){
        axios.get("http://localhost:8000/display_driver").then(res =>{
          if(res.data.success){
            this.setState({
              drivers:res.data.existingDrivers
            });
            console.log(this.state.drivers)
          }
        });
      }    
      //delete driver function
      onDelete=(id)=>{
        axios.delete(`http://localhost:8000/driver/delete_driver/${id}`).then((res)=>{
          toast.warn("Driver Deleted");
          this.retrieveDrivers();
        })
      }      

      //Search a driver function
      filterData(drivers,searchKey){
        const result=drivers.filter((driver)=>
        driver.driverNo.toLowerCase().includes(searchKey)||
        driver.name.toLowerCase().includes(searchKey)||
        driver.nic.toLowerCase().includes(searchKey)
        )
        this.setState({drivers:result})
      }

     

      handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value.toLowerCase();
        axios.get("http://localhost:8000/display_driver").then(res =>{
          if(res.data.success){
            this.filterData(res.data.existingDrivers,searchKey)
          }
        });
      
      }

      render(){
        return (
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                  <div className="col position-relative link">
                    <p><a href="ManageDelivery">Delivery Management</a> {'>'} Drivers Details</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9 position-relative">
                    <h2>Drivers Details</h2>
                    <ToastContainer/>
                  </div>
                  <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>                               
                <div className="shadowBox">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4 search position-relative">
                    <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search a driver" name="searchQuery" onChange={this.handleSearchArea} />
                  </div>
                  <div className="col-4"></div>
                </div>
                    <div className="row">
                        <div className="col-12 ">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Driver No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Licence No</th>
                                        <th scope="col">NIC</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.state.drivers.map((drivers, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><a href={`/driver/${drivers._id}`} style={{textDecoration:'none'}}>{drivers.driverNo}</a></td>
                                        <td>{drivers.name}</td>
                                        <td>{drivers.licenceNo}</td>
                                        <td>{drivers.nic}</td>
                                        <td>{drivers.mobile}</td>
                                        <td>{drivers.address}</td>
                                        <td>
                                            <a href={`/update_driver/${drivers._id}`} type="button" class="btn btn-success">
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </a>&nbsp;&nbsp;
                                            <a href="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(drivers._id)}>
                                            <i className="far fa-trash-alt"></i>&nbsp;Delete                                        
                                            </a> 
                                        </td>
                                    </tr>                            
                                </tbody>                            
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3 addv">
                            <a href="/add_driver" type="button" class="btn btn-lg" ><i class="fas fa-user-plus"></i>&nbsp;&nbsp;Create New Driver</a><br/><br/>
                            <a onClick={()=>this.exportPDF()} to="#" className="btn report"><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</a>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    }
}