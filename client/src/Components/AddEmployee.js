import React, {Component} from 'react';
import axios from 'axios';


export default class AddEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            address:"",
            mobileNo:Number,
            designation:"",
            salary:Number,
            userName:"",
            password:""
            
        }
    }

    handleInputChange=(e)=>{
        const{name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        });
    };

    onSubmit = (e) =>{
    e.preventDefault();

    const {name,email,address,mobileNo,designation,salary,userName,password}=this.state;

    const data ={
        name:name,
        email:email,
        address:address,
        mobileNo:mobileNo,
        designation:designation,
        salary:salary,
        userName:userName,
        password:password
    }
    console.log(data)
    axios.post("http://localhost:8000/employee/add",data).then((res)=>{
        if(res.data.success){
            alert("Add New Employee")
            this.setState(
                {
                    name:"",
                    email:"",
                    address:"",
                    mobileNo:Number,
                    designation:"",
                    salary:Number,
                    userName:"",
                    password:""
                }
            )
        };
    });
};

    render(){
        return(
           
            <div className="col-md-8 mt-4 mx-auto" 
            style={{
                borderRadius:'5px',
                backgroundColor:'#fff',
                padding: '20px',
                width: '40%',
                fontFamily:'sans-serif',
                border: '1px solid',
                padding: '10px',
                boxShadow: '0 1px 56px -26px #000'
            }}>
            
            
                <h1 className="h3 mb-3 font-weight-normal">ADD New Employee</h1>
                <form className="needs-validation" noValidate >
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Employee Name</label>
                        <input type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Employee Name"
                        value={this.state.name}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Email</label>
                        <input type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}/>
                    </div>
                    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Address</label>
                        <input type="text"
                        className="form-control"
                        name="address"
                        placeholder="Enter Address"
                        value={this.state.address}
                        onChange={this.handleInputChange}/>
                    </div>
                        
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Mobile No</label>
                        <input type="number"
                        className="form-control"
                        name="mobileNo"
                        placeholder="mobileNo"
                        value={this.state.mobileNo}
                        onChange={this.handleInputChange}/>
                    </div>
                    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Designation</label>
                        <input type="text"
                        className="form-control"
                        name="designation"
                        placeholder="Enter Payment Date"
                        value={this.state.designation}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Salary</label>
                        <input type="number"
                        className="form-control"
                        name="salary"
                        placeholder="Enter Salary"
                        value={this.state.salary}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>UserName</label>
                        <input type="text"
                        className="form-control"
                        name="userName"
                        placeholder="Enter UserName"
                        value={this.state.userName}
                        onChange={this.handleInputChange}/>
                    </div>
                    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Password</label>
                        <input type="text"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add</button>
                    </form>
            </div>
            
        );
    };
};