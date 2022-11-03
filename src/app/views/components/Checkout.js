import React, { Fragment, useState, useEffect, useContext } from 'react';
import { UserProfileContext } from "../../lib/UserProfileContext"
import { Link } from "react-router-dom";
import "../../styles/App.css";

export const Checkout = () => {
    const [isValid, setValid] = useState(false)
    const value = useContext(UserProfileContext)
    const {
        firstName, 
        lastName, 
        email, 
        address, 
        zipCode, 
        city, 
        setUserProfileContext,
    } = value
    const validate = () => {
        let errors = []
        const inputs = document.querySelectorAll(".form-control")
        inputs.forEach(input => {
            !input.value ? errors.push(input) : errors.length && errors.pop()//retirer si il est faux
        })
        console.log(errors)
        setValid(!errors.length) //!errors.length: on a rien
    }

    useEffect(() => {
        validate()
    })

    return (
      <Fragment>
        <div className="col-sm-6 offset-3">
          <h2>Checkout</h2>
          <br />
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  property=""
                  name="firstName"
                  defaultValue={firstName} 
                  onChange={e =>  setUserProfileContext({ [e.target.name]: e.target.value})}/>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  property=""
                  name="lastName"
                  defaultValue={lastName}
                 onChange={e => {
                     setUserProfileContext({ [e.target.name]: e.target.value})
                 }}/>
              </div>
            </div>
            <br />
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email address"
                property=""
                name="email"
                defaultValue={email}
                onChange={e => setUserProfileContext({ [e.target.name]: e.target.value})}/>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Address"
                property=""
                name="address"
                defaultValue={address} 
                onChange={e => setUserProfileContext({ [e.target.name]: e.target.value})}/>
            </div>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  name="zipCode"
                  property=""
                  defaultValue={zipCode}
                  onChange={e => setUserProfileContext({ [e.target.name]: e.target.value})}/>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  property=""
                  defaultValue={city}
                  onChange={e => setUserProfileContext({ [e.target.name]: e.target.value})}/>
              </div>
            </div>
            <br />
         
            <Link to="/delivery" className={`${ !isValid && 'disabled'} white btn btn-light btn-lg btn-block bg-crimson checkout `}>
                Confirm
            </Link>
          </form>
        </div>
      </Fragment>
    );
}