import React, { Component } from 'react'
import axios from 'axios'

const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class EditStock extends Component {
    
    constructor(props){
        super(props);
        this.state={
            stockId:"",
            stockType:"",
            brand:"",
            amount:Number,
            rcvQuan:Number,
            remQuan:Number,
            expDate:"",
            category:"",
            location:"",
            supId:"",
            sOrderId:"",

            formErrors:{
                stockId:"",
                supId:"",
                sOrderId:""
                
            } 
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        let formErrors = this.state.formErrors;
        switch(name){
            case "stockId":
            formErrors.stockId=
            value.length < 4
            ?"Minimum character must be 4"
            :"";
            break;

            case "supId":
            formErrors.supId=
            value.length < 4
            ?"Minimum character must be 4"
            :"";
            break;

            case "sOrderId":
            formErrors.sOrderId=
            value.length < 5
            ?"Minimum character must be 5"
            :"";
            break;
            default:
            break;
        }
        this.setState({formErrors,[name]: value},()=> console.log(this.state));

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const id = this.props.match.params.id;

        if(!formValid(this.state.formErrors)){
            console.error("FORM INVALID-DISPLAY ERROR");
        }

        const {stockId,stockType,brand,amount,rcvQuan,remQuan,rcvDate,expDate,category,location,supId,sOrderId} = this.state;

        const data={
            stockId:stockId,
            stockType:stockType,
            brand:brand,
            category:category,
            amount:amount,
            rcvQuan:rcvQuan,
            remQuan:remQuan,
            rcvDate:rcvDate,
            expDate:expDate,
            location:location,
            supId:supId,
            sOrderId:sOrderId
        }

        console.log(data)

        axios.put(`/post/update/${id}`,data).then((res) => {
            if(res.data.success){
                alert("Stock updated successfuly")
                this.setState(
                    {
                        stockId:stockId,
                        stockType:stockType,
                        brand:brand,
                        category:category,
                        amount:amount,
                        rcvQuan:rcvQuan,
                        remQuan:remQuan,
                        rcvDate:rcvDate,
                        expDate:expDate,
                        location:location,
                        supId:supId,
                        sOrderId:sOrderId
                    }
                )
            }
        })
        window.location = '/'
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    stockId:res.data.post.stockId,
                    stockType:res.data.post.stockType,
                    brand:res.data.post.brand,
                    category:res.data.post.category,
                    amount:res.data.post.amount,
                    rcvQuan:res.data.post.rcvQuan,
                    remQuan:res.data.post.remQuan,
                    rcvDate:res.data.post.rcvDate.substring(0,10),
                    expDate:res.data.post.expDate.substring(0,10),
                    location:res.data.post.location,
                    supId:res.data.post.supId,
                    sOrderId:res.data.post.sOrderId,
                });

                console.log(res.data.post);
            }
        });
    }

    render() {
        const {formErrors}= this.state;

        return (
            <div class="row">
            <div  className="col-md-6">
            <img src="/Images/inventory2.png"  alt="inventory" style={{height:'600px' , width:'600px', marginTop:'100px'}}/>
            </div>

            <div  className="col-md-6">
            <div className="shadowBox">

              <h6 className="h3 mb-3 font-weight-normal">Edit stock details</h6>
              <from className="needs-validation" noValidate>
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Stock ID:</label>
                      <input type="text" required
                      className="form-control"
                      name="stockId"
                      placeholder="Enter Stock ID"
                      value={this.state.stockId}
                      onChange={this.handleInputChange}/>

                      {formErrors.stockId.length > 4  &&(
                        <span style={{color:'red'}} className="errorMessage">{formErrors.stockId}</span>
                    )}
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Stock Type:</label>
                      <input type="text" required
                      className="form-control"
                      name="stockType"
                      placeholder="Enter Stock Type"
                      value={this.state.stockType}
                      onChange={this.handleInputChange}/>
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Brand:</label>
                      <input type="text" required
                      className="form-control"
                      name="brand"
                      placeholder="Enter Brand"
                      value={this.state.brand}
                      onChange={this.handleInputChange}/>
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Category:</label>
                      <input type="text" required
                      className="form-control"
                      name="category"
                      placeholder="Enter Category"
                      value={this.state.category}
                      onChange={this.handleInputChange}/>
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Amount:</label>
                      <input type="number" required
                      className="form-control"
                      name="amount"
                      placeholder="Enter Amount (LKR)"
                      value={this.state.amount}
                      onChange={this.handleInputChange}/>
                  </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Received Quantity:</label>
                      <input type="number" required
                      className="form-control"
                      name="rcvQuan"
                      placeholder="Enter Receieved Quantity (kg/l)"
                      value={this.state.rcvQuan}
                      onChange={this.handleInputChange}/>
                  </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Remaining Quantity:</label>
                      <input type="number" required
                      className="form-control"
                      name="remQuan"
                      placeholder="Enter Remaining Quantity (kg/l)"
                      value={this.state.remQuan}
                      onChange={this.handleInputChange}/>
                  </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Received Date:</label>
                      <input type="date" required
                      className="form-control"
                      name="rcvDate"
                      placeholder="Enter Receieved Date"
                      value={this.state.rcvDate}
                      onChange={this.handleInputChange}/>
                  </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Expiary Date:</label>
                      <input type="date" required
                      className="form-control"
                      name="expDate"
                      placeholder="Enter Expiary Date"
                      value={this.state.expDate}
                      onChange={this.handleInputChange}/>
                  </div>

                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Location:</label>
                      <input type="text" required
                      className="form-control"
                      name="location"
                      placeholder="Enter Location"
                      value={this.state.location}
                      onChange={this.handleInputChange}/>
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Supplier ID:</label>
                      <input type="text" required
                      className="form-control"
                      name="supId"
                      placeholder="Enter Supplier ID"
                      value={this.state.supId}
                      onChange={this.handleInputChange}/>

                    {formErrors.supId.length > 4  &&(
                        <span style={{color:'red'}} className="errorMessage">{formErrors.supId}</span>
                    )}
                  </div>
  
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Supplier Order ID:</label>
                      <input type="text" required
                      className="form-control"
                      name="sOrderId"
                      placeholder="Enter Supplier Order ID"
                      value={this.state.sOrderId}
                      onChange={this.handleInputChange}/>
                      
                      {formErrors.sOrderId.length > 5  &&(
                        <span style={{color:'red'}} className="errorMessage">{formErrors.sOrderId}</span>
                    )}
                  </div>
  
                  <button className="btn btn-outline-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                      <i className="far fa-check-square"></i>
                      &nbsp; Save Changes
                  </button>
              </from>
              </div>
              </div>
          </div>
          
        )
    }
}