import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
 constructor(props){
   super(props);

   this.state={
     posts:[]
   };
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
        post.brand.toLowerCase().includes(searchKey)||
        post.category.toLowerCase().includes(searchKey)
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
              <h4>Inventory Details</h4>
              </div>
              <div className="col-lg-3 mt-2 mb-2">
                  <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>
                  </input>
              </div>
          </div>
        
        <table className="table table-striped borde" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Stock ID</th>
              <th scope="col">Stock Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Amount (LKR)</th>
              <th scope="col">Recieved Quantity (kg/l)</th>
              <th scope="col">Remaining Quantity (kg/l)</th>
              <th scope="col">Received Date</th>
              <th scope="col">Expiary Date</th>
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
                <td>{posts.amount}</td>
                <td>{posts.rcvQuan}</td>
                <td>{posts.remQuan}</td>
                <td>{posts.rcvDate}</td>
                <td>{posts.expDate}</td>
                <td>{posts.location}</td>
                <td>{posts.supId}</td>
                <td>{posts.sOrderId}</td>
                <td>
                  <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(posts._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create new stock</a></button>
      </div>
    )
  }
}