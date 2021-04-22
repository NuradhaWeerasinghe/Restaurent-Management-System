import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';

import BillDetails from './components/BillDetails';
import CreateBill from './components/CreateBill';
import EditBill from './components/EditBill';
import BillHome from './components/BillHome';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar/>
      <div className="container">
     
        <Route path = "/get_Emp" exact component ={Home}></Route>
        <Route path = "/emp_add" exact component ={AddEmployee}></Route>
        <Route path = "/emp_update/:id" exact component ={UpdateEmployee}></Route>
        <Route path = "/employee/:id" exact component ={GetSpecific}></Route>

        <Route path ="/finan" exact component = {BillHome}></Route>
          <Route path = "/finan/add" component = {CreateBill}></Route>
          <Route path ="/finan/edit/:id" component={EditBill}></Route>
          <Route path="/finan/bill/:id" component={BillDetails}></Route>
       
      </div>
      </BrowserRouter>
    )
  }
}
