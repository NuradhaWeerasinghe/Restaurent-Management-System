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

export default class UpdateDriver extends Component {


    constructor(props) {
        super(props);
        this.state = {
            driverNo: "",
            name: "",
            licenceNo: "",
            nic: "",
            mobile: Number,
            address: "",
            formErrors: {
                name: "",
                licenceNo: "",
                nic: "",
                mobile: 0
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 5 || value.length > 30
                        ? "Name must have charchter between 5 to 30"
                        : "";
                break;
            case "licenceNo":
                formErrors.licenceNo =
                    value.length < 8 || value.length > 8
                        ? "licence must have 8 charactors"
                        : "";
                break;
            case "nic":
                formErrors.nic =
                    value.length < 10 || value.length > 12
                        ? "NIC must have charactor length 10 or 12"
                        : "";
                break;
            case "mobile":
                formErrors.mobile =
                    value.length > 10 || value.length < 10
                        ? "Mobile Number must have 10 digit"
                        : 0;
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
        const { driverNo, name, licenceNo, nic, mobile, address } = this.state;
        const data = {
            driverNo: driverNo,
            name: name,
            licenceNo: licenceNo,
            nic: nic,
            mobile: mobile,
            address: address
        }

        //console.log(data)
        axios.put(`http://localhost:8000/driver/update_driver/${id}`, data).then((res) => {
            if (res.data.success) {
                toast.info("Driver Update Successfully !");
                this.setState(
                    {
                        driverNo: "",
                        name: "",
                        licenceNo: "",
                        nic: "",
                        mobile: Number,
                        address: "",
                    }
                )
            }else{
                toast.error("You have an Error in updating");
            }
        });
    };


    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/driver/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    driverNo: res.data.driver.driverNo,
                    name: res.data.driver.name,
                    licenceNo: res.data.driver.licenceNo,
                    nic: res.data.driver.nic,
                    mobile: res.data.driver.mobile,
                    address: res.data.driver.address
                });
                console.log(this.state.driver);
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
                    <div className="col-1"><h3><i class="fas fa-user-plus"></i></h3></div>
                    <div className="col-8 position-relative">
                        <h2>Update Driver</h2>
                        <ToastContainer/>
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>
                <div className="row">
                    <div className="col-4">
                        <img src="/images/driver2.png" alt="delivery vehicle" style={{ height: '250px', width: '250px', marginTop: '100px' }} />
                    </div>
                    <div className="col-8">
                        <div className="shadowBox">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="name">Driver No : </label>
                                    <input type="text" readOnly className="form-control" id="dNo" name="driverNo" placeholder="Enter driver number" value={this.state.driverNo} onChange={this.handleInputChange} required />
                                    <p></p>
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Name : </label>
                                    <input type="text" className="form-control" id="dName" name="name" placeholder="Enter name" value={this.state.name} onChange={this.handleInputChange} required />
                                    {formErrors.name.length > 5 && (
                                        <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                                    )}
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Licence Number : </label>
                                    <input type="text" className="form-control" id="lNo" name="licenceNo" placeholder="Enter licence number" value={this.state.licenceNo} onChange={this.handleInputChange} required />
                                    {formErrors.licenceNo.length > 8 && (
                                        <span style={{ color: 'red' }} className="errorMessage">{formErrors.licenceNo}</span>
                                    )}
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">N.I.C Number : </label>
                                    <input type="text" className="form-control" id="nic" name="nic" placeholder="Enter NIC number" value={this.state.nic} onChange={this.handleInputChange} required />
                                    {formErrors.nic.length < 10 || formErrors.nic.length > 11 && (
                                        <span style={{ color: 'red' }} className="errorMessage">{formErrors.nic}</span>
                                    )}
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Mobile Number : </label>
                                    <input type="number" className="form-control" id="mobile" name="mobile" placeholder="Enter mobile number" value={this.state.mobile} onChange={this.handleInputChange} required />
                                    {formErrors.mobile.length > 10 &&  (
                                        <span style={{ color: 'red' }} className="errorMessage">{formErrors.mobile}</span>
                                    )}
                                </div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="age">Address : </label>
                                    <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={this.state.address} onChange={this.handleInputChange} required />
                                </div>
                                <div className="row">
                                    <div className="form-group btndriver col-12">
                                        <div class="d-grid  col-5 mx-auto">
                                            <button type="submit" className="btn btn-success" ><i className="fas fa-sync-alt"></i>&nbsp;Update</button>&nbsp;&nbsp;
                                            <a href="/display_driver" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;&nbsp;Cancel</a>
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