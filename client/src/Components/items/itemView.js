import React, { Component } from 'react';
import axios from 'axios';
export default class itemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {}
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/item/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    item: res.data.item
                });
                console.log(this.state.item);
            }
        })
    }
    render() {
        const { itemId, name, price, description, category } = this.state.item;
        return (


            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" alt="item image" src="../images/item.png" />
                    </div>

                    <div className="col-6 shadowBox_order" >
                        <center>
                            <h4>Item id :{itemId}</h4>
                        </center>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-3"> Name</dt>
                            <dd className="col-sm-9">{name}</dd>

                            <dt className="col-sm-3">Price (LKR.)</dt>
                            <dd className="col-sm-9">{price}</dd>

                            <dt className="col-sm-3">Description</dt>
                            <dd className="col-sm-9">{description}</dd>

                            <dt className="col-sm-3"> Category</dt>
                            <dd className="col-sm-9">{category}</dd>
                        </dl>
                        <div className="row">
                            <div className="form-group btnupdate col-12 btnUpdate" style={{ marginTop: '15px' }}>
                                <div className="form-group col" style={{ marginTop: '15px' }}>

                                    <a href="/item/" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>&nbsp;&nbsp;
                                        </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}