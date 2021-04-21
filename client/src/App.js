import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';

import createOrder from './components/Orders/createOrder';
import editOrder from './components/Orders/editOrder';
import orderHome from './components/Orders/orderHome';
import orderView from './components/Orders/orderView';

import createItem from './components/items/createItem';
import editItem from './components/items/editItem';
import itemHome from './components/items/itemHome';
import itemView from './components/items/itemView';

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
       
        {/* Order Routes*/}
        <Route path ="/order/" exact component = {orderHome}></Route>
          <Route path = "/order/add" component = {createOrder}></Route>
          <Route path ="/order/edit/:id" component={editOrder}></Route>
          <Route path ="/order/orders/:id" component={orderView}></Route>

          {/* Item Routes*/}
          <Route path ="/item/" exact component = {itemHome}></Route>
          <Route path = "/item/add" component = {createItem}></Route>
          <Route path ="/item/edit/:id" component={editItem}></Route>
          <Route path ="/item/item/:id" component={itemView}></Route>
       
      </div>
      </BrowserRouter>
    )
  }
}
