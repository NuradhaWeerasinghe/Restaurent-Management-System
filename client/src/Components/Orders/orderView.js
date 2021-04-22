import React, { Component } from 'react';
import axios from 'axios';
export default class orderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {}
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/order/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    order: res.data.order
                });
                console.log(this.state.order);
            }
        })
    }
    render() {
        const {orderId, total, deliverymethod, paymentMethod } = this.state.item;
        return (


            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="order_img" alt="order image" src="../images/order.png" />
                    </div>

                    <div className="col-6 shadowBox_order" >
                        <center>
                            <h4>Order id :{orderId}</h4>
                        </center>
                        <hr />
                        <dl className="row">

                            <dt className="col-sm-3">Total (LKR.)</dt>
                            <dd className="col-sm-9">{total}</dd>

                            <dt className="col-sm-3">Delivery Method</dt>
                            <dd className="col-sm-9">{deliverymethod}</dd>

                            <dt className="col-sm-3"> Payment Method</dt>
                            <dd className="col-sm-9">{paymentMethod}</dd>
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