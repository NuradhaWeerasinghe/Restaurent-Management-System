
import React, {Component} from 'react';
import axios from 'axios';
import './footer.css';



export default class Footer extends Component{
    

    render(){
      
        return(
          
            <div className="footer">
                <footer>
                  {/* <div class="container"> */}
                    <div class="row">
                      
                  
                      <div className="col-lg-4" >
                        <center>
                        <img className="logoh" src="../images/logo1.png" />
                        </center>
                      </div>

                      <div className="col-lg-2" >
                     
                        <h5 class="title"><i class="fas fa-grip-lines-vertical icon" ></i>&nbsp;SECURITY & PRIVACY</h5>
                        <ul class="list-unstyled">
                          <li class=""><i class="fa fa-angle-double-right"></i> Terms Of Use</li>
                          <li class=""><i class="fa fa-angle-double-right"></i> Privacy Policy</li>
                        
                   
                        </ul>
                  
                    
                   
                      </div>
                      <div className="col-lg-2" >
                     
                     <h5 class="title"><i class="fas fa-grip-lines-vertical icon" ></i>&nbsp;HELP CENTER</h5>
                     <ul class="list-unstyled">
                       <li class=""><i class="fa fa-angle-double-right"></i> Hotline</li>
                       <li class=""><i class="fa fa-angle-double-right"></i> FAQ's</li>
                       
                
                     </ul>
               
                 
                
                   </div>


                      <div className="col-lg-4" >
                        
                        <div class="social-media">
                          <ul class="list-inline">
                            <li><a href="#" title=""><i class="fa fa-facebook"></i></a></li>
                            {/* <li><a href="#" title=""><i class="fa fa-youtube"></i></a></li> */}
                            <li><a href="#" title=""><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#" title=""><i class="fa fa-google-plus"></i></a></li>
                            <li><a href="#" title=""><i class="fa fa-linkedin"></i></a></li>
                         
                          </ul>
                        </div>
                      </div>


                      
                    </div>
                  {/* </div> */}

                  <div class="copyright text-center">
                  Copyright © 2021 High Garden. All Rights Reserved
                    {/* Copyright &copy; 2021 <span>High Garden</span> */}
                  </div>
                </footer>
              </div>
        )
    }
}