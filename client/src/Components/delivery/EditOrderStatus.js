import React, {Component} from 'react'
import axios from "axios";
import  './stylesDelivery.css';

export default class FetchAllDrivers extends Component{
    constructor(props){
        super(props);
        this.state={
            drivers:[]
        };
      }

      componentDidMount(){
        this.retrieveDrivers();
      }

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

      onDelete=(id)=>{
        axios.delete(`http://localhost:8000/driver/delete_driver/${id}`).then((res)=>{
          alert("Driver Deleted");
          this.retrieveDrivers();
        })
      }      


      filterData(drivers,searchKey){
        const result=drivers.filter((driver)=>
        driver.driverNo.toLowerCase().includes(searchKey)||
        driver.name.toLowerCase().includes(searchKey)||
        driver.nic.toLowerCase().includes(searchKey)
        )
        this.setState({drivers:result})
      }

     

      handleSearchArea=(e)=>{
        const searchKey=e.currentTarget.value;
        axios.get("http://localhost:8000/driver").then(res =>{
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
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Adress</th>
                                        <th scope="col">Order Date</th>
                                        <th scope="col">Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td><a href='' style={{textDecoration:'none'}}></a></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <a href='' type="button" class="btn btn-success">
                                                <i className="fas fa-edit"></i>&nbsp;Update
                                            </a>&nbsp;&nbsp;
                                        </td>
                                    </tr>                            
                                </tbody>                            
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}