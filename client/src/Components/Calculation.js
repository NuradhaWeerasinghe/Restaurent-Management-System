import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Bar,Line} from "react-chartjs-2"
import './styles.css'



export default class Calculation extends Component{
  constructor(props){
    super(props);
    this.monthlyCost = this.monthlyCost.bind(this);
    this.updateCstate = this.updateCstate.bind(this);
    this.monthlyProfit = this.monthlyProfit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.calculateAmount =this.calculateAmount.bind(this);
    this.state={
      amount:Number,
      amount:Number,
      salary:Number,
      total:Number,
      totAmount:Number,
      pDate:new Date(),
      date:new Date(),
      rcvDate:new Date(),
      oDate:new Date(),
      bills:[],
      employee:[],
      posts:[],
      orders:[],
      profits:{
        labels:["jan","feb","march","april","may","jun","jul","aug","sep","oct","nov","dec"],
        datasets:[{
          label:"Line Chart For Annual Profits",
          data:[],
         
        }],
      },
      jan:Number,
      feb:Number,
      march:Number,
      april:Number,
      may:Number,
      jun:Number,
      jul:Number,
      aug:Number,
      sep:Number,
      oct:Number,
      nov:Number,
      dec:Number,
      janp:Number,
      febp:Number,
      marchp:Number,
      aprilp:Number,
      mayp:Number,
      junp:Number,
      julp:Number,
      augp:Number,
      sepp:Number,
      octp:Number,
      novp:Number,
      decp:Number,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
 
  handleChange = (e) => {
    let a = parseInt(e.target.value)
    this.setState({
        [e.target.name]: a,
    })
  }

handleSubmit(e){
  e.preventDefault();
  const {profits} = this.state;
 this.setState({
 profits:{
   ...profits,
   labels:["jan","feb","march","april","may","jun","jul","aug","sep","oct","nov","dec"],
   datasets:[{
     ...profits.datasets,
     label:"Amount Profit",
     data:[
       this.state.jan,
       this.state.feb,
       this.state.march,
       this.state.april,
       this.state.may,
       this.state.jun,
       this.state.jul,
       this.state.aug,
       this.state.sep,
       this.state.oct,
       this.state.nov,
       this.state.dec,
     ],
   }]
 },
  totAmount:this.state.jan+this.state.feb+this.state.march+this.state.april+this.state.may+this.state.jun+this.state.jul+this.state.aug+this.state.sep+this.state.oct+this.state.nov+this.state.dec 
 })
}

monthlyProfit(){
  let tot=0;
  let tot1=0;
  let tot2=0;
  let t1 = 0;
  let tot3=0;
  let tot4=0;
  let tot5=0;
  let t2 = 0;
  let tot6=0;
  let tot7=0;
  let tot8=0;
  let t3 = 0;
  let tot9=0;
  let tot10=0;
  let tot11=0;
  let tot12=0;
  let t4 = 0;
  let tot13=0;
  let tot14=0;
  let tot15=0;
  let t5 = 0;
  let tot16=0;
  let tot17=0;
  let tot18=0;
  let t6 = 0;
  let tot19=0;
  let tot20=0;
  let tot21=0;
  let t7 = 0;
  let tot22=0;
  let tot23=0;
  let tot24=0;
  let t8 = 0;
  let tot25=0;
  let tot26=0;
  let tot27=0;
  let t9 = 0;
  let tot28=0;
  let tot29=0;
  let tot30=0;
  let t10 = 0;
  let tot31=0;
  let tot32=0;
  let tot33=0;
  let t12 = 0;
  let tot34=0;
  let tot35=0;
  let t11 = 0;
  this.state.bills.map((bills,index)=>{
    if(new Date(bills.pDate) >= new Date("April 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("April 31, 2021 00:00:00"))
      tot = bills.amount + tot;      
})
this.state.employee.map((employee,index)=>{
  if(new Date(employee.date) >= new Date("April 1, 2021 00:00:00") && new Date(employee.date) <= new Date("April 31, 2021 00:00:00"))
     tot1 = employee.salary + tot1;
  })
this.state.posts.map((posts,index)=>{
    if(new Date(posts.rcvDate) >= new Date("April 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("April 31, 2021 00:00:00"))
      tot2 = posts.amount + tot2;      
})
t1 = tot + tot1 + tot2;
///

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("February 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("February 29, 2021 00:00:00"))
    tot3 = bills.amount + tot3;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("February 1, 2021 00:00:00") && new Date(employee.date) <= new Date("February 29, 2021 00:00:00"))
   tot4 = employee.salary + tot4;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("February 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("February 29, 2021 00:00:00"))
    tot5 = posts.amount + tot5;      
})
t2 = tot3 + tot4 + tot5;
///

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("March 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("March 31, 2021 00:00:00"))
    tot6 = bills.amount + tot6;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("March 1, 2021 00:00:00") && new Date(employee.date) <= new Date("March 31, 2021 00:00:00"))
   tot7 = employee.salary + tot7;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("March 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("March 31, 2021 00:00:00"))
    tot8 = posts.amount + tot8;      
})
t3 = tot6 + tot7 + tot8;
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("January 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("January 31, 2021 00:00:00"))
    tot9 = bills.amount + tot9;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("January 1, 2021 00:00:00") && new Date(employee.date) <= new Date("January 31, 2021 00:00:00"))
   tot10 = employee.salary + tot10;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("January 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("January 31, 2021 00:00:00"))
    tot11 = posts.amount + tot11;      
})
t4 = tot9 + tot10 + tot11;
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("May 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("May 31, 2021 00:00:00"))
    tot12 = bills.amount + tot12;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("May 1, 2021 00:00:00") && new Date(employee.date) <= new Date("May 31, 2021 00:00:00"))
   tot13 = employee.salary + tot13;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("May 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("May 31, 2021 00:00:00"))
    tot14 = posts.amount + tot14;      
})
t5 = tot12 + tot13 + tot14;
this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("June 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("June 31, 2021 00:00:00"))
    tot15 = bills.amount + tot15;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("June 1, 2021 00:00:00") && new Date(employee.date) <= new Date("June 31, 2021 00:00:00"))
   tot16 = employee.salary + tot16;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("June 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("June 31, 2021 00:00:00"))
    tot17 = posts.amount + tot17;      
})
t6 = tot15 + tot16 + tot17;
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("July 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("July 31, 2021 00:00:00"))
    tot18 = bills.amount + tot18;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("July 1, 2021 00:00:00") && new Date(employee.date) <= new Date("July 31, 2021 00:00:00"))
   tot19 = employee.salary + tot19;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("July 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("July 31, 2021 00:00:00"))
    tot20 = posts.amount + tot20;      
})
t7 = tot18 + tot19 + tot20;
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("August 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("August 31, 2021 00:00:00"))
    tot21 = bills.amount + tot21;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("August 1, 2021 00:00:00") && new Date(employee.date) <= new Date("August 31, 2021 00:00:00"))
   tot22 = employee.salary + tot22;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("August 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("August 31, 2021 00:00:00"))
    tot23 = posts.amount + tot23;      
})
t8 = tot21 + tot23 + tot22;
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("September 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("September 31, 2021 00:00:00"))
    tot24 = bills.amount + tot24;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("September 1, 2021 00:00:00") && new Date(employee.date) <= new Date("September 31, 2021 00:00:00"))
   tot25 = employee.salary + tot25;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("September 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("September 31, 2021 00:00:00"))
    tot26 = posts.amount + tot26;      
})
t9 = tot24 + tot25 + tot26;
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("October 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("October 31, 2021 00:00:00"))
    tot27 = bills.amount + tot27;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("October 1, 2021 00:00:00") && new Date(employee.date) <= new Date("October 31, 2021 00:00:00"))
   tot28 = employee.salary + tot28;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("October 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("October 31, 2021 00:00:00"))
    tot29 = posts.amount + tot29;      
})
t10 = tot27 + tot28 + tot29;
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("November 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("November 31, 2021 00:00:00"))
    tot30 = bills.amount + tot30;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("November 1, 2021 00:00:00") && new Date(employee.date) <= new Date("November 31, 2021 00:00:00"))
   tot31 = employee.salary + tot31;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("November 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("November 31, 2021 00:00:00"))
    tot32 = posts.amount + tot32;      
})
t11 = tot30 + tot31 + tot32;
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("December 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("December 31, 2021 00:00:00"))
    tot33 = bills.amount + tot33;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("December 1, 2021 00:00:00") && new Date(employee.date) <= new Date("December 31, 2021 00:00:00"))
   tot34 = employee.salary + tot34;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("December 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("December 31, 2021 00:00:00"))
    tot35 = posts.amount + tot35;      
})
t12 = tot33 + tot34 + tot35;
this.updateState(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12);
}

