import React, {Component} from 'react';
import axios from 'axios';
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './stylesDelivery.css'

const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};


export default class UpdateVehicle extends Component{

    
    constructor(props){
        super(props);
        this.state={
			drivers:[],	
            vehicleNo:"",
            modelName:"",
			type:"",
            owner:"",
            registerDate: new Date(),
			formErrors: {
                modelName: "",
                type: "",
                owner: ""
			}
        	};
    	}

    handleInputChange=(e)=>{
        const{name,value} = e.target;	
		let formErrors = this.state.formErrors;
        switch(name){
			case "modelName":
				formErrors.modelName=
				value.length < 5 || value.length > 20
				?"Model name must have characters between 5 to 20"
            	:"";
				break;
				case "type":
					formErrors.type =
					value.length < 1
					?"Please select the corect type"
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

    retrieveDrivers(){
        axios.get("http://localhost:8000/display_driver").then(res =>{
          if(res.data.success){
            this.setState({
              drivers:res.data.existingDrivers
            });
            console.log(this.state.drivers)
          }
        });
      } 

    onSubmit = (e) =>{
        e.preventDefault();
		if(!formValid(this.state.formErrors)){
			console.error("FORM INVALID-DISPLAY ERROR");
		}
		const id = this.props.match.params.id;
		const {vehicleNo,modelName,type,owner,registerDate}=this.state;
		const data ={
			vehicleNo:vehicleNo,
			modelName:modelName,
			type:type,
			owner:owner,
			registerDate:registerDate
        }

        //console.log(data)
        axios.put(`http://localhost:8000/vehicle/update_vehicle/${id}`,data).then((res)=>{
            if(res.data.success){
                toast.info("Vehicle Update Successfully !");
                this.setState(
                    {
                        vehicleNo:"",
                        modelName:"",
                        type:"",
                        owner:"",
                        registerDate: new Date()
                    }
                )
            }else{
                toast.error("You have an Error in updating");
            }
        });
    };


    componentDidMount(){
		this.retrieveDrivers();
		const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/vehicle/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    vehicleNo:res.data.vehicle.vehicleNo,
                    modelName:res.data.vehicle.modelName,
                    type:res.data.vehicle.type,
                    owner:res.data.vehicle.owner,
                    registerDate:res.data.vehicle.registerDate
                });
                console.log(this.state.vehicle);
            }
        })
    }
    

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
                        <h2>Update Vehicle</h2>
						<ToastContainer/>
                    </div>
                    <div className="col-3 position-relative"></div>
                    <hr className="hr" style={{height:'2px' , color:'#0a90e8'}}/>                                
                </div>      				

				<div className="row">
					<div className="col-5">
						<img src="/images/background.png" alt="delivery vehicle" style={{height:'350px' , width:'420px', marginTop:'100px'}}/>
					</div>
					<div className="col-7">
						<div className="shadowBox">
							<form onSubmit={this.onSubmit}>
								<div className="form-row">
									<div className="form-group col" style={{marginTop:'15px'}}>
										<label for="vnumber">Vehicle No : </label>
										<input type="text" readOnly className="form-control" id="vNo" name="vehicleNo" placeholder="Enter vehicle number" value={this.state.vehicleNo} onChange={this.handleInputChange} required/>
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
											<span style={{color:'red'}} className="errorMessage">{formErrors.type}</span>
										)}  
									</div>                
									<div className="form-group col-8 position-relative"  style={{marginTop:'15px'}}>
										<label for="model">Model Name : </label>
										<input type="text" className="form-control" id="mName" name="modelName" placeholder="Enter model name" value={this.state.modelName} onChange={this.handleInputChange} required/>                        						  
										{formErrors.modelName.length > 6  &&(
											<span style={{color:'red'}} className="errorMessage">{formErrors.modelName}</span>
										)}
									</div>									
								</div>
                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <label for="owner">Owner Name : </label>
                                    <select id="owner" className="form-control" name="owner" onChange={this.handleInputChange} value={this.state.owner} disabled>
                                    <option selected>Select driver</option>  
                                    {this.state.drivers.map((drivers) => (
                                        <option value={drivers.name} required>{drivers.name}</option>  
                                    ))}
                                    </select>
                                </div>
								<div className="form-row">
									<div className="form-group col"  style={{marginTop:'15px'}}>
										<label for="owner">Register Date : </label>
										<input type="datetime-local" readOnly className="form-control" id="regdate" name="registerDate" value={this.state.registerDate} onChange={this.handleInputChange} required/>					  
									</div>                        		
								</div>
								<div className="row">
									<div className="form-group btndriver col-12">
										<div class="d-grid  col-5 mx-auto">
											<button type="submit" className="btn btn-success" ><i className="fas fa-sync-alt"></i>&nbsp;Update</button>&nbsp;&nbsp;
                                        	<a href="/display_vehicle" className="btn btn-danger"><i className="fas fa-times"></i>&nbsp;&nbsp;Cancel</a>											
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