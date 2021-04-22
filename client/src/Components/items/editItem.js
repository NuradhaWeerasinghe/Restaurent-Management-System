import React, { Component } from 'react';
import axios from 'axios';

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class editItem extends Component {

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
        };
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
        const id = this.props.match.params.id;
        const { itemId, name, price, description, category } = this.state;
        const data = {
            itemId: itemId,
            name: name,
            price: price,
            description: description,
            category: category
        }
        //console.log(data)
        axios.put(`http://localhost:8000/item/update/${id}`, data).then((res) => {
            if (res.data.success) {
                alert("Successfully update Item")
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

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/item/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    itemId: res.data.item.itemId,
                    name: res.data.item.name,
                    price: res.data.item.price,
                    description: res.data.item.description,
                    category: res.data.item.category,

                });
                console.log(this.state.item);
            }
        })
    }
    render() {
        const { formErrors } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" alt ="item image" src="/images/updateitem.png" />
                    </div>

                    <div className="col-6 shadowBox_order" >
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal">Update item</h1>
                        </center>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Item Id</label>
                                <input type="text"
                                    className="form-control"
                                    name="itemId"
                                    placeholder="Enter Item Id"
                                    value={this.state.itemId}
                                    onChange={this.handleInputChange} />
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
                                    onChange={this.handleInputChange} />
                                {formErrors.name.length < 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Price</label>
                                <input type="number"
                                    className="form-control"
                                    name="price"
                                    placeholder="Enter the Price"
                                    value={this.state.price}
                                    onChange={this.handleInputChange} />
                                {formErrors.price < 1 || (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.price}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Description </label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange} />
                                {formErrors.description.length < 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.description}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}> Category</label>
                                <input type="text"
                                    className="form-control"
                                    name="category"
                                    placeholder="Enter Category"
                                    value={this.state.category}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="row">
                                <div className="form-group btnupdate col-12 btnUpdate" style={{ marginTop: '15px' }}>
                                    <div className="form-group col" style={{ marginTop: '15px' }}>
                                        <button type="submit" className="btn btn-success " ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
                                            <a href="/item/" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>&nbsp;&nbsp;
                                        </div>

                                </div>
                                <div className="col-6"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}