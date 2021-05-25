import React, { Component } from 'react'
import axios from "axios";
import './stylesDelivery.css'


export default class OrderStatusView extends Component{
    constructor(props){
        super(props);
        this.state={
          delivery:[],
        };
    }
    


    shdowStatus(){

      let i = 0;
      
        if (i == 0) {
          i = 1;
          let elem = document.getElementById("myBar");
          let width = 1;
          let id = setInterval(frame, 10);
          function frame() {
            if (width > 75) {
              clearInterval(id);
              width--;
              i = 0;
            } else {
              width++;
              elem.style.width = width + "%";
            }
          }
        }

    };
    
    

    
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/delivery/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    delivery:res.data.delivery
                });
                console.log(this.state.delivery);
            }
        })
    }

    render(){
        const {orderNo,custName,total,address,orderDate,driverNo,status}=this.state.delivery;

        return(
          <div className="container containerTop">
          <div className="row">
            <h1 className="top"></h1>
          </div>
          <div className="row">
            <div className="col position-relative link">
              <p><a href="/MyOrders">My Order</a> {'>'} Order</p>
            </div>
          </div>
          <div className="row">
            <div className="col-9 position-relative">
              <h2>Order "{orderNo}"</h2>
            </div>
            <hr className="hr" style={{ height: '2px', color: '#0a90e8' }} />
          </div>
          <div className="shadowBox">
  
            <div className="row data">
              <div className="col-1"></div>              
              <div className="col-4">
                <h6>Order No : 	&nbsp;<i>{orderNo}</i></h6>
                <h6>Customer Name : &nbsp;<i>{custName}</i></h6>
                <h6>Address : &nbsp;<i>{address}</i></h6>
              </div>
              <div className="col-4"></div>
              <div className="col-3">
                <h6>Driver No : &nbsp;<i>{driverNo}</i></h6>
                <h6>Order Date : &nbsp;<i>{orderDate}</i></h6>
                <h6>Total : &nbsp;<i>{total}</i></h6>                              
              </div>
            </div>
            <div className="row small-box">
              <div className="col-12 ">
                <div id="myProgress" onMouseOver={this.shdowStatus}>
                  <div id="myBar"></div>
                  <div className="circles-container">
                    <div className="circle active">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="circle active">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="circle active">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="circle active">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="circle active">
                      <i className="fas fa-check"></i>
                    </div>
                  </div>
                </div>
                <div id="">
                  <div className="para-container">
                    <div className="content">
                      <h3><img className="icon" src="https://i.ibb.co/44xhb1Q/pending.png" style={{ width: '50px', height: '50px' }} /></h3>
                      <p>Pending</p>
                    </div>
                    <div className="content">
                      <h3><img className="icon" src="https://i.imgur.com/9nnc9Et.png" style={{ width: '50px', height: '50px' }} /></h3>
                      <p>Preparing</p>
                    </div>
                    <div className="content">
                      <h3><img className="icon" src="https://i.ibb.co/FbjFDY1/food-package.png" style={{ width: '50px', height: '50px' }} /></h3>
                      <p>Packing</p>
                    </div>
                    <div className="content">
                      <h3><img className="icon" src="https://i.imgur.com/TkPm63y.png" style={{ width: '50px', height: '50px' }} /></h3>
                      <p>In Transit</p>
                    </div>
                    <div className="content">
                      <h3><img className="icon" src="https://i.imgur.com/HdsziHP.png" style={{ width: '50px', height: '50px' }} /></h3>
                      <p>Delivered</p>
                    </div>
                  </div>
                </div>
                <br />        
              </div>
            </div>
          </div>
        </div>
        )
    }
}