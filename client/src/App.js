import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <NavBar/>
      <div className="container">
     
        <Route path = "/" exact component ={Home}></Route>
        <Route path = "/add" exact component ={AddEmployee}></Route>
        <Route path = "/update/:id" exact component ={UpdateEmployee}></Route>
        <Route path = "/employee/:id" exact component ={GetSpecific}></Route>
       
       
      </div>
      </BrowserRouter>
    )
  }
}
