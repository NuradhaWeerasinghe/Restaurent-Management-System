import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';
import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';
import ViewSupplierOrders from './Components/SupplierOrder/ViewSupplierOrders';
import AddSupplierOrder from './Components/SupplierOrder/AddSupplierOrder';
import UpdateSupplierOrder from './Components/SupplierOrder/UpdateSupplierOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar/>
	  	<ToastContainer />
      <div className="container">
     
        <Route path = "/" exact component ={Home}></Route>
        <Route path = "/add" exact component ={AddEmployee}></Route>
        <Route path = "/update/:id" exact component ={UpdateEmployee}></Route>
        <Route path = "/employee/:id" exact component ={GetSpecific}></Route>
       {/* Supplier routes */}
					<Route exact path='/supplier'>
						<ViewSuppliers />
					</Route>
					<Route exact path='/add-new-supplier'>
						<AddSupplier />
					</Route>
					<Route exact path='/update-supplier/:id'>
						<UpdateSupplier />
					</Route>
					<Route exact path='/supplier-orders'>
						<ViewSupplierOrders />
					</Route>
					<Route exact path='/new-supplier-order'>
						<AddSupplierOrder />
					</Route>
					<Route exact path='/update-supplier-order/:id'>
						<UpdateSupplierOrder />
					</Route>
       
      </div>
      </BrowserRouter>
    )
  }
}
