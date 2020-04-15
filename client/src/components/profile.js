import React, { Component } from 'react';
import "../styles/profile.css";
import axios from 'axios';
import { Switch, Route } from "react-router-dom";

const streetRegEx = RegExp(/^\d+\w*\s*(?:(?:[\-\/]?\s*)?\d*(?:\s*\d+\/\s*)?\d+)?\s+/)

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    (val.length > 0 && (valid=false));
  });

  return valid;
};

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        firstName:null,
        lastName:null,
        email:null,
        password:null,
        homeAddress:null,
        nickName:null,
        
        formErrors: {
          firstName:"",
          lastName:"",
          email:"",
          password:"",
          homeAddress:"",
          nickName:""
          }
        };
      }
      
      handleSubmit = e => {
        e.preventDefault();
    
      if(formValid(this.state.formErrors)) {
        console.log(`
        --SUBMITTING--
        First Name : ${this.state.firstName}
        Last Name : ${this.state.lastName}
        Email: ${this.state.email}
        Password : ${this.state.password}
        Address : ${this.state.homeAddress}
        nickName : ${this.state.nickName}
        `);
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
    };
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
    
        switch(name) {
          case 'firstName':
            formErrors.firstName = 
            value.length < 2 
            ? '2 character minimum' 
            : "";
            break;
          case 'lastName':
            formErrors.lastName = 
            value.length < 2  
            ? '2 character minimum' 
            : "";
            break;
          case 'email':
            formErrors.email = 
            value.length > 7  
            ? '' 
            : "invalid email address";
            break;
          case 'password':
            formErrors.password = value.length < 6  
            ? '6 character minimum' 
            : "";
            break;
          case 'homeAddress':
            formErrors.homeAddress = 
            streetRegEx.test(value)
            ? ''
            : "invalid street address";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };    
        componentDidMount() {
            axios.get('http://localhost:5000/users/')
            .then(res => {
                console.log(res);
                this.setState({ persons : res.data});
            })
        }
    
      render() {
        const { formErrors } = this.state;
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              {/* -----------------------First Name Form----------------------------*/}
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input 
                type="text" 
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              {/* -----------------------Last Name Form-----------------------------*/}
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input 
                type="text" 
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                name="lastName" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
               {/* --------------------------Email Form------------------------------*/} 
              <div className="email">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                className={formErrors.email.length > 0 ? "error" : null} 
                placeholder="Email"
                name="email" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              {/* -----------------------nickName Form----------------------------*/}
              <div className="nickName">
                <label htmlFor="nickName">Username</label>
                <input 
                type="text" 
                className={formErrors.nickName.length > 0 ? "error" : null}
                placeholder="Username"
                name="nickName" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.nickName.length > 0 && (
                  <span className="errorMessage">{formErrors.nickName}</span>
                )}
              </div>
               {/* ---------------------------Password Form---------------------------*/} 
              <div className="password">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                name="password" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              {/* -----------------------Home Address Form----------------------*/}
              <div className="homeAddress">
                <label htmlFor="homeAddress">Home Address</label>
                <input 
                type="homeAddress" 
                className={formErrors.homeAddress.length > 0 ? "error" : null}
                placeholder="Home Address"
                name="homeAddress" 
                noValidate 
                onChange={this.handleChange}
                />
                {formErrors.homeAddress.length > 0 && (
                  <span className="errorMessage">{formErrors.homeAddress}</span>
                )}
              </div>
              {/* --------------------------Button----------------------------*/}
              <div className="createAccount">
                <button className="button1"type="submit">Create Account</button>
                <small>Already have an account?</small>
              </div>
            </form>
          </div>
        </div>
        );
      }
    }

export default Profile;