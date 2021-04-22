import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';

import CreateAttendance from './Components/CreateAttendance';
import CreateRecord from './Components/CreateRecord';
import EditRecord from './Components/EditRecord';
import RecordHome from './Components/RecordHome';
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
       
        <Route path ="/get_R" exact component = {RecordHome}></Route>
          <Route path = "/add_R" component = {CreateRecord}></Route>
          <Route path ="/edit_R/:id" component={EditRecord}></Route>
          <Route path="/attend" component={CreateAttendance}></Route>
       
      </div>
      </BrowserRouter>
    )
  }
}
