import React, { Component } from 'react';
import axios from 'axios';
import './styles.css'


const invoiceRegx = RegExp(/^[I]+[N]+\d{3}$/gm);
const formValid = ({formErrors, ...rest}) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val =>{
        val === null && (valid = false);
    });
    return valid;
};
export default class CreateBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            invoiceID: null,
            amount: Number,
            accNo: Number,
            pDate:  Date,
            formErrors: {
                name: "",
                invoiceID: "",
                accNo: 0,
                amount:0
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name =
                    value.trim().length < 5
                        ? "Minimum charachter must be 5"
                        : "";
                break;
            case "accNo":
                formErrors.accNo =
                    value.length < 10 || value.length > 12
                        ? "Must be between 10 and 12 digits"
                        : "";
                break;
            case "invoiceID":
                formErrors.invoiceID = invoiceRegx.test(value)
                        ? ""
                        : "Didn't match pattern";
                break;
                case "amount":
                formErrors.amount =
                     value < 0
                        ? "Invalid Amount"
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
        if (formValid(this.state)) {
        const { name, invoiceID, accNo, amount, pDate } = this.state;
        const data = {
            name: name,
            invoiceID: invoiceID,
            accNo: accNo,
            amount: amount,
            pDate: pDate
        }
        //console.log(data)
        axios.post("http://localhost:8000/bill/save", data).then((res) => {
            if (res.data.success) {
                alert("Create New Bill")
                this.setState(
                    {
                        name: "",
                        invoiceID: "",
                        accNo: Number,
                        amount: Number,
                        pDate:  Date
                    }
                )
            };
        });
    }
    else
    alert("PLEASE ENTER DETAILS CORRECTLY!");
    };

    render() {
        const { formErrors } = this.state;
        return (
            <div className="container">
				<div className="row">
					<h1 className="top"></h1>
				</div>	
                <div className="row">
					<div className="col-1"><h3><i class="fas fa-file-invoice"></i></h3></div>
                    <div className="col-8 position-relative">
                        <h2>Create New Bill</h2>
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{height:'2px' , color:'#0a90e8'}}/>  
                </div> 
                <div className="row">
                    <div className="col-4">
                        <img src="/Images/undraw.png"  alt="finance" style={{height:'350px' , width:'420px', marginTop:'100px'}}/>
                    </div>
                    <div className="col-7">
                        <form onSubmit={this.onSubmit} className="shadowBox" >
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Bill Name</label>
                                
                                <input type="text"
                                    className={formErrors.name.trim().length > 5 ? "error" : "form-control"}
                                    name="name"
                                    placeholder="Enter Bill Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                                {formErrors.name.trim().length > 5 && (
                                    <span style={{ color: 'red' ,fontWeight:'bold'}} className="errorMessage">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Invoice ID</label>
                                <input type="text"
                                    className={formErrors.invoiceID.length > 0 ? "error" : "form-control"}
                                    name="invoiceID"
                                    placeholder="Enter Invoice ID                   Example:IN000"
                                    value={this.state.invoiceID}
                                    onChange={this.handleInputChange}  />
                                {formErrors.invoiceID.length > 0 && (
                                    <span style={{ color: 'red',fontWeight:'bold' }} className="errorMessage">{formErrors.invoiceID}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Account No</label>
                                <input type="number"
                                 className={formErrors.accNo.length > 10 ? "error" : "form-control"}
                                
                                    name="accNo"
                                    placeholder="Enter Account No          Example:0000123436"
                                    value={this.state.accNo}
                                    onChange={this.handleInputChange}  />
                                {formErrors.accNo.length > 10 && (
                                    <span style={{ color: 'red',fontWeight:'bold' }} className="errorMessage">{formErrors.accNo}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Amount (Rs.)</label>
                                <input type="number"
                                 className={formErrors.amount.length > 0 ? "error" : "form-control"}
                                    
                                    name="amount"
                                    placeholder="Enter Amount"
                                    value={this.state.amount}
                                    onChange={this.handleInputChange}  />
                                     {formErrors.amount < 1 || (
                                    <span style={{ color: 'red' ,fontWeight:'bold',fontWeight:'bold' }} className="errorMessage">{formErrors.amount}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Payment Date</label>
                                <input type="date"
                                    className="form-control"
                                    name="pDate"
                                    placeholder="Enter Payment Date"
                                    value={this.state.pDate}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="row">
								<div className="form-group btnbilll col-12"  >
									<div className="form-group col"  style={{marginTop:'15px'}}>	              		
										<button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
									</div>
									<div className="form-group col"  style={{marginTop:'15px'}}>
									<a href="/finan" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>
									</div>              			
								</div>
								<div className="col-6"></div>
							</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};