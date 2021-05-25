import React, {Component} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import  './stylesDelivery.css';

export default class FetchAllVehicles extends Component{

    constructor(props){
        super(props);
        this.state={
            vehicles:[]
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
      
        const title = "Vehicle Details";
        const headers = [['Vehicle No','Model Name','Vehicle type','Owner', 'Registered Date' ]];        
        
        const data = this.state.vehicles.map(elt=> [elt.vehicleNo, elt.modelName,elt.type,elt.owner,elt.registerDate ]);
      
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Vehicle List.pdf")
      }
     
      
      componentDidMount(){
        this.retrieveVehicles();
      }
      //display all vehicle
      retrieveVehicles(){
        axios.get("http://localhost:8000/display_vehicle").then(res =>{
          if(res.data.success){
            this.setState({
              vehicles:res.data.existingVehicles
            });
            console.log(this.state.vehicles)
          }
        });
      }    

      //delte vehicle
      onDelete=(id)=>{
        axios.delete(`http://localhost:8000/vehicle/delete_vehicle/${id}`).then((res)=>{
        toast.warn("Vehicle Deleted");
        this.retrieveVehicles();
        })
      }      


        //search function
      filterData(vehicles,searchKey){
          const result=vehicles.filter((vehicle)=>
          vehicle.vehicleNo.toLowerCase().includes(searchKey)||
          vehicle.modelName.toLowerCase().includes(searchKey)||
          vehicle.type.toLowerCase().includes(searchKey)||
          vehicle.registerDate.toLowerCase().includes(searchKey)
          )
          this.setState({vehicles:result})
        }
        
        
        handleSearchArea=(e)=>{
          const searchKey=e.currentTarget.value.toLowerCase();
          axios.get("http://localhost:8000/display_vehicle").then(res =>{
            if(res.data.success){
              this.filterData(res.data.existingVehicles,searchKey)
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
                        <p><a href="ManageDelivery">Delivery Management</a> {'>'} Vehicle Details</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-9 position-relative">
                        <h2>Vehicle Details</h2>
                        <ToastContainer/>
                    </div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>                             
                <div className="shadowBox">
                    <div className="row">
                        <div className="col-4" />
                        <div className="col-4 search position-relative">
                            <i className="fa fa-search"></i> <input className="form-control" type="Search" placeholder="Search a vehicle" name="searchQuery" onChange={this.handleSearchArea} />
                        </div>
                        <div className="col-4" />
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Vehicle No</th>
                                        <th scope="col">Model Name</th>
                                        <th scope="col">Vehicle type</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Registered Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {this.state.vehicles.map((vehicles, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><a href={`/vehicle/${vehicles._id}`} style={{textDecoration:'none'}}>{vehicles.vehicleNo}</a></td>
                                        <td>{vehicles.modelName}</td>
                                        <td>{vehicles.type}</td>
                                        <td>{vehicles.owner}</td>
                                        <td>{vehicles.registerDate}</td>
                                        <td>
                                            <a href={`/update_vehicle/${vehicles._id}`} type="button" class="btn btn-success">
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </a>&nbsp;&nbsp;
                                            <a href="#" type="button" class="btn btn-danger" onClick={()=>this.onDelete(vehicles._id)}>
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
                            <a href="/add_vehicle" type="button" class="btn btn-lg" ><i class="fas fa-motorcycle"></i>&nbsp;&nbsp;Create New Vehicle</a><br/><br/>
                            <a onClick={()=>this.exportPDF()} to="#" className="btn report"><i class="fas fa-download"></i>&nbsp;&nbsp;Download Report</a>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    }
}