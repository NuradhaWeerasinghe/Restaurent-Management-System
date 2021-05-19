import './estyle.css';
import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


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
        const {name,email,address,mobileNo,designation,salary}=this.state.employee;
        return(
            <div className="shadowBox">
            <div className ="tname"> 
            <h4  style={{textAlign:'center'}}>{name}'s Deatils</h4>
            </div>
          
            <hr/>
            <dl className="row ">
                
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


                
            </dl>
          
            </div>
        )
    }
}