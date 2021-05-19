import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {jsPDF} from 'jspdf'
import 'jspdf-autotable'

export default class Home extends Component {
 constructor(props){
   super(props);

   this.state={
     posts:[]
   };
 } 

exportPDF = () => {
  const unit = "pt";
  const size = "A2"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const title = "Inventory Details";
  const headers = [['Stock ID','Stock Type','Brand','Category','Amount','Recieved Quantity','Remaining Quantity','Recieved Date','Expiary Date','Location','Supplier ID','Supplier Order ID']];

  const data = this.state.posts.map(elt=> [elt.stockId,elt.stockType,elt.brand,elt.category,elt.amount,elt.rcvQuan,elt.remQuan,elt.rcvDate,elt.expDate,elt.location,elt.supId,elt.sOrderId]);

  let content = {
    startY: 50,
    head: headers,
    body: data
  };

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save("Inventory.pdf")
}

componentDidMount(){
  this.retrievePosts();
} 


 retrievePosts(){
   axios.get("/posts").then(res =>{
     if(res.data.success){
       this.setState({
         posts:res.data.existingPosts
       });

       console.log(this.state.posts);
     }
   });
 }

 onDelete = (id) => {
    axios.delete(`/post/delete/${id}`).then((res) =>{
        alert("Stock details deleted successfully");
        this.retrievePosts();
    })
}

filterData(posts,searchKey){
    const result = posts.filter((post) =>
        post.stockId.toLowerCase().includes(searchKey)||
        post.stockType.toLowerCase().includes(searchKey)||
        post.brand.toUpperCase().includes(searchKey)||
        post.category.toLowerCase().includes(searchKey)||
        post.location.toLowerCase().includes(searchKey)||
        post.rcvDate.toUpperCase().includes(searchKey)||
        post.expDate.toUpperCase().includes(searchKey)
    )
this.setState({posts:result})
}

handleSearchArea = (e) =>{

    const searchKey= e.currentTarget.value;

    axios.get("/posts").then(res =>{
        if(res.data.success){
          this.filterData(res.data.existingPosts,searchKey)
        }
      });
}

  render() {
    return(
      <div className="container">
          <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">Inventory Details</h1>
              </div>
              
          </div>

          <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
          <button className="btn btn-outline-primary"><a href="/add" style={{textDecoration:'none',color:'blue'}}><i class="fa fa-plus"></i>&nbsp;Create New Stock</a></button> &nbsp;
        <button className="btn btn-outline-info"><a href="/email" style={{textDecoration:'none',color:'primary'}}><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Send An Email</a></button>&nbsp;
        <Link onClick={()=>this.exportPDF()} to="#" className="btn btn-outline-success"><i class="fas fa-download"></i>&nbsp;Download Report</Link>
        </div>

        <div className="col-lg-3 mt-2 mb-2">
                  <input
                  className="form-control"
                  type="search"
                  placeholder="🔍 Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>
                  </input>
          </div>
          </div>

  <div 
    style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}>
        <table class="table shadowBox shadow p-3 mb-5 bg-white rounded" style={{marginTop:'50px'}}>
          <thead class="thead-light">
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">Stock ID</th>
              <th scope="col">Stock Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Amount (LKR)</th>
              <th scope="col">Recieved Quantity (kg/l)</th>
              <th scope="col">Remaining Quantity (kg/l)</th>
              <th scope="col">Received_Date</th>
              <th scope="col">Expiary_Date</th>
              <th scope="col">Location</th>
              <th scope="col">Supplier ID</th>
              <th scope="col">Supplier Order ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) => (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                    <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                    {posts.stockId}
                    </a>
                </td>
                <td>{posts.stockType}</td>
                <td>{posts.brand}</td>
                <td>{posts.category}</td>
                <td>{posts.amount}.00</td>
                <td>{posts.rcvQuan}</td>
                <td>{posts.remQuan}</td>
                <td>{posts.rcvDate.substring(0,10)}</td>
                <td>{posts.expDate.substring(0,10)}</td>
                <td>{posts.location}</td>
                <td>{posts.supId}</td>
                <td>{posts.sOrderId}</td>
               
                <td>
                <div style={{ display: "flex" }}>
                  <a className="btn btn-outline-warning" href={`/edit/${posts._id}`} style={{ marginLeft: "auto" }}><i className="fas fa-edit"></i>&nbsp;Update
                  </a>
                  &nbsp;
                  <a className="btn btn-outline-danger" href="#" onClick={() =>this.onDelete(posts._id)}><i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                  </div>
                  </td>
                  
              </tr>
              
            ))}
          </tbody>
        </table>
        </div>
     
      </div>
    )
  }
}