import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Sidebar';

import Home from './Components/Home';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import GetSpecific from './Components/GetSpecific';

import NavBar from './Components/NavBar/Sidebar';

import CreateAttendance from './Components/CreateAttendance';
import CreateRecord from './Components/CreateRecord';
import EditRecord from './Components/EditRecord';
import RecordHome from './Components/RecordHome';

import AddDriver from './Components/AddDriver';
import FetchAllDrivers from './Components/FetchAllDrivers';
import ManageDelivery from './Components/ManageDelivery';
import AddVehicle from './Components/AddVehicle';
import FetchAllVehicles from './Components/FetchAllVehicles';
import EditOrderStatus from './Components/EditOrderStatus';
import UpdateDriver from './Components/UpdateDriver';
import UpdateVehicle from './Components/UpdateVehicle';


import BillDetails from './Components/BillDetails';
import CreateBill from './Components/CreateBill';
import EditBill from './Components/EditBill';
import BillHome from './Components/BillHome';

import CreateStock from './Components/CreateStock';
import EditStock from './Components/EditStock';
import Home from './Components/Home';
import StockDetails from './Components/StockDetails';

import ViewSuppliers from './Components/Supplier/ViewSuppliers';
import AddSupplier from './Components/Supplier/AddSupplier';
import UpdateSupplier from './Components/Supplier/UpdateSupplier';
import ViewSupplierOrders from './Components/SupplierOrder/ViewSupplierOrders';
import AddSupplierOrder from './Components/SupplierOrder/AddSupplierOrder';
import UpdateSupplierOrder from './Components/SupplierOrder/UpdateSupplierOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


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
        <NavBar />
        <div className="container">

          {/*Employee*/}
          <Route path="/get_Emp" exact component={Home}></Route>
          <Route path="/emp_add" exact component={AddEmployee}></Route>
          <Route path="/emp_update/:id" exact component={UpdateEmployee}></Route>
          <Route path="/employee/:id" exact component={GetSpecific}></Route>






          {/* Order Routes*/}
          <Route path="/order/" exact component={orderHome}></Route>
          <Route path="/order/add" component={createOrder}></Route>
          <Route path="/order/edit/:id" component={editOrder}></Route>
          <Route path="/order/orders/:id" component={orderView}></Route>

          {/* Item Routes*/}
          <Route path="/item/" exact component={itemHome}></Route>
          <Route path="/item/add" component={createItem}></Route>
          <Route path="/item/edit/:id" component={editItem}></Route>
          <Route path="/item/item/:id" component={itemView}></Route>

          <Route path="/get_R" exact component={RecordHome}></Route>
          <Route path="/add_R" component={CreateRecord}></Route>
          <Route path="/edit_R/:id" component={EditRecord}></Route>
          <Route path="/attend" component={CreateAttendance}></Route>

          <Route path="/ManageDelivery" component={ManageDelivery}></Route>
          <Route path='/add_driver' component={AddDriver}></Route>
          <Route path='/display_driver' component={FetchAllDrivers}></Route>
          <Route path='/add_vehicle' component={AddVehicle}></Route>
          <Route path='/display_vehicle' component={FetchAllVehicles}></Route>
          <Route path='/EditOrderStatus' component={EditOrderStatus}></Route>
          <Route path='/update_driver/:id' component={UpdateDriver}></Route>
          <Route path='/update_vehicle/:id' component={UpdateVehicle}></Route>

          <Route path="/finan" exact component={BillHome}></Route>
          <Route path="/finan/add" component={CreateBill}></Route>
          <Route path="/finan/edit/:id" component={EditBill}></Route>
          <Route path="/finan/bill/:id" component={BillDetails}></Route>

          <Route path="/" exact component={Home}></Route>
          <Route path="/add" component={CreateStock}></Route>
          <Route path="/edit/:id" component={EditStock}></Route>
          <Route path="/post/:id" component={StockDetails}></Route>

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