updateState(a,b,c,d,e,f,g,h,i,j,k,l){
  this.setState({
      jan:d,
      feb:b,
      march:c,
      april:a,
      may:e,
      jun:f,
      jul:g,
      aug:h,
      sep:i,
      oct:j,
      nov:k,
      dec:l,
  })
}

monthlyCost(){
  let od1 =0;
  let od2=0;
  let od3=0;
  let od4=0;
  let od5=0;
  let od6=0;
  let od7=0;
  let od8=0;
  let od9=0;
  let od10=0;
  let od11=0;
  let od12=0;
  let tot=0;
  let tot1=0;
  let tot2=0;
  let t1 = 0;
  let tot3=0;
  let tot4=0;
  let tot5=0;
  let t2 = 0;
  let tot6=0;
  let tot7=0;
  let tot8=0;
  let t3 = 0;
  let tot9=0;
  let tot10=0;
  let tot11=0;
  let tot12=0;
  let t4 = 0;
  let tot13=0;
  let tot14=0;
  let tot15=0;
  let t5 = 0;
  let tot16=0;
  let tot17=0;
  let tot18=0;
  let t6 = 0;
  let tot19=0;
  let tot20=0;
  let tot21=0;
  let t7 = 0;
  let tot22=0;
  let tot23=0;
  let tot24=0;
  let t8 = 0;
  let tot25=0;
  let tot26=0;
  let tot27=0;
  let t9 = 0;
  let tot28=0;
  let tot29=0;
  let tot30=0;
  let t10 = 0;
  let tot31=0;
  let tot32=0;
  let tot33=0;
  let t12 = 0;
  let tot34=0;
  let tot35=0;
  let t11 = 0;
  this.state.bills.map((bills,index)=>{
    if(new Date(bills.pDate) >= new Date("April 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("April 31, 2021 00:00:00"))
      tot = bills.amount + tot;      
})
this.state.employee.map((employee,index)=>{
  if(new Date(employee.date) >= new Date("April 1, 2021 00:00:00") && new Date(employee.date) <= new Date("April 31, 2021 00:00:00"))
     tot1 = employee.salary + tot1;
  })
this.state.posts.map((posts,index)=>{
    if(new Date(posts.rcvDate) >= new Date("April 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("April 31, 2021 00:00:00"))
      tot2 = posts.amount + tot2;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("April 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("April 31, 2021 00:00:00"))
    od1 = orders.total + od1;      
})
t1 = od1 - (tot + tot1 + tot2);
///

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("February 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("February 29, 2021 00:00:00"))
    tot3 = bills.amount + tot3;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("February 1, 2021 00:00:00") && new Date(employee.date) <= new Date("February 29, 2021 00:00:00"))
   tot4 = employee.salary + tot4;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("February 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("February 29, 2021 00:00:00"))
    tot5 = posts.amount + tot5;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("February 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("February 31, 2021 00:00:00"))
    od2 = orders.total + od2;      
})
t2 = od2 - (tot3 + tot4 + tot5);
///

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("March 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("March 31, 2021 00:00:00"))
    tot6 = bills.amount + tot6;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("March 1, 2021 00:00:00") && new Date(employee.date) <= new Date("March 31, 2021 00:00:00"))
   tot7 = employee.salary + tot7;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("March 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("March 31, 2021 00:00:00"))
    tot8 = posts.amount + tot8;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("March 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("March 31, 2021 00:00:00"))
    od3 = orders.total + od3;      
})
t3 = od3 - (tot6 + tot7 + tot8);
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("January 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("January 31, 2021 00:00:00"))
    tot9 = bills.amount + tot9;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("January 1, 2021 00:00:00") && new Date(employee.date) <= new Date("January 31, 2021 00:00:00"))
   tot10 = employee.salary + tot10;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("January 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("January 31, 2021 00:00:00"))
    tot11 = posts.amount + tot11;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("January 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("January 31, 2021 00:00:00"))
    od4 = orders.total + od4;      
})
t4 = od4 -(tot9 + tot10 + tot11);
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("May 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("May 31, 2021 00:00:00"))
    tot12 = bills.amount + tot12;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("May 1, 2021 00:00:00") && new Date(employee.date) <= new Date("May 31, 2021 00:00:00"))
   tot13 = employee.salary + tot13;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("May 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("May 31, 2021 00:00:00"))
    tot14 = posts.amount + tot14;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("January 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("January 31, 2021 00:00:00"))
    od5 = orders.total + od5;      
})
t5 = od5 -(tot12 + tot13 + tot14);
this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("June 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("June 31, 2021 00:00:00"))
    tot15 = bills.amount + tot15;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("June 1, 2021 00:00:00") && new Date(employee.date) <= new Date("June 31, 2021 00:00:00"))
   tot16 = employee.salary + tot16;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("June 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("June 31, 2021 00:00:00"))
    tot17 = posts.amount + tot17;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("July 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("July 31, 2021 00:00:00"))
    od12 = orders.total + od12;      
})
t6 = od12 - (tot15 + tot16 + tot17);
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("July 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("July 31, 2021 00:00:00"))
    tot18 = bills.amount + tot18;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("July 1, 2021 00:00:00") && new Date(employee.date) <= new Date("July 31, 2021 00:00:00"))
   tot19 = employee.salary + tot19;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("July 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("July 31, 2021 00:00:00"))
    tot20 = posts.amount + tot20;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("July 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("July 31, 2021 00:00:00"))
    od6 = orders.total + od6;      
})
t7 = od6 - (tot18 + tot19 + tot20);
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("August 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("August 31, 2021 00:00:00"))
    tot21 = bills.amount + tot21;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("August 1, 2021 00:00:00") && new Date(employee.date) <= new Date("August 31, 2021 00:00:00"))
   tot22 = employee.salary + tot22;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("August 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("August 31, 2021 00:00:00"))
    tot23 = posts.amount + tot23;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("August 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("August 31, 2021 00:00:00"))
    od7 = orders.total + od7;      
})
t8 = od7 -(tot21 + tot23 + tot22);
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("September 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("September 31, 2021 00:00:00"))
    tot24 = bills.amount + tot24;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("September 1, 2021 00:00:00") && new Date(employee.date) <= new Date("September 31, 2021 00:00:00"))
   tot25 = employee.salary + tot25;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("September 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("September 31, 2021 00:00:00"))
    tot26 = posts.amount + tot26;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("September 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("September 31, 2021 00:00:00"))
    od8 = orders.total + od8;      
})
t9 = od8- (tot24 + tot25 + tot26);
////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("October 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("October 31, 2021 00:00:00"))
    tot27 = bills.amount + tot27;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("October 1, 2021 00:00:00") && new Date(employee.date) <= new Date("October 31, 2021 00:00:00"))
   tot28 = employee.salary + tot28;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("October 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("October 31, 2021 00:00:00"))
    tot29 = posts.amount + tot29;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("October 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("October 31, 2021 00:00:00"))
    od9 = orders.total + od9;      
})
t10 = od9 - (tot27 + tot28 + tot29);
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("November 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("November 31, 2021 00:00:00"))
    tot30 = bills.amount + tot30;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("November 1, 2021 00:00:00") && new Date(employee.date) <= new Date("November 31, 2021 00:00:00"))
   tot31 = employee.salary + tot31;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("November 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("November 31, 2021 00:00:00"))
    tot32 = posts.amount + tot32;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("November 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("November 31, 2021 00:00:00"))
    od10 = orders.total + od10;      
})
t11 = od10 - (tot30 + tot31 + tot32);
/////

this.state.bills.map((bills,index)=>{
  if(new Date(bills.pDate) >= new Date("December 1, 2021 00:00:00") && new Date(bills.pDate) <= new Date("December 31, 2021 00:00:00"))
    tot33 = bills.amount + tot33;      
})
this.state.employee.map((employee,index)=>{
if(new Date(employee.date) >= new Date("December 1, 2021 00:00:00") && new Date(employee.date) <= new Date("December 31, 2021 00:00:00"))
   tot34 = employee.salary + tot34;
})
this.state.posts.map((posts,index)=>{
  if(new Date(posts.rcvDate) >= new Date("December 1, 2021 00:00:00") && new Date(posts.rcvDate) <= new Date("December 31, 2021 00:00:00"))
    tot35 = posts.amount + tot35;      
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.ODate) >= new Date("November 1, 2021 00:00:00") && new Date(orders.rcvDate) <= new Date("November 31, 2021 00:00:00"))
    od11 = orders.total + od11;      
})
t12 = od11- (tot33 + tot34 + tot35);
this.updateCstate(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12);
}

updateCstate(a,b,c,d,e,f,g,h,i,j,k,l){
  this.setState({
      janp:d,
      febp:b,
      marchp:c,
      aprilp:a,
      mayp:e,
      junp:f,
      julp:g,
      augp:h,
      sepp:i,
      octp:j,
      novp:k,
      decp:l,
  })
}

componentDidMount(){
    this.retrieveBills();
    this.retrieveEmployee();
    this.retrievePosts();
    this.retrieveOrders();
  }
   
  calculateAmount = () => {
    let tot=0;
    let tot1 =0;
    let tot2 =0;
    let tot3 = 0;
    let ab1 = document.getElementById("rtt").value;
    let ab = document.getElementById("rt").value;
    this.state.bills.map((bills,index)=>{
    if(new Date(bills.pDate) <= new Date(ab) && new Date(bills.pDate) >= new Date(ab1)){
      tot = bills.amount + tot;      
    }
    document.getElementById("ane").value = tot;
})
   this.state.employee.map((employee,index)=>{
   if(new Date(employee.date) <= new Date(ab) && new Date(employee.date) >= new Date(ab1)){
      tot1 = employee.salary + tot1;
    }
    document.getElementById("ane1").value = tot1;
   })
   this.state.posts.map((posts,index)=>{
    if(new Date(posts.rcvDate) <= new Date(ab) && new Date(posts.rcvDate) >= new Date(ab1)){
      tot2 = posts.amount + tot2;      
    }
    document.getElementById("ane3").value = tot2;
})
this.state.orders.map((orders,index)=>{
  if(new Date(orders.oDate) <= new Date(ab) && new Date(orders.oDate) >= new Date(ab1)){
    tot3 = orders.total + tot3;      
  }
  document.getElementById("ane4").value = tot3;
})
    document.getElementById("ane2").value = tot + tot1 + tot2;
  };


  retrieveBills(){
    axios.get("http://localhost:8000/bills").then(res =>{
      if(res.data.success){
        this.setState({
          bills:res.data.existingBills
        
        });
        console.log(this.state.bills)
        
      }
    });
  }
  
  retrieveEmployee(){
    axios.get(`http://localhost:8000/employee`).then(res=>{
    if(res.data.success){
        this.setState({
            employee:res.data.existingEmployee
        });
        console.log(this.state.employee);

    }
       
    });
}

retrievePosts(){
  axios.get("http://localhost:8000/posts").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts);
    }
  });
}

