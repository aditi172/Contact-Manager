import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contacts/contactContext';

const Navbar = ({ title }) => {
    const authContext=useContext(AuthContext);
    const contactContext=useContext(ContactContext);
    const { logout, isAuthenticated, user }=authContext;
    const { clearContacts } =contactContext;

    const onLogout=()=> {
        logout();
        clearContacts();
    }
    const authLinks=(
        <Fragment>
            <li className="text-flash-message-success">Hello { user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#">
                    <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks=(
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
               <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )
    return (
           <nav className="navbar bg-dark" style={{padding: "1rem 2rem"}}>
               <h2>
                    <i className="far fa-address-book"></i>
                    {title} 
               </h2>  
               <ul>
                   {isAuthenticated? authLinks: guestLinks}
               </ul>    
           </nav> 
    )
}
export default Navbar;
