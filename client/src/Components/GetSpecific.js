import React, {Component} from 'react';
import axios from 'axios';
export default class GetSpecific extends Component{
    constructor(props){
        super(props);
        this.state={
            employee:{}
        };
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/employee/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    employee:res.data.employee
                });
                console.log(this.state.employee);
            }
        })
    }
    render(){
        const {name,email,address,mobileNo,designation,salary,userName,password}=this.state.employee;
        return(
            <div style={{marginTop:'20px'}}> 
            <h4>{name}</h4>
            <hr/>
            <dl className="row">
                <dt className="col-sm-3">Email</dt>
                <dd className="col-sm-9">{email}</dd>

                <dt className="col-sm-3">Address </dt>
                <dd className="col-sm-9">{address}</dd>

                <dt className="col-sm-3">MobileNo</dt>
                <dd className="col-sm-9">{mobileNo}</dd>

                <dt className="col-sm-3">Designation</dt>
                <dd className="col-sm-9">{designation}</dd>

                <dt className="col-sm-3">Salary</dt>
                <dd className="col-sm-9">{salary}</dd>

                <dt className="col-sm-3">User Name</dt>
                <dd className="col-sm-9">{userName}</dd>

                <dt className="col-sm-3">Password</dt>
                <dd className="col-sm-9">{password}</dd>

                
            </dl>
            </div>
        )
    }
}