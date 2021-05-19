import React, {Component} from 'react'
import './stylesDelivery.css'
import  './dstyles.css';


export default class OrderStatusView extends Component{
    constructor(props){
        super(props);
        this.state={
        };
      }
      


      render(){
        return (
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                  <div className="col position-relative link">
                    <p><a href="ManageDelivery">Order</a> {'>'} Order Status</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-9 position-relative">
                    <h2>Order Status</h2>
                  </div>
                  <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
                </div>                               
                <div className="shadowBox">
                    <div className="row">
                        <div className="col-12 ">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}