retrieveOrders() {
  axios.get("http://localhost:8000/orders").then(res => {
    if (res.data.success) {
      this.setState({
        orders: res.data.existingOrders
      });
      console.log(this.state.orders)
    }
  });
}

  render(){
    const {data,profits}= this.state;
      return(
        <div className="div2PDF" >
          <div className="form-group" style={{ marginBottom: '15px' }} > 
        <br></br>
        <br></br>
        <br></br>
        <div className="shadowBox" >
        <h3>Enter Date</h3>
         <label style={{ marginBottom: '5px',fontWeight:'bold' }}>FROM:</label>
              <input type="date" id="rtt" />
               <label style={{ marginBottom: '5px',fontWeight:'bold' }} >UPTO:</label>
              <input type="date" id="rt" />
               <br></br>
               <br></br>
               <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Bill Amount:(RS)</label>
               <input id="ane" className="form-control" disabled/>
               <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Employ Salary:(Rs)</label>
           <input id="ane1" className="form-control" disabled/>
           <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Supplier Cost:(Rs)</label>
           <input id="ane3" className="form-control" disabled/>
           <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Order Sale:(Rs)</label>
           <input id="ane4" className="form-control" disabled/>
           <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Total Amount:(Rs)</label>
           <input id="ane2" className="form-control" disabled/>
           <br></br>
              <button onClick={this.calculateAmount}>Calculate</button>
              <br></br>
              <br></br>
            <label style={{ marginBottom: '5px',fontWeight:'bold' }}>Annual Profit Amount:(Rs)</label> 
           <p>{this.state.totAmount}</p>
           </div>
           </div>
           <div>

             <form onSubmit={(e)=>this.handleSubmit(e)} className="shadowBox" >
             <h3>Monthly Cost</h3>
            <div className="input-flex" style={{width:'100%'}}>
              <div  style={{width:'50%',float:'left'}} className="shadowBox" >
              <div>
            <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)} 
             name="jan"
             value={this.state.jan}
             placeholder="Jan"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter February Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="feb"
             value={this.state.feb}
             placeholder="Feb"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter March Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="march"
             value={this.state.march}
             placeholder="March"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter April Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="april"
             value={this.state.april}
             placeholder="April"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter May Profits:</label>
            <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="may"
             value={this.state.may}
             placeholder="may"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter June Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="jun"
             value={this.state.jun}
             placeholder="jun"
             disabled />
             </div>
             </div>
             <div  style={{width:'50%',float:'right'}} className="shadowBox">
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter July Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="jul"
             value={this.state.jul}
             placeholder="jul"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter August Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="aug"
             value={this.state.aug}
             placeholder="Aug"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter September Profits:</label>
            <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="sep"
             value={this.state.sep}
             placeholder="Sep"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter October Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="oct"
             value={this.state.oct}
             placeholder="Oct"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter November Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="nov"
             value={this.state.nov}
             placeholder="Nov"
             disabled/>
           </div>
           <div>
           <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter December Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="dec"
             value={this.state.dec}
             placeholder="Decem"
             disabled/>
           </div>
           </div>
         </div>
         <br></br>
         <button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
         <button onClick={this.monthlyProfit}>Profit</button>
       </form>
           </div >

           <h3 align="center">Line Chart for Annual Cost</h3>
           <div className="shadowBox">
           <Line 
           options={{
             fill:{
                  target:'origin',
                  above:'rgba(0,230,64,1)', 
             },
           title:{
             display:true,
             text:"Line Chart for Annual Profit",
             fontSize:32
           },
           legend:{
             display:true,
             position:"right"
           },
            backgroundColor: "rgba(25,181,254,1)",
            hoverBackgroundColor: "rgba(255,0,255,0.75)",
            hoverBorderWidth: 20,
            hoverBorderColor: "rgba(255,0,255,0.75)",
           borderColor:"rgba(25,181,254,1)",
           borderWidth:2,
           radius:2

           }}
           data={profits}/> 
           <br></br>
           <br></br>
           <Link to="/finan" className="btn btn-warning"><i class="fas fa-user-plus"></i>&nbsp;Dashboard</Link>&nbsp;&nbsp;
           </div>

           <div>

             <form onSubmit={(e)=>this.handleSubmit(e)} className="shadowBox" >
             <h3>Monthly Profit</h3>
            <div className="input-flex" style={{width:'100%'}}>
              <div  style={{width:'50%',float:'left'}} className="shadowBox" >
              <div>
            <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)} 
             name="janp"
             value={this.state.janp}
             placeholder="Jan"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter February Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="febp"
             value={this.state.febp}
             placeholder="Feb"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter March Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="marchp"
             value={this.state.marchp}
             placeholder="March"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter April Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="aprilp"
             value={this.state.aprilp}
             placeholder="April"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter May Profits:</label>
            <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="mayp"
             value={this.state.mayp}
             placeholder="may"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter June Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="junp"
             value={this.state.junp}
             placeholder="jun"
             disabled />
             </div>
             </div>
             <div  style={{width:'50%',float:'right'}} className="shadowBox">
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter July Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="julp"
             value={this.state.julp}
             placeholder="jul"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter August Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="augp"
             value={this.state.augp}
             placeholder="Aug"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter September Profits:</label>
            <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="sepp"
             value={this.state.sepp}
             placeholder="Sep"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter October Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="octp"
             value={this.state.octp}
             placeholder="Oct"
             disabled/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter November Profits:</label>
           <input className="form-control"
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="novp"
             value={this.state.novp}
             placeholder="Nov"
             disabled/>
           </div>
           <div>
           <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter December Profits:</label>
           <input className="form-control"
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="decp"
             value={this.state.decp}
             placeholder="Decem"
             disabled/>
           </div>
           </div>
         </div>
         <br></br>
         <button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
         <button onClick={this.monthlyCost}>Profit</button>
       </form>
           </div >
      </div>
           
      );
  }
} 