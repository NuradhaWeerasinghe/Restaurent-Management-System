import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const invoiceRegx = RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/gm);
const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            mobileNo: Number,
            designation: "",
            salary: Number,
            date: new Date(),

            formErrors:{
                mobileNo:Number,
                name:"",
                email:""
                
            } 

        }
    }

    handleInputChange = (e) => {
 
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch(name){
            case "name":
            formErrors.name=
            value.length < 5
            ?"Minimum charchter must be 5"
            :"";
            break;
            case "email":
            formErrors.email = invoiceRegx.test(value)
            ? ""
            : "Didn't match pattern";
            break;
            case "mobileNo":
            formErrors.mobileNo =
            value.length > 10 || value.length > 10
            ? "Must be 10 digits"
            :"";
            break;
            default:
            break;
        }
        this.setState({formErrors,[name]: value},()=> console.log(this.state));

        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(formValid(this.state.formErrors)){
           

        const { name, email, address, mobileNo, designation, salary,date } = this.state;

        const data = {
            name: name,
            email: email,
            address: address,
            mobileNo: mobileNo,
            designation: designation,
            salary: salary,
            date :date
        }
        console.log(data)
        axios.post("http://localhost:8000/employee/add", data).then((res) => {
            if (res.data.success) {
                toast(`New Employee Added `, {
                    type: toast.TYPE.SUCCESS,
                    autoClose: 4000
                });
                this.setState(
                    {
                        name: "",
                        email: "",
                        address: "",
                        mobileNo: Number,
                        designation: "",
                        salary: Number,
                        date : new Date()
                    }
                )
            };
        });
    }
    else{
        toast(`Your Inserting blank! `, {
            type: toast.TYPE.ERROR,
            autoClose: 4000
        });
    
    }
    };

    render() {
        const {formErrors}= this.state;

        return (
            <div className="container">
                <div className="row ">
                    <div className="col-6">
                        <img className="add_img" src="../images/E3.png" />
                    </div>

                    <div className="col-6 shadowBox" >
                        <center>
                            <h1 className="h3 mb-3 font-weight-normal">ADD New Employee</h1>
                        </center>
                        <form className="needs-validation" noValidate >
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Employee Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Employee Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />

                                {formErrors.name.length > 5  &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.name}</span>
                            )}

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Email</label>
                                <input type="email"
                                    className={formErrors.email.length > 0 ? "error" : "form-control"}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                                     {formErrors.email.length > 0 && (
                                    <span style={{ color: 'red',fontWeight:'bold' }} className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Address</label>
                                <input type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={this.state.address}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Mobile No</label>
                                <input type="number"
                                    className="form-control"
                                    name="mobileNo"
                                    placeholder="Enter MobileNo"
                                    value={this.state.mobileNo}
                                    onChange={this.handleInputChange} />

                                {formErrors.mobileNo.length > 10 &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.mobileNo}</span>
                                 )}

                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Designation</label>
                                <input type="text"
                                    className="form-control"
                                    name="designation"
                                    placeholder="Enter Designation"
                                    value={this.state.designation}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Salary Date</label>
                                <input type="date"
                                    className="form-control"
                                    name="date"
                                    placeholder="Enter Payment Date"
                                    value={this.state.date}
                                    onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}>Salary</label>
                                <input type="number"
                                    className="form-control"
                                    name="salary"
                                    placeholder="Enter Salary"
                                    value={this.state.salary}
                                    onChange={this.handleInputChange} />
                            </div>

                    
                            <center>
                                <div class="d-grid gap-2 col-6 mx-auto  ">
                                    <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}><i class="far fa-save"></i>&nbsp;Add</button>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>

        );
    };
};