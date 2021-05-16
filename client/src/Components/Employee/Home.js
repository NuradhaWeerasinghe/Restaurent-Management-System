import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import '../styles.css'

export default class Home extends Component {
constructor(props){
    super(props);

    this.state={
        employee:[]
    };
}



componentDidMount(){
    this.retrieveEmployee();
}

retrieveEmployee(){
    axios.get(`http://localhost:8000/employee`).then(res=>{
    if(res.data.success){
        this.setState({
            employee:res.data.existingEmployee
        });
        console.log(this.state.employee);

    }
       
    });
}

onDelete = (id) => {
  axios.delete(`http://localhost:8000/employee/delete/${id}`).then((res) => {
    alert("Deleted Successfully");
    this.retrieveEmployee();
  })
}

filterData(employee,searchKey){
  const result=employee.filter((employee)=>
  employee.name.toLowerCase().includes(searchKey)||
  employee.email.toLowerCase().includes(searchKey)||
  employee.address.toLowerCase().includes(searchKey)||
  employee.designation.toLowerCase().includes(searchKey)

  )
  this.setState({employee:result})
}



handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value;
  axios.get("http://localhost:8000/employee").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingEmployee,searchKey)
    }
  });
}

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">

            </div>
            <div className="col-lg-3 mt-2 mb-2 ">
              <input
              className="form-control"
              type="search"
              placeholder="🔍 Search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>

        </div> 
            <div className="py-4">
            <h1>Employee Dashbord</h1>
            <table class=" table shadowBox shadow p-3 mb-5 bg-white rounded" >
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">MobileNo</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Salary Date</th>
                    <th scope="col">Salary(LKR)</th>
                    <th scope="col">Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                   {this.state.employee.map((employee,index)=> (
                      <tr key={index}>
                          <th scope="row">EMP{index + 1}</th>
                          <td>
                             <a href={`/employee/${employee._id}`} style={{textDecoration:'none'}}>
                              {employee.name}
                            </a>
                            </td>
                          <td>{employee.email}</td>
                          <td>{employee.address}</td>
                          <td>{employee.mobileNo}</td>
                          <td>{employee.designation}</td>
                          <td>{employee.date}</td>
                          <td>{employee.salary}</td>
                          
                          <td>
                               
                            <Link  className="btn btn-outline-primary" to={`/emp_update/${employee._id}`}>
                              <i className="fas fa-edit"></i> &nbsp;Update
                            
                            </Link>
                            &nbsp;
                            <Link className="btn btn-danger" onClick={()=>this.onDelete(employee._id)}><i className="far fa-trash-alt"></i>&nbsp;Delete</Link>
                                
                            </td>
                      </tr>
                    ))}

                </tbody>
                </table>
                <Link to="emp_add" className="btn btn-warning"><i className="fas fa-user-plus"></i>&nbsp;Add Employee</Link>
                
                
 
            </div>
        </div>
    )
  }
}
