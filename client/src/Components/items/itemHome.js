import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";


export default class orderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.retrieveItems();
  }

  retrieveItems() {
    axios.get("http://localhost:8000/items").then(res => {
      if (res.data.success) {
        this.setState({
          items: res.data.existingItems
        });
        console.log(this.state.items)
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/item/delete/${id}`).then((res) => {
      alert("Item Deleted");
      this.retrieveItems();
    })
  }

  filterData(items, searchKey) {
    const result = items.filter((item) =>
      item.itemId.toLowerCase().includes(searchKey) ||
      item.itemId.toUpperCase().includes(searchKey) ||
      item.description.toLowerCase().includes(searchKey) ||
      item.description.toUpperCase().includes(searchKey) ||
      item.category.toLowerCase().includes(searchKey) ||
      item.category.toUpperCase().includes(searchKey) ||
      item.name.toLowerCase().includes(searchKey) ||
      item.name.toUpperCase().includes(searchKey)
    )
    this.setState({ items: result })
  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:8000/items").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingItems, searchKey)
      }
    });

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Items</h4>
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

        <table className="table border shadow  table table-striped border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price (LKR.)</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((items, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><a href={`/item/item/${items._id}`} style={{ textDecoration: 'none' }}>{items.itemId}</a></td>
                <td>{items.name}</td>
                <td>{items.price}</td>
                <td>{items.description}</td>
                <td>{items.category}</td>
                <td><Link className="btn btn-outline-primary" to={`/item/edit/${items._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
          </Link>
          &nbsp;
          <Link className="btn btn-danger" href="#" onClick={() => this.onDelete(items._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
          </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/item/add" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Create New Item</Link>

      </div>
    )
  }
};