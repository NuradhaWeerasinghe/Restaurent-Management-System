
import React, {Component} from 'react';
import axios from 'axios';
import './footer.css';


export default class Footer extends Component{
    

    render(){
      
        return(
            <div className="footer">
                <footer>
  <div class="container">
    <div class="row">
      
     
      
      <div >
        <center>
        <img className="logoh" src="../images/logo1.png" />
        </center>
      </div>
      
    </div>
  </div>
  <div class="copyright text-center">
    Copyright &copy; 2017 <span>Your Template Name</span>
  </div>
</footer>
            </div>
        )
    }
}