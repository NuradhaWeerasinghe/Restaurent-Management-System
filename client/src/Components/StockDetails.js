import React, { Component } from 'react'
import axios from 'axios';

export default class StockDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });

                console.log(this.state.post);
            }
        });
    }
    
    render() {
        const {stockId,stockType,brand,category,amount,rcvQuan,remQuan,rcvDate,expDate,location,supId,sOrderId} = this.state.post;
      return (
        <div style={{marginTop:'20px'}}>
            <h4>{stockType}</h4>
            <hr/>

            <dl className="row">
                <dt className="col-sm-3">Stock ID</dt>
                <dd className="col-sm-9">{stockId}</dd>

                <dt className="col-sm-3">Brand</dt>
                <dd className="col-sm-9">{brand}</dd>

                <dt className="col-sm-3">Category</dt>
                <dd className="col-sm-9">{category}</dd>

                <dt className="col-sm-3">Amount (LKR)</dt>
                <dd className="col-sm-9">{amount}</dd>

                <dt className="col-sm-3">Recieved Quantity (kg/l)</dt>
                <dd className="col-sm-9">{rcvQuan}</dd>

                <dt className="col-sm-3">Remaining Quantity (kg/l)</dt>
                <dd className="col-sm-9">{remQuan}</dd>

                <dt className="col-sm-3">Recieved Date</dt>
                <dd className="col-sm-9">{rcvDate}</dd>

                <dt className="col-sm-3">Expiary Date</dt>
                <dd className="col-sm-9">{expDate}</dd>

                <dt className="col-sm-3">Location</dt>
                <dd className="col-sm-9">{location}</dd>

                <dt className="col-sm-3">Supplier ID</dt>
                <dd className="col-sm-9">{supId}</dd>

                <dt className="col-sm-3">Supplier Order ID</dt>
                <dd className="col-sm-9">{sOrderId}</dd>
            </dl>
           
        </div>
        
      )
    }
}