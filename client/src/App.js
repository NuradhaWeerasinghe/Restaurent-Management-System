import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";

import NavBar from './Components/NavBar/Sidebar';

import Home from './Components/Employee/Home';
import AddEmployee from './Components/Employee/AddEmployee';
import UpdateEmployee from './Components/Employee/UpdateEmployee';
import GetSpecific from './Components/Employee/GetSpecific';

import CreateAttendance from './Components/Attendance&Leave/CreateAttendance';
import CreateRecord from './Components/Attendance&Leave/CreateRecord';
import EditRecord from './Components/Attendance&Leave/EditRecord';
import RecordHome from './Components/Attendance&Leave/RecordHome';
/** delivery*/
import AddDriver from './Components/delivery/AddDriver';
import AddVehicle from './Components/delivery/AddVehicle';
import fetchDrivers from './Components/delivery/FetchAllDrivers';
import fetchVehicles from './Components/delivery/FetchAllVehicles';
import manageDelivery from './Components/delivery/ManageDelivery';
import updateDriver from './Components/delivery/UpdateDriver';
import updateVehicle from './Components/delivery/UpdateVehicle';
import EditOrderStatus from './Components/delivery/EditOrderStatus';
import UpdateDeliveryStatus from './Components/delivery/UpdateDeliveryStatus';
import OrderStatusView from './Components/delivery/OrderStatusView';
import MyOrders from './Components/delivery/MyOrders';/** end of delivery*/


import BillDetails from './Components/BillDetails';
import CreateBill from './Components/CreateBill';
import EditBill from './Components/EditBill';
import BillHome from './Components/BillHome';
import Calculation from './Components/Calculation';


import CreateStock from './Components/CreateStock';
import EditStock from './Components/EditStock';

import StockDetails from './Components/StockDetails';
import HomeC from './Components/HomeC';
import SendEmail from './Components/SendEmail';


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

import Footer from './Components/Footer/Footer';
import AttendHome from './Components/Attendance&Leave/AttendHome';

import SignIn from './Components/SignIn'






export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <NavBar />
        
        <ToastContainer />
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
          
          <Route path="/SignIn" component={SignIn}></Route>

          <Route path="/item/" exact component={itemHome}></Route>
          <Route path="/item/add" component={createItem}></Route>
          <Route path="/item/edit/:id" component={editItem}></Route>
          <Route path="/item/item/:id" component={itemView}></Route>

          <Route path="/get_R" exact component={RecordHome}></Route>
          <Route path="/add_R" component={CreateRecord}></Route>
          <Route path="/edit_R/:id" component={EditRecord}></Route>
          <Route path="/attend" component={CreateAttendance}></Route>
          {/* Delivery Routes*/}
          <Route path='/add_driver' component={AddDriver}></Route>
          <Route path='/add_vehicle' component={AddVehicle}></Route>
          <Route path='/display_driver' component={fetchDrivers}></Route>
          <Route path='/display_vehicle' component={fetchVehicles}></Route>
          <Route path='/update_driver/:id' component={updateDriver}></Route>
          <Route path='/update_vehicle/:id' component={updateVehicle}></Route>
          <Route path="/ManageDelivery" component={manageDelivery}></Route>
          <Route path='/EditOrderStatus' component={EditOrderStatus}></Route>
          <Route path='/update_delivery/:id' component={UpdateDeliveryStatus}></Route>
          <Route path='/delivery/:id' exact component={OrderStatusView}></Route>
          <Route path='/MyOrders' component={MyOrders}></Route> {/* end of Delivery Routes*/}
          
          <Route path="/finan" exact component={BillHome}></Route>
          <Route path="/finan/add" component={CreateBill}></Route>
          <Route path="/finan/edit/:id" component={EditBill}></Route>
          <Route path="/finan/bill/:id" component={BillDetails}></Route>
          <Route path="/finan/cal"  component={Calculation}></Route>

          <Route path="/" exact component={HomeC}></Route>
          <Route path="/add" component={CreateStock}></Route>
          <Route path="/edit/:id" component={EditStock}></Route>
          <Route path="/post/:id" component={StockDetails}></Route>
          <Route path="/email" component={SendEmail}></Route>
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
          <Route path="/get_at" component={AttendHome}></Route>


       
        </div>
       
        <Footer/>
      </BrowserRouter>
      
    )
  }
}
