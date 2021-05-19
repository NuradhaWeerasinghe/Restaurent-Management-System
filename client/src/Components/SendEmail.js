import React, { Component , useState } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com';

import validator from 'validator'


export default function AppEmail(){

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('gmail', 'template_f1gfu4f', e.target, 'user_ylR5ur9s2EgeAYqcAd9HJ')
          .then((result) => {
              console.log(result.text);
              alert("You email is sent successfully");
          }, (error) => {
              console.log(error.text);
              alert("Check your details again");
          });
    }
  
      const [emailError, setEmailError] = useState('')
      const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
          setEmailError('Valid Email')
        } else {
          setEmailError('Enter valid Email')
        }
      }

    return(  

      <div class="row">
           <div  className="col-md-6">
           <div className="shadowBox">
           <h6 className="h3 mb-3 font-weight-normal">Inform the supplier</h6>
    <div className="container">
      <div style={{ marginTop: "5%"}}>
    
      <form onSubmit={sendEmail}>
    
      <div class="form-group" style={{marginBottom:'15px'}}>
        <label style={{marginBottom:'5px'}}>Supplier Name</label>  
        <input name="name" type="text" class="form-control" placeholder="Enter Name"/>
      </div>
    
      
      <div class="from-group" style={{marginBottom:'15px'}}>
        <label style={{marginBottom:'5px'}}>Email Address</label>
        <input name="email" type="email" class="form-control" placeholder="Enter Email" onChange={(e) => validateEmail(e)}/>
        <span style={{color: 'red',}}>{emailError}</span>
      </div>

    
      <div class="form-group" style={{marginBottom:'15px'}}>
        <label style={{marginBottom:'5px'}}>Message</label> 
        <textarea name="message" class="form-control" placeholder="Enter Your Message"></textarea>
      </div>
    
      
      <button type="submit" class="btn btn-outline-primary"><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Send Email</button>
      </form>
    
      </div>
    </div>
    </div>
    </div>

    <div  className="col-md-6"> 
    <img src="/Images/emails.png"  alt="inventory" style={{height:'400px' , width:'500px', marginTop:'100px'}}/>
    </div>

    
    
    </div>
    );
}
