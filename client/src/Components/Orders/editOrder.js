import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class editOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            total: Number,
            phone: Number,
            name: "",
            address: "",
            deliveryMethod: "",
            paymentMethod: "",
            status:"",

            formErrors: {
                _id: "",
                total: Number,
                phone: Number,
            }
        }
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;

        let formErrors = this.state.formErrors;
        switch (name) {
            case "orderId":
                formErrors._id =
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

        const id = this.props.match.params.id;
        const { _id, total,phone, name, address, deliveryMethod, paymentMethod,status } = this.state;
        const data = {
            _id: _id,
            total: total,
            phone:phone,
            name:name,
            address:address,
            deliveryMethod: deliveryMethod,
            paymentMethod: paymentMethod,
            status:status,
        }
        //console.log(data)
        axios.put(`http://localhost:8000/order/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast(`Successfully update Order `, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        _id: "",
                        total: Number,
                        phone: Number,
                        name: "",
                        address: "",
                        deliveryMethod: "",
                        paymentMethod: "",
                        status:"",
                    }
                )
            };
        });
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/order/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    _id: res.data.order._id,
                    total: res.data.order.total,
                    phone: res.data.order.phone,
                    deliveryMethod: res.data.order.deliveryMethod,
                    paymentMethod: res.data.order.paymentMethod,
                    address: res.data.order.address,
                    name: res.data.order.name,
                    status:res.data.order.status,

                });
                console.log(this.state.order);
            }
        })
    }
    render() {
        const { formErrors } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" alt ="order image"  src="/images/updateitem.png" />
                    </div>

                    <div className="col-6 shadowBox_order" >
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal">Update Order Details</h1>
                        </center>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Order Id</label>
                                <input type="text"
                                    className="form-control"
                                    name="_id"
                                    disabled
                                    placeholder="Enter Order Id"
                                    value={this.state._id}
                                    onChange={this.handleInputChange} />
                                {formErrors._id.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.orderId}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    disabled
                                    placeholder="Enter name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Phone </label>
                                <input type="number"
                                    className="form-control"
                                    name="phone"
                                    disabled
                                    placeholder="Enter Phone number"
                                    value={this.state.phone}
                                    onChange={this.handleInputChange} required />
                                {formErrors.phone.length != 10 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.phone}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Total</label>
                                <input type="number"
                                    className="form-control"
                                    name="total"
                                    disabled
                                    placeholder="Enter the Total"
                                    value={this.state.total}
                                    onChange={this.handleInputChange} />
                                {formErrors.total < 1|| (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.total}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    disabled
                                    placeholder="Enter address"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Delivery Method</label>
                                <input type="text"
                                    className="form-control"
                                    name="deliveryMethod"
                                    disabled
                                    placeholder="Enter Delivery Method"
                                    value={this.state.deliveryMethod}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Payment Method</label>
                                <input type="text"
                                    className="form-control"
                                    name="paymentMethod"
                                    placeholder="Enter Amount"
                                    disabled
                                    value={this.state.paymentMethod}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Status</label>
                                <select type="text"
                                    className="form-control"
                                    name="status"
                                    placeholder="Enter Amount"
                                    
                                    value={this.state.status}
                                    onChange={this.handleInputChange} >
                                        <option selected></option>
                                        <option values="Pending">Pending</option>
                                        <option values="Accepted">Accepted</option>
                                        <option values="Completed">Completed</option>
                                        <option values="Cancelled">Cancelled</option>
                                        </select>
                            </div>
                            

                            <div class="form-group btnupdate col-12">
                                <button type="submit" className="btn btn-primary ordersub_btn" >Update</button>&nbsp;&nbsp;
                    <a href="/order/" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>&nbsp;&nbsp;
                    </div>


                        </form>
                    </div>
                </div>
            </div>
        )
    }
}