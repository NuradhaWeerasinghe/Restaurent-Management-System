import React, {Component} from 'react';
import axios from 'axios';

const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};
export default class CreateRecord extends Component{
    constructor(props){
        super(props);
        this.state={
            leaveType:"",
            from:Date,
            to:Date,
            reason:"",

            formErrors:{
    
                reason:""
                
                
            } 
        }
    }
    handleInputChange=(e)=>{
        const{name,value} = e.target;
        let formErrors = this.state.formErrors;
        
        //validations
        switch(name){
            case "reason":
            formErrors.reason=
            value.length < 5
            ?"Minimum charchter must be 5"
            :"";
            break;
            
            default:
            break;
        }
        this.setState({formErrors,[name]: value},()=> console.log(this.state));


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
    //database link
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
        const {formErrors}= this.state;
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
                <center><h1 className="h3 mb-3 font-weight-normal">Request a Leave</h1></center>
                <form  >
                <div className="form-group col-4 position-relative" style={{marginTop:'15px'}}>
	            <label for="type"> Leave Type : </label>
	            <select id="type" className="form-control" name="leaveType" onChange={this.handleInputChange} value={this.state.leaveType} required>
		            <option selected>Choose type...</option>
		            <option value="Casual">Casual</option>
		            <option value="Medical">Medical</option>
		            <option value="Half-Day">Half-Day</option>
	            </select>       
                </div>      

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>From</label>
                <input type="date"
                className="form-control"
                name="from"
                value={this.state.from}
                onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>To</label>
                <input type="date"
                className="form-control"
                name="to"
                value={this.state.to}
                onChange={this.handleInputChange}/>
                </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>Reason</label>
                <input type="text"
                className="form-control"
                name="reason"
                placeholder="Dear Mr./Ms.

                I would like to formally request a leave for .............."
                value={this.state.reason}
                onChange={this.handleInputChange}/>

{formErrors.reason.length > 5  &&(
                                <span style={{color:'red'}} className="errorMessage">{formErrors.reason}</span>
                            )}
                </div>

            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </form>
            </div>
        );
    };
};