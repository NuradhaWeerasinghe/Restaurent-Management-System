import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";
import './stylesDelivery.css'


const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class UpdateDeliveryStatus extends Component {


    constructor(props) {
        super(props);
        this.state = {
            drivers:[],
            orderNo: "",
            custName: "",
            total: Number,
            address: "",
            orderDate: new Date(),
            driverNo: "",
            status: "",
            formErrors: {
                driverNo: "",
                status: "",
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "driverNo":
                formErrors.driverNo =
                value.length < 1
                    ?"Please select the corect type"
                    : "";
                break;
            case "status":
                formErrors.status =
                    value.length < 1
                        ?"Please select the corect type"
                        : "";
                break;
                default:
                    break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!formValid(this.state.formErrors)) {
            console.error("FORM INVALID-DISPLAY ERROR");
        }
        const id = this.props.match.params.id;
        const { orderNo, custName, total, address, orderDate, driverNo, status } = this.state;
        const data = {
            orderNo: orderNo,
            custName: custName,
            total: total,
            address: address,
            orderDate: orderDate,
            driverNo: driverNo,
            status: status
        }

        //console.log(data)
        axios.put(`http://localhost:8000/delivery/update_delivery/${id}`, data).then((res) => {
            if (res.data.success) {
                toast.info("Delivery Update Successfully !");
                this.setState(
                    {
                        orderNo: "",
                        custName: "",
                        total: Number,
                        address: "",
                        orderDate: new Date(),
                        driverNo: "",
                        status: "",
                    }
                )
            }else{
                toast.error("You have an Error in updating");
            }
        });
    };

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

    componentDidMount() {
        this.retrieveDrivers();
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/delivery/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    orderNo: res.data.delivery.orderNo,
                    custName: res.data.delivery.custName,
                    total: res.data.delivery.total,
                    address: res.data.delivery.address,
                    orderDate: res.data.delivery.orderDate,
                    driverNo: res.data.delivery.driverNo,
                    status: res.data.delivery.status
                });
                console.log(this.state.delivery);
            }
        })
    }


    render() {
        const { formErrors } = this.state;
        return (
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                  <div className="col position-relative link">
                    <p><a href="ManageDelivery">Delivery Management</a> {'>'} <a href="/EditOrderStatus">Order status</a> {'>'} Update Delivery Status</p>
                  </div>
                </div>
                <div className="row">
                    <div className="col-1"><h3><i class="fas fa-truck"></i></h3></div>
                    <div className="col-8 position-relative">
                        <h2>Update Delivery Status</h2>
                        <ToastContainer/>
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>
                <div className="row">
                    <div className="col-5">
                        <img src="/images/fooddriver.png" alt="delivery vehicle" style={{ height: '350px', width: '550px', marginTop: '150px' }} />
                    </div>
                    <div className="col-7">
                        <div className="shadowBox">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="name">Order No : </label>
                                    <input type="text" readOnly className="form-control" id="orderNo" name="orderNo" style={{ backgroundColor: 'white'}} placeholder="Enter Order number" value={this.state.orderNo} onChange={this.handleInputChange} required />
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Customer Name : </label>
                                    <input type="text" readOnly className="form-control" id="custName" name="custName" style={{ backgroundColor: 'white'}} placeholder="Enter name" value={this.state.custName} onChange={this.handleInputChange} required />
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Total Amount : </label>
                                    <input type="number" readOnly className="form-control" id="total" name="total" style={{ backgroundColor: 'white'}} placeholder="Enter Total Amount" value={this.state.total} onChange={this.handleInputChange} required />
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Address : </label>
                                    <input type="text" readOnly className="form-control" id="address" name="address" style={{ backgroundColor: 'white'}} placeholder="Enter Address" value={this.state.address} onChange={this.handleInputChange} required />
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="owner">Order Date : </label>
									<input type="datetime-local" readOnly className="form-control" id="orderDate" name="orderDate" style={{ backgroundColor: 'white'}} value={this.state.orderDate} onChange={this.handleInputChange} required/>					  
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="driverNo"> Driver No : </label>
                                    <select id="driverNo" className="form-control" name="driverNo" onChange={this.handleInputChange} value={this.state.driverNo} required>
                                    <option selected>Select driver</option>  
                                    {this.state.drivers.map((drivers) => (
                                        <option value={drivers.driverNo}>{drivers.driverNo}</option>  
                                    ))}
                                    </select>
                                    {formErrors.driverNo.length < 1  &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.driverNo}</p>
										)} 
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="status"> Order Status : </label>
									<select id="status" className="form-control" name="status" onChange={this.handleInputChange} value={this.state.status} required>
                                        <option selected>Select Status</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Packing">Packing</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Delivered">Delivered</option>
									</select> 
                                    {formErrors.status.length < 1  &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.status}</p>
										)}
                                </div>
                                <div className="row">
                                    <div className="form-group btndriver col-12">
                                        <div class="d-grid  col-5 mx-auto">
                                            <button type="submit" className="btn btn-success" ><i className="fas fa-sync-alt"></i>&nbsp;Update</button>&nbsp;&nbsp;
                                            <a href="/EditOrderStatus" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;&nbsp;Cancel</a>
                                        </div>
                                    </div>
                                    <div className="col-6"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}