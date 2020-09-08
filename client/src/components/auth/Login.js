import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/Alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    const alertContext= useContext(AlertContext);
    const authContext=useContext(AuthContext);
    const { setAlerts } = alertContext;
    const { login, clearErrors, error, isAuthenticated } = authContext;

    useEffect(()=> {
        if(isAuthenticated) {
            props.history.push("/");
        }
        if(error==="Invalid User Credentials...") {
            setAlerts(error, "danger");
            clearErrors();
        }
        //eslint-disable-next-line
    },[error, isAuthenticated, props.history])

    const [user, setUser]=useState({
        email: "",
        password: ""
    });

    const { email, password }=user;

    const onChange=(e)=> {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const onSubmit=(e)=> {
        e.preventDefault();
        if(email===''|| password==='') {
            setAlerts("Please enter in all details", "alert-danger");
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary"> Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" value={email} onChange={onChange} type="email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" value={password} onChange={onChange} type="password"></input>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"></input>
            </form>
        </div>
    )
}

export default Login;