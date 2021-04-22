import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class BillDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            bill:[]
        };
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/bill/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    bill:res.data.bill
                });
                console.log(this.state.bill);
            }
        })
    }
    render(){
        const {name,invoiceID,accNo,amount,pDate}=this.state.bill;
        return(
            <div className="row">
            <div className="col-1"><h3><i class="fas fa-file-invoice"></i></h3></div>
            <div className="col-8 position-relative">
                <h2>Bill Details</h2>
            </div>
            <div className="col-3 position-relative"></div>
            <hr className="hr" style={{height:'2px' , color:'#0a90e8'}}/>  
        
            <div  style={{marginTop:'20px'}}  style={{
                borderRadius:'5px',
                backgroundColor:'#f2f2f2',
                padding: '20px',
                width: '40%',
                fontFamily:'sans-serif',
                border: '1px solid',
                padding: '10px',
                boxShadow: '0 1px 56px -26px #000'
            }}
            > 
            <div >
            <h4>{invoiceID}</h4>
            <hr/>
            <dl className="row">
                <dt className="col-sm-3">Bill Name</dt>
                <dd className="col-sm-9">{name}</dd>

                <dt className="col-sm-3">Account No</dt>
                <dd className="col-sm-9">{accNo}</dd>

                <dt className="col-sm-3">Amount(Rs.)</dt>
                <dd className="col-sm-9">{amount}</dd>

                <dt className="col-sm-3">Payment Date</dt>
                <dd className="col-sm-9">{pDate}</dd>
            </dl>
            <Link className ="btn btn-outline-primary" to="/finan">DashBoard</Link>
            </div>
            </div>
            </div>
        )
    }
}