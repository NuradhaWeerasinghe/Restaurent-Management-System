import React, { Component } from 'react';
import axios from 'axios';
const invoiceRegx = RegExp(/^[IN]*$/)
const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};
export default class EditBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            invoiceID: null,
            amount: Number,
            accNo: Number,
            pDate: new Date(),
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
                    value.length < 5
                        ? "Minimum charchter must be 5"
                        : "";
                break;
            case "accNo":
                formErrors.accNo =
                    value.length < 8 || value.length > 8
                        ? "Must be 8 digits"
                        : "";
                break;
            case "invoiceID":
                formErrors.invoiceID =
                    invoiceRegx.test(value) || value.length > 5
                        ? "Didn't match pattern"
                        : "";
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
        if (!formValid(this.state.formErrors)) {
            console.error("FORM INVALID-DISPLAY ERROR");
        }
        const id = this.props.match.params.id;
        const { name, invoiceID, accNo, amount, pDate } = this.state;
        const data = {
            name: name,
            invoiceID: invoiceID,
            accNo: accNo,
            amount: amount,
            pDate: pDate
        }
        //console.log(data)
        axios.put(`http://localhost:8000/bill/update/${id}`, data).then((res) => {
            if (res.data.success) {
                alert("Successfully update Bill")
                this.setState(
                    {
                        name: "",
                        invoiceID: "",
                        accNo: Number,
                        amount: Number,
                        pDate: new Date()
                    }
                )
            };
        });
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/bill/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: res.data.bill.name,
                    invoiceID: res.data.bill.invoiceID,
                    accNo: res.data.bill.accNo,
                    amount: res.data.bill.amount,
                    pDate: res.data.bill.pDate
                });
                console.log(this.state.bill);
            }
        })
    }
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
                        <h2>Edit Bill Details</h2>
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
                                <label style={{ marginBottom: '5px' }}>Bill Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Bill Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} required />
                                {formErrors.name.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Invoice ID</label>
                                <input type="text"
                                    className="form-control"
                                    name="invoiceID"
                                    placeholder="Enter Invoice ID"
                                    value={this.state.invoiceID}
                                    onChange={this.handleInputChange} required />
                                {formErrors.invoiceID.length > 5 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.invoiceID}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Account No</label>
                                <input type="number"
                                    className="form-control"
                                    name="accNo"
                                    placeholder="Enter Account No"
                                    value={this.state.accNo}
                                    onChange={this.handleInputChange} required />
                                {formErrors.accNo.length > 8 && (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.accNo}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Amount (Rs.)</label>
                                <input type="number"
                                    className="form-control"
                                    name="amount"
                                    placeholder="Enter Amount"
                                    value={this.state.amount}
                                    onChange={this.handleInputChange} required />
                                     {formErrors.amount < 1 || (
                                    <span style={{ color: 'red' }} className="errorMessage">{formErrors.amount}</span>
                                )}
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Payment Date</label>
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
        )
    }
}