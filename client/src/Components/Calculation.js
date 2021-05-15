import React, {Component} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Bar,Line} from "react-chartjs-2"

export default class Calculation extends Component{
  constructor(props){
    super(props);
    this.calculateAmount =this.calculateAmount.bind(this);
    //this.getChartData = this.getChartData.bind(this);
    this.state={
      amount:Number,
      totAmount:Number,
      pDate:new Date(),
      bills:[],
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



  componentDidMount(){
    this.retrieveBills();
  }
   
  calculateAmount = () => {
    let tot=0;
    let ab1 = document.getElementById("rtt").value;
    let ab = document.getElementById("rt").value;
    this.state.bills.map((bills,index)=>{
    if(new Date(bills.pDate) < new Date(ab) && new Date(bills.pDate) > new Date(ab1)){
      tot = bills.amount + tot;      
    }
   return document.getElementById("ane").innerHTML = tot;
})
   
    
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
  
  render(){
    const {data,profits}= this.state;
      return(
        <div>
          <div>
        <br></br>
        <br></br>
        <br></br>
        <div className="shadowBox">
        <h3>Enter Date</h3>
         <label>FROM:</label>
              <input type="date" id="rtt" />
               <label>UPTO:</label>
              <input type="date" id="rt" />
              <button onClick={this.calculateAmount}>cal</button>
           <p id="ane"></p>
           <p>{this.state.totAmount}</p>
           </div>
           </div>
           <div>

             <form onSubmit={(e)=>this.handleSubmit(e)} className="shadowBox" >
             <h3>Enter Monthly</h3>
            <div className="input-flex">
              <div>
              <div>
            <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)} 
             name="jan"
             value={this.state.jan}
             placeholder="Jan"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="feb"
             value={this.state.feb}
             placeholder="Feb"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="march"
             value={this.state.march}
             placeholder="March"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="april"
             value={this.state.april}
             placeholder="April"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
            <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="may"
             value={this.state.may}
             placeholder="may"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="jun"
             value={this.state.jun}
             placeholder="jun"
             required />
             </div>
             </div>
             <div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="jul"
             value={this.state.jul}
             placeholder="jul"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="aug"
             value={this.state.aug}
             placeholder="Aug"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
            <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="sep"
             value={this.state.sep}
             placeholder="Sep"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="oct"
             value={this.state.oct}
             placeholder="Oct"
             required/>
             </div>
             <div>
             <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
            type="number"
            onChange={(evt) => this.handleChange(evt)}
             name="nov"
             value={this.state.nov}
             placeholder="Nov"
           required/>
           </div>
           <div>
           <label style={{ marginBottom: '5px', fontWeight:'bold' }}>Enter January Profits:</label>
           <input
           type="number"
           onChange={(evt) => this.handleChange(evt)}
             name="dec"
             value={this.state.dec}
             placeholder="Decem"
           required/>
           </div>
           </div>
         </div>
         <button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>
      
       </form>
           </div>
           <Line 
         className="shadowBox"
           options={{
             fill:{
                  target:'origin',
                  above:'rgba(0,230,64,1)', 
             },
            yAxes:{
              labelString:'Profit Amount(Rs:)'
            },
            backgroundColor: "rgba(25,181,254,1)",
            hoverBackgroundColor: "rgba(255,0,255,0.75)",
            hoverBorderWidth: 20,
            hoverBorderColor: "rgba(255,0,255,0.75)",
           borderColor:"rgba(25,181,254,1)",
           borderWidth:2,
           radius:2

           }}
           data={profits} /> 
      </div>
           
      );
  }
} 