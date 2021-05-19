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
        const {stockId,stockType,brand,category,amount,rcvQuan,remQuan,rcvDate,expDate,location,supId,sOrderId,imgLink} = this.state.post;
      return (
        <div className="shadowBox">
        <div style={{marginTop:'20px'}}>
            <h2>{stockType}</h2>
            <hr/>

            <div class="row">
           <div  className="col-md-6">
           <img src={imgLink} style={{ width:"500px"}}/>
           </div>


           <div  className="col-md-6">
            <dl className="row">
                
                <dt className="col-sm-5">Stock ID</dt>
                <dd className="col-sm-5">{stockId}</dd>

                <dt className="col-sm-5">Brand</dt>
                <dd className="col-sm-5">{brand}</dd>

                <dt className="col-sm-5">Category</dt>
                <dd className="col-sm-5">{category}</dd>

                <dt className="col-sm-5">Amount (LKR)</dt>
                <dd className="col-sm-5">{amount}</dd>

                <dt className="col-sm-5">Recieved Quantity (kg/l)</dt>
                <dd className="col-sm-5">{rcvQuan}</dd>

                <dt className="col-sm-5">Remaining Quantity (kg/l)</dt>
                <dd className="col-sm-5">{remQuan}</dd>

                <dt className="col-sm-5">Recieved Date</dt>
                <dd className="col-sm-5">{rcvDate}</dd>

                <dt className="col-sm-5">Expiary Date</dt>
                <dd className="col-sm-5">{expDate}</dd>

                <dt className="col-sm-5">Location</dt>
                <dd className="col-sm-5">{location}</dd>

                <dt className="col-sm-5">Supplier ID</dt>
                <dd className="col-sm-5">{supId}</dd>

                <dt className="col-sm-5">Supplier Order ID</dt>
                <dd className="col-sm-5">{sOrderId}</dd>
            </dl>
            </div>
            </div>
        </div>
        </div>
        
      )
    }
}