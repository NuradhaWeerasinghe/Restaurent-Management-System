import React, { Component } from 'react'
import axios from 'axios'
import { storage } from "../firebase";
import Progress from "./Progress";

const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class CreateStock extends Component {

    constructor(props){
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
        this.state={
            stockId:"",
            stockType:"",
            brand:"",
            category:"",
            amount:Number,
            rcvQuan:Number,
            remQuan:Number,
            rcvDate:"",
            expDate:"",
            location:"",
            supId:"",
            sOrderId:"",
            //Firebase Image Upload States
            file: null,
            uploadPercentage: 0,
            NoItemImg:"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
            imgLink:"",
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

        if(!formValid(this.state.formErrors)){
            console.error("FORM INVALID-DISPLAY ERROR");
        }

        const {stockId,stockType,brand,category,amount,rcvQuan,remQuan,rcvDate,expDate,location,supId,sOrderId,imgLink} = this.state;

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
            sOrderId:sOrderId,
            imgLink:imgLink,
        }

        console.log(data)

        axios.post("/post/save",data).then((res) => {
            if(res.data.success){
                alert("New stock added successfuly")
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
    }

    uploadImage(e) {
        if (e.target.files[0] !== null) {
          const uploadTask = storage
            .ref(`products/${e.target.files[0].name}`)
            .put(e.target.files[0]);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              //progress function
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              this.setState({ uploadPercentage: progress });
            },
            (error) => {
              //error function
              console.log(error);
            },
            () => {
              //complete function
              storage
                .ref("products")
                .child(e.target.files[0].name)
                .getDownloadURL()
                .then((url) => {
                  console.log(url);
                  this.setState({ imgLink: url });
                });
            }
          );
        } else {
            alert("Error Upload Image First")
        }
      }
    
    render() {

        const {formErrors}= this.state;
      return (
        
        <div class="row">
           <div  className="col-md-6">
           <div className="shadowBox">
            <h6 className="h3 mb-3 font-weight-normal">Create a new stock</h6>
            
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

                     
                <div className="form-row">
                <div className="form-group">
                  {this.state.imgLink ? (
                    <img
                      src={this.state.imgLink}
                      alt="productImg"
                      style={{ width: "150px" }}
                    />
                  ) : (
                    <img
                      src={this.state.NoItemImg}
                      alt="productImg"
                      style={{ width: "150px" }}
                    />
                  )}

                  <label style={{ fontSize: "12px", marginLeft: "15px" }}>
                    Image
                  </label>
                  <div className="row mt-2">
                    <div className="col-md-9">
                      <input
                        className="form-control "
                        type="file"
                        id="exampleInputEmail"
                        name="Image"
                        style={{ padding: "2px" }}
                        onChange={(e) => {
                          this.setState({ file: e.target.files[0] });
                          this.uploadImage(e);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <Progress percentage={this.state.uploadPercentage} />
              </div>
      
                    

                <button className="btn btn-outline-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Submit Details
                </button>
            </from>
            
        </div>
        </div>


        <div  className="col-md-6">
        
        <img src="/Images/inventory1.png"  alt="inventory" style={{height:'700px' , width:'700px', marginTop:'100px'}}/>
        </div>
        </div>
      )
    }
}