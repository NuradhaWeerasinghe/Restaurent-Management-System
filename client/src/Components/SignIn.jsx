import React, { Component } from 'react';
import './signIn.css'


const formValid = formErrors => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

export default class CreateBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            pass: "",
            formErrors: {
                userName: "",
                pass: "",
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "userName":
                formErrors.userName =
                    value.length < 5
                        ? "Minimum charchter must be 5"
                        : "";
                break;
            case "pass":
                formErrors.pass =
                    value.length < 8 || value.length > 30
                        ? "Password must have minimum 8 charchters"
                        : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
        this.setState({
            ...this.state,
            [name]: value
        });
    };



    render() {
        const { formErrors } = this.state;
        return (            
            <div className="container containerTop">
                <div className="row">
                    <h1 className="top"></h1>
                </div>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="shadowBoxLogin">
                            <div className="row">
                                <h3 className="h3">Sign In</h3>
                            </div>
                            <form>
                                <div class="form-group textbox">
                                    <label for="name" className="label">User Name : </label>
                                    <div class="input-group  position-relative">
                                        <div class="input-group-addon">
                                            <i class="fas fa-user icon"></i> 
                                        </div>
                                        <input type="text" className="form-control" id="userName" name="userName" placeholder="Shelin Kula..." onChange={this.handleInputChange} required />
                                    </div>
                                </div> 
                                <div class="form-group textbox">
                                    <label for="name" className="label">Password : </label>
                                    <div class="input-group  position-relative">
                                        <div class="input-group-addon">
                                            <i class="fas fa-key icon"></i>
                                        </div>
                                        <input type="password" className="form-control position-relative" id="pass" name="pass" placeholder="************"  onChange={this.handleInputChange} required />
                                    </div>
                                </div>                                
                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="form-group btndriver col-6">
                                        <div className="form-group signin" style={{ marginTop: '15px' }}>
                                            <button type="submit" className="btn btn-outline-success">Sign In</button>&nbsp;&nbsp;                                            
                                        </div>
                                    </div>
                                    <div className="col-3"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
        )
    }
}