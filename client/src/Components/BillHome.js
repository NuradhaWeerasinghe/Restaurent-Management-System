import React, {Component} from 'react'
import axios from 'axios';
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'
import { Link } from "react-router-dom";


export default class BillHome extends Component{
  constructor(props){
    super(props);
    this.state={
      bills:[]
    };
  }

  exportPDF = () => {
    const unit = "pt";
    const size = "A3"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = "Bill Details";
    const headers = [['Invoice ID','Bill Name','Account No', 'Amount(Rs.)', 'Payment Date']];
  
    const data = this.state.bills.map(elt=> [elt.invoiceID, elt.name,elt.accNo,elt.amount,elt.pDate]);
  
    let content = {
      startY: 50,
      head: headers,
      body: data
    };
  
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Bill.pdf")
  }
  

  componentDidMount(){
    this.retrieveBills();
  }

  retrieveBills(){
    axios.get("http://localhost:8000/bills").then(res =>{
      if(res.data.success){
        this.setState({
          bills:res.data.existingBills
        });
        console.log(this.state.bills)
      }
    });
  }

onDelete=(id)=>{
  axios.delete(`http://localhost:8000/bill/delete/${id}`).then((res)=>{
    alert("Bill Deleted");
    this.retrieveBills();
  })
}

filterData(bills,searchKey){
  const result=bills.filter((bill)=>
  bill.name.toUpperCase().includes(searchKey)||
  bill.name.toLowerCase().includes(searchKey)||
  bill.invoiceID.toUpperCase().includes(searchKey)||
  bill.pDate.toUpperCase().includes(searchKey)
  )
  this.setState({bills:result})
}


handleSearchArea=(e)=>{
  const searchKey=e.currentTarget.value;
  axios.get("http://localhost:8000/bills").then(res =>{
    if(res.data.success){
      this.filterData(res.data.existingBills,searchKey)
    }
  });

}
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h2>Finance Dashboard</h2>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <input style={{border:'1px solid #000'}}
              className="form-control"
              type="search"
              placeholder="search                                            🔍"
              name="searchQuery"
              onChange={this.handleSearchArea}></input>

            </div>

        </div>
        
<table className="table border shadow table table-striped border" style={{fontWeight:'bold'}}>
  <thead >
    <tr>
      <th scope="col">#</th>
      <th scope="col">Invoice ID</th>
      <th scope="col">Bill Name</th>
      <th scope="col">Account No</th>
      <th scope="col">Amount(Rs.)</th>
      <th scope="col">Payment Date</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {this.state.bills.map((bills,index)=>(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td><a href={`/finan/bill/${bills._id}`} style={{textDecoration:'none'}}>{bills.invoiceID}</a></td>
        <td>{bills.name}</td>
        <td>{bills.accNo}</td>
        <td>{bills.amount}</td>
        <td>{bills.pDate}</td>
        <td><Link className ="btn btn-outline-primary" to={`/finan/edit/${bills._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
          </Link>
          &nbsp;
          <Link className ="btn btn-danger" href="#" onClick={()=>this.onDelete(bills._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>
          </td>
      </tr>
    ))}
  </tbody>
</table>
<Link to="/finan/add" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Create New Bill</Link>&nbsp;&nbsp;
&nbsp;<Link to="/finan/cal" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Chart</Link>&nbsp;&nbsp;
<Link onClick={()=>this.exportPDF()} to="#" className="btn btn-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
      </div>
    )
  }
};