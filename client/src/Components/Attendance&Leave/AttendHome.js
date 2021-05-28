import React, {Component} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";


export default class AttendHome extends Component{
  constructor(props){
    super(props);
    this.state={
      attends:[]
    };
  }

  componentDidMount(){
    this.retrieveAttendence();
  }

  retrieveAttendence(){
    axios.get("http://localhost:8000/attends").then(res =>{
      if(res.data.success){
        this.setState({
          attends:res.data.existingAttends
        });
        console.log(this.state.attends)
      }
    });
  }

// onDelete=(id)=>{
//   axios.delete(`http://localhost:8000/record/delete/${id}`).then((res)=>{
//     alert("Record Deleted");
//     this.retrieveRecords();
//   })
// }

filterData(attends,searchKey){
  const result=attends.filter((attends)=>
  attends.type.toUpperCase().includes(searchKey)||
  attends.aTime.toLowerCase().includes(searchKey)
  )
  this.setState({attends:result})
}


handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value;
  axios.get("http://localhost:8000/attends").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingAttends,searchKey)
    }
  });

}
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>Attendance Records</h4>
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
      <th scope="col">Employ ID</th>
      <th scope="col">Date and Time</th>
      <th scope="col">Attend Type</th>
   
    </tr>
  </thead>
  <tbody>
    {this.state.attends.map((attends,index)=>(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td><a href={`/record/${attends._id}`} style={{textDecoration:'none'}}>{attends.empID}</a></td>
        <td>{attends.type}</td>
        <td>{attends.aTime}</td>
        {/* <td><Link className ="btn btn-outline-primary" to={`/edit_R/${records._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
          </Link>
          &nbsp;
          <Link className ="btn btn-danger" href="#" onClick={()=>this.onDelete(records._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>
          </td> */}
      </tr>
    ))}
  </tbody>
</table>
<Link to="/attend" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Attend</Link>

      </div>
    )
  }
};