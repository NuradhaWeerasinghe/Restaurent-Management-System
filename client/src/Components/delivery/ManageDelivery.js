import './stylesDelivery.css'
import { Link } from "react-router-dom";

export default function ManageDelivery() {





return (
    <div className="container containerTop">
        <div className="row heading">
            <div className="col">
                <h3>Delivery Management</h3>
                <hr  style={{height:'3px' , color:'#0a90e8'}}/>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row ">
                <div className="col-4 d-flex justify-content-center">
                    <div className="card" style={{width: '20rem'}}>
                        <img className="card-img-top" src="images/img2.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Manage Driver</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div className="view d-flex justify-content-center">
                                <Link className="btn button btn-primary text-center" to="/display_driver">View &raquo;</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4 d-flex justify-content-center">
                    <div className="card" style={{width: '20rem'}}>
                        <img className="card-img-top" src="images/img1.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Manage Vehicle</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div className="view d-flex justify-content-center">
                                <Link className="btn button btn-primary text-center" to="/display_vehicle">View &raquo;</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4 d-flex justify-content-center">
                    <div className="card" style={{width: '20rem'}}>
                        <img className="card-img-top" src="images/img3.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Manage Delivery</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div className="view d-flex justify-content-center">
                                <Link className="btn button btn-primary text-center" to="/EditOrderStatus">View &raquo;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}