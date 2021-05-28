import React, { Component } from 'react';
import axios from 'axios';

export default class EditRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaveType: "",
            // from:Date,
            // to:Date,
            reason: ""

        };
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const { leaveType, reason } = this.state;
        const data = {
            leaveType: leaveType,
            // from:from,
            // to:to,
            reason: reason
        }
        //console.log(data)
        axios.put(`http://localhost:8000/recod/update/${id}`, data).then((res) => {
            if (res.data.success) {
                alert("Successfully update Record")
                this.setState(
                    {
                        leaveType: "",
                        // from:Date,
                        // to:Date,
                        reason: ""
                    }
                )
            };
        });
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/record/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    leaveType: res.data.record.leaveType,
                    // from:res.data.record.from,
                    // to:res.data.record.to,
                    reason: res.data.record.reason,
                });
                console.log(this.state.record);
            }
        })
    }
    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto" style={{
                borderRadius: '5px',
                backgroundColor: '#f2f2f2',
                padding: '20px',
                width: '40%',
                fontFamily: 'sans-serif',
                boxShadow: '0 1px 56px -26px #000'

            }}>
                <center><h1 className="h3 mb-3 font-weight-normal">Update Requested Leaves</h1></center>
                <form  >
                    <div className="form-group col-4 position-relative" style={{ marginTop: '15px' }}>
                        <label for="type"> Leave Type : </label>
                        <select id="type" className="form-control" name="leaveType" onChange={this.handleInputChange} value={this.state.leaveType} required>
                            <option selected>Choose type...</option>
                            <option value="Casual">Casual</option>
                            <option value="Medical">Medical</option>
                            <option value="Half-Day">Half-Day</option>
                        </select>
                    </div>
                    {/* 
                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>From</label>
                <input type="date"
                className="form-control"
                name="from"
                value={this.state.from}
                onChange={this.handleInputChange}/>
                </div> */}

                    {/* <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px'}}>To</label>
                <input type="date"
                className="form-control"
                name="to"
                value={this.state.to}
                onChange={this.handleInputChange}/>
                </div> */}

                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ marginBottom: '5px' }}>Reason</label>
                        <input type="text"
                            className="form-control"
                            name="reason"
                            placeholder="Dear Mr./Ms.

                I would like to formally request a leave for .............."
                            value={this.state.reason}
                            onChange={this.handleInputChange} />
                    </div>
                    <center>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" className="btn btn-primary sub_btn" onClick={this.onSubmit}>Update</button>
                        </div>
                    </center>
                </form>
            </div>
        )
    }
}