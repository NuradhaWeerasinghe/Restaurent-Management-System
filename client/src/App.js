import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';

import AddDriver from './Components/AddDriver';
import FetchAllDrivers from './Components/FetchAllDrivers';
import ManageDelivery from './Components/ManageDelivery';
import AddVehicle from './Components/AddVehicle';
import FetchAllVehicles from './Components/FetchAllVehicles';
import EditOrderStatus from './Components/EditOrderStatus';
import UpdateDriver from './Components/UpdateDriver';
import UpdateVehicle from './Components/UpdateVehicle';


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
       
        <Route path="/ManageDelivery" component={ManageDelivery}></Route>
        <Route path='/add_driver' component={AddDriver}></Route>
        <Route path='/display_driver' component={FetchAllDrivers}></Route>
        <Route path='/add_vehicle' component={AddVehicle}></Route>
        <Route path='/display_vehicle' component={FetchAllVehicles}></Route>
        <Route path='/EditOrderStatus' component={EditOrderStatus}></Route>
        <Route path='/update_driver/:id' component={UpdateDriver}></Route>
        <Route path='/update_vehicle/:id' component={UpdateVehicle}></Route>        
       
      </div>
      </BrowserRouter>
    )
  }
}
