import React, {Component} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";


export default class RecordHome extends Component{
  constructor(props){
    super(props);
    this.state={
      records:[]
    };
  }

  componentDidMount(){
    this.retrieveRecords();
  }

  retrieveRecords(){
    axios.get("http://localhost:8000/records").then(res =>{
      if(res.data.success){
        this.setState({
          records:res.data.existingRecords
        });
        console.log(this.state.records)
      }
    });
  }

onDelete=(id)=>{
  axios.delete(`http://localhost:8000/record/delete/${id}`).then((res)=>{
    alert("Record Deleted");
    this.retrieveRecords();
  })
}
//search
filterData(records,searchKey){
  const result=records.filter((record)=>
  record.leaveType.toLowerCase().includes(searchKey)
  
  )
  this.setState({records:result})
}


handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value.toLowerCase();
  axios.get("http://localhost:8000/records").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingRecords,searchKey)
    }
  });

}
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Leave Records</h4>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <input
              className="form-control"
              type="search"
              placeholder="search"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>

        </div>
        
<table className="table border shadow ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Leave Type</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Reason</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {this.state.records.map((records,index)=>(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td><a href={`/record/${records._id}`} style={{textDecoration:'none'}}>{records.leaveType}</a></td>
        <td>{records.from}</td>
        <td>{records.to}</td>
        <td>{records.reason}</td>
        <td><Link className ="btn btn-outline-primary" to={`/edit_R/${records._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
          </Link>
          &nbsp;
          <Link className ="btn btn-danger" href="#" onClick={()=>this.onDelete(records._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>
          </td>
      </tr>
    ))}
  </tbody>
</table>
<Link to="/add_R" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Request a Leave</Link>

      </div>
    )
  }
};