import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/Alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext= useContext(AlertContext);
    const authContext=useContext(AuthContext);
    const [user, setUser]=useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const { setAlerts } = alertContext;
    const { register, clearErrors, error, isAuthenticated } = authContext;
    const { name, email, password, cpassword }=user;

    useEffect(()=> {
        if(isAuthenticated) {
            props.history.push("/");
        }
        if(error==="The User already exists...") {
            setAlerts(error, "danger");
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onChange=(e)=> {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit=(e)=> {
        e.preventDefault();
        if(name===''|| email===''|| password===''|| cpassword==='') {
            setAlerts("Please enter all the details", "danger");
        } else if(password!==cpassword) {
            setAlerts("Passwords dont match", "danger");
        } else {
            register({
                name,
                email, 
                password
            });
            console.log("registered user");
        }
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary"> Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input name="name" value={name} onChange={onChange} type="text"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" value={email} onChange={onChange} type="email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" value={password} onChange={onChange} type="password" minLength="6"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Name</label>
                    <input name="cpassword" value={cpassword} onChange={onChange} type="password" minLength="6"></input>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"></input>
            </form>
        </div>
    )
}

export default Register;