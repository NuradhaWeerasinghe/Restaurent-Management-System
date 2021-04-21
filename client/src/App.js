import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";

import NavBar from './Components/NavBar/Sidebar';

import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';

import CreateStock from './components/CreateStock';
import EditStock from './components/EditStock';
import Home from './components/Home';
import StockDetails from './components/StockDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar/>
      <div className="container">
     
        {/*Employee*/}
        <Route path = "/get_Emp" exact component ={Home}></Route>
        <Route path = "/emp_add" exact component ={AddEmployee}></Route>
        <Route path = "/emp_update/:id" exact component ={UpdateEmployee}></Route>
        <Route path = "/employee/:id" exact component ={GetSpecific}></Route>
       
    {/*Inventory*/}
    <Route path="/" exact component={Home}></Route>
        <Route path="/add" component={CreateStock}></Route>
        <Route path="/edit/:id" component={EditStock}></Route>
        <Route path="/post/:id" component={StockDetails}></Route>
       
      </div>
      </BrowserRouter>
    )
  }
}
