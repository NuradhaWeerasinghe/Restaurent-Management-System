import React, { Component } from 'react';
import axios from 'axios';
import '../style.css';
import {toast} from 'react-toastify';

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};
export default class createOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: "",
            total: Number,
            phone: Number,
            name: "",
            address: "",
            status:"",
            deliveryMethod: "",
            paymentMethod: "",


            formErrors: {
                orderId: "",
                total: "",
                phone: "",
            }
        }
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;

        let formErrors = this.state.formErrors;
        switch (name) {
            case "orderId":
                formErrors.orderId =
                    value.length < 3
                        ? "Minimum charactors must be  more than 3"
                        : "";
                break;
            case "name":
                    formErrors.name =
                        value.length < 3
                            ? "Minimum charactors must be  more than 3"
                            : "";
                    break;
            case "phone":
                formErrors.phone =
                    value.length != 10
                        ? "Enter a valid phone number"
                        : "";
                break;

            case "total":
                formErrors.total =
                    value < 0
                        ? "Must be more than 0"
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

        const { orderId, total,phone, name, address, deliveryMethod, paymentMethod,status } = this.state;
        const data = {
            orderId: orderId,
            total: total,
            phone:phone,
            name:name,
            address:address,
            deliveryMethod: deliveryMethod,
            paymentMethod: paymentMethod,
            status:status,
        }
        //console.log(data)
        axios.post("http://localhost:8000/order/save", data).then((res) => {
            if (res.data.success) {
                toast(`New Order Created `, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
               
                this.setState(
                    {
                        orderId: "",
                        total: Number,
                        phone: Number,
                        name: "",
                        address: "",
                        deliveryMethod: "",
                        paymentMethod: "",
                        status:"Pending",
                    }
                )
            };
        });
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" alt ="order image" src="../images/order.png" />
                    </div>

                    <div className="col-6 shadowBox_order" >
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal">Create New Order</h1>
                        </center>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Order ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="orderId"
                                    placeholder="Enter Order ID"
                                    value={this.state.orderId}
                                    onChange={this.handleInputChange} required />
                                {formErrors.orderId.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.orderId}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Phone </label>
                                <input type="number"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter Phone number"
                                    value={this.state.phone}
                                    onChange={this.handleInputChange} required />
                                {formErrors.phone.length != 10 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.phone}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Total (LKR.)</label>
                                <input type="number"
                                    className="form-control"
                                    name="total"
                                    placeholder="Enter Total"
                                    value={this.state.total}
                                    onChange={this.handleInputChange} required />
                                {formErrors.total < 1 ||  (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.total}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter address"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} required />
                            </div>
                           
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Delivery Method</label>
                                <input type="text"
                                    className="form-control"
                                    name="deliveryMethod"
                                    placeholder="Enter Delivery Method"
                                    value={this.state.deliveryMethod}
                                    onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Payment Method </label>
                                <input type="text"

                                    className="form-control"
                                    name="paymentMethod"
                                    placeholder="Enter Payment Method"
                                    value={this.state.paymentMethod}
                                    onChange={this.handleInputChange} required />
                            </div>
                            <div class="form-group btnupdate col-12 ">
                                <button type="submit" className="btn btn-primary ordersub_btn" >Submit</button>&nbsp;&nbsp;
                                <a href="/order/" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>&nbsp;&nbsp;
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    };
};