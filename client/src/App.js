import React, { Component } from 'react'
import {BrowserRouter,Route} from "react-router-dom";
import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';
import NavBar from './Components/NavBar/Sidebar';




import createOrder from './Components/Orders/createOrder';
import editOrder from './Components/Orders/editOrder';
import orderHome from './Components/Orders/orderHome';
import orderView from './Components/Orders/orderView';

import createItem from './Components/items/createItem';
import editItem from './Components/items/editItem';
import itemHome from './Components/items/itemHome';
import itemView from './Components/items/itemView';




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
