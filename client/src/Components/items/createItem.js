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


export default class createItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId: "",
            name: "",
            price: Number,
            description: "",
            category: "",

            formErrors: {
                itemId: "",
                price: 0,
                name: "",
                description: "",
            }
        }
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;

        let formErrors = this.state.formErrors;
        switch (name) {
            case "itemId":
                formErrors.itemId =
                    value.length < 3
                        ? "Minimum charactors must be  more than 3"
                        : "";
                break;

            case "price":
                formErrors.price =
                    value < 0
                        ? "Must be more than 0"
                        : "";
                break;

            case "name":
                formErrors.name =
                    value.length < 5
                        ? "Must contain Atleast 5 characters "
                        : "";
                break;

            case "description":
                formErrors.description =
                    value.length < 5
                        ? "Must contain Atleast 5 characters "
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

        const { itemId, name, price, description, category } = this.state;
        const data = {
            itemId: itemId,
            name: name,
            price: price,
            description: description,
            category: category,
        }
        //console.log(data)
        axios.post("http://localhost:8000/item/save", data).then((res) => {
            if (res.data.success) {
                toast(`New Item Created `, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        itemId: "",
                        name: "",
                        price: Number,
                        description: "",
                        category: "",
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
                        <img className="item_img" alt="item image" src="../images/item.png" />
                    </div>
                    <div className="col-6 shadowBox_item" >
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal heading"
                            >Create New Item</h1>
                        </center>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Item ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="itemId"
                                    placeholder="Enter Item ID"
                                    value={this.state.itemId}
                                    onChange={this.handleInputChange} required />
                                {formErrors.itemId.length > 3 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.itemId}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Item name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} required />
                                {formErrors.name.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                                )}

                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Price (LKR.)</label>
                                <input type="number"
                                    className="form-control"
                                    name="price"
                                    placeholder="Enter the Price"
                                    value={this.state.price}
                                    onChange={this.handleInputChange} required />
                                {formErrors.price < 1 || (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.price}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Description</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter the description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange} required />
                                {formErrors.description.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.description}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Category </label>
                                <input type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Enter Category"
                                    value={this.state.category}
                                    onChange={this.handleInputChange} required />
                            </div>

                            <div class="form-group btnupdate col-12">
                                <button type="submit" className="btn btn-primary itemsub_btn" >Create</button>&nbsp;&nbsp;
                                <a href="/item/" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>&nbsp;&nbsp;
                                </div>

                        </form>
                    </div>
                </div>
            </div>

        );
    };
};