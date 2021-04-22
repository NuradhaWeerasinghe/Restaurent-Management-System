import React, {Component} from 'react';
import axios from 'axios';


export default class CreateRecord extends Component{
    constructor(props){
        super(props);
        this.state={
            empID:"",
            password:"",
            to:Date,
            reason:""
        }
    }
    handleInputChange=(e)=>{
        const{name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        });
    };

onSubmit = (e) =>{
    e.preventDefault();
    const {leaveType,from,to,reason}=this.state;
    const data ={
        leaveType:leaveType,
        from:from,
        to:to,
        reason:reason
    }
    //console.log(data)
    axios.post("http://localhost:8000/record/save",data).then((res)=>{
        if(res.data.success){
            alert("Leave request successfully sent")
            this.setState(
                {
                    leaveType:"",
                    from:Date,
                    to:Date,
                    reason:""
                }
            )
        };
    });
};

    render(){
        return(
            <div className="col-md-8 mt-4 mx-auto" style={{
                borderRadius:'5px',
                backgroundColor:'#f2f2f2',
                padding: '20px',
                width: '40%',
                fontFamily:'sans-serif',
                boxShadow: '0 1px 56px -26px #000'
                
            }}
            
            >
                <center><h1 className="h3 mb-3 font-weight-normal">Attendance</h1></center>
                <form  >
                <div className="form-group col-4 position-relative" style={{marginTop:'15px'}}>
	            <label for="type">Attendance Type : </label>
	            <select id="type" className="form-control" name="leaveType" onChange={this.handleInputChange} value={this.state.leaveType} required>

		            <option value="IN">IN</option>
		            <option value="OUT">OUT</option>
	            </select>       
                </div>      

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Employee ID</label>
                <input type="text"
                className="form-control"
                name="Employee ID"
                placeholder="Enter Your employee ID"
                value={this.state.reason}
                onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Password</label>
                <input type="password"
                className="form-control"
                name="reason"
                placeholder="Enter your password"
                value={this.state.reason}
                onChange={this.handleInputChange}/>
                </div>

            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </form>
            </div>
        );
    };
};