import React, {Component} from 'react';
import axios from 'axios';
import './stylesDelivery.css'

const formValid = formErrors =>{
    let valid = true;
    Object.values(formErrors).forEach(val => {val.length > 0 && (valid = false);
    });
    return valid;
};

export default class AddVehicle extends Component{
	
    constructor(props){
        super(props);
        this.state={			
            vehicleNo:"",
            modelName:"",
			type:"",
            owner:"",
            registerDate: new Date(),
			formErrors:{
                vehicleNo:"",
				modelName:"",
				type:"",
				owner:""
            }
        }
    }

    handleInputChange=(e)=>{
        const{name,value} = e.target;
		let formErrors = this.state.formErrors;
        switch(name){
            case "vehicleNo":
            formErrors.vehicleNo=
            value.length < 5 || value.length > 5
            ?"Minimum character must be 5"
            :"";
            break;
			case "modelName":
				formErrors.modelName=
				value.length < 6
				?"Name must have minium 5 character"
            	:"";
				break;
				case "type":
					formErrors.type =
					value.length < 1
					?"Please select the corect type"
					:"";
					break;
					case "owner":
						formErrors.owner =
						value.length < 5 || value.length > 30
						?"Name must have characters between 5 and 30"
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
		if(!formValid(this.state.formErrors)){
			console.error("FORM INVALID-DISPLAY ERROR");
		}
		const {vehicleNo,modelName,type,owner,registerDate}=this.state;
		const data ={
			vehicleNo:vehicleNo,
			modelName:modelName,
			type:type,
			owner:owner,
			registerDate:registerDate
		}

    //console.log(data)
    axios.post("http://localhost:8000/vehicle/add_vehicle",data).then((res)=>{
        if(res.data.success){
            alert("Add new Vehicle")
            this.setState(
                {
                    vehicleNo:"",
                    modelName:"",
                    type:"",
                    owner:"",
                    registerDate:new Date()
                }
            )
        };
    });
};

	render(){
		const {formErrors}= this.state;
		return (			
			<div className="container containerTop">		
				<div className="row">
					<h1 className="top"></h1>
				</div>	
                <div className="row">
					<div className="col-1"><h3><i class="fas fa-motorcycle"></i></h3></div>
                    <div className="col-8 position-relative">
                        <h2>Add New Vehicle</h2>
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{height:'2px' , color:'#0a90e8'}}/>                                
                </div>      				

				<div className="row">
					<div className="col-4">
						<img src="images/background.png" alt="delivery vehicle" style={{height:'250px' , width:'320px', marginTop:'100px'}}/>
					</div>
					<div className="col-8">
						<div className="shadowBox">
							<form onSubmit={this.onSubmit}>
								<div className="form-row">
									<div className="form-group col" style={{marginTop:'15px'}}>
										<label for="vnumber">Vehicle No : </label>
										<input type="text" className="form-control" id="vNo" name="vehicleNo" placeholder="Enter vehicle number" value={this.state.vehicleNo} onChange={this.handleInputChange} required/>
										{formErrors.vehicleNo.length < 5 ||formErrors.vehicleNo.length > 5   &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.vehicleNo}</p>
										)}
									</div>
								</div>
								<div className="row">
									<div className="form-group col-4 position-relative" style={{marginTop:'15px'}}>
										<label for="type"> Vehicle Type : </label>
										<select id="type" className="form-control" name="type" onChange={this.handleInputChange} value={this.state.type} required>
											<option selected>Choose type...</option>
											<option value="Light motor cycles">Light motor cycles</option>
											<option value="Motorcycles">Motorcycles</option>
											<option value="Motor Tricycle">Motor Tricycle</option>
											<option value="Light Motor Lorry">Light Motor Lorry</option>
										</select>
										{formErrors.type.length < 1  &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.type}</p>
										)}       
									</div>                
									<div className="form-group col-8 position-relative"  style={{marginTop:'15px'}}>
										<label for="model">Model Name : </label>
										<input type="text" className="form-control" id="mName" name="modelName" placeholder="Enter model name" value={this.state.modelName} onChange={this.handleInputChange} required/>                        						  
										{formErrors.modelName.length > 6  &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.modelName}</p>
										)}										
									</div>									
								</div>
								<div className="form-row">
									<div className="form-group col"  style={{marginTop:'15px'}}>
										<label for="owner">Owner Name : </label>
										<input type="text" className="form-control" id="owner" name="owner" placeholder="Enter owner name" value={this.state.owner} onChange={this.handleInputChange} required/>					  
										{formErrors.owner.length > 5  &&(
											<p style={{color:'red'}} className="errorMessage">{formErrors.owner}</p>
										)}
									</div>                        		
								</div>
								<div className="form-row">
									<div className="form-group col"  style={{marginTop:'15px'}}>
										<label for="owner">Register Date : </label>
										<input type="datetime-local" readOnly className="form-control" id="regdate" name="registerDate" value={this.state.registerDate} onChange={this.handleInputChange} required/>					  
									</div>                        		
								</div>
								<div className="row">
									<div className="form-group btndriver col-12"  style={{marginTop:'15px'}}>
										<div className="form-group col"  style={{marginTop:'15px'}}>	              		
											<button type="submit" className="btn btn-success" ><i className="far fa-save"></i>&nbsp;Save</button>&nbsp;&nbsp;
											<button type="reset" className="btn btn-primary"><i class="fas fa-eraser"></i>&nbsp;Clear</button>	              			
										</div>
										<div className="form-group col"  style={{marginTop:'15px'}}>
										<a href="/display_vehicle" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;Cancel</a>
										</div>              			
									</div>
									<div className="col-6"></div>
								</div>
							</form>
						</div> 
					</div>					
				</div> 
			</div>
		)				
	}
}