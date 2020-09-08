import React, { useContext } from 'react'
import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({contact}) => {
    const contactContext=useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } =contactContext;
    const { _id, name, phone, type, email }=contact;
    const onDelete=()=> {
        deleteContact(_id);
        clearCurrent();
    }
    return (
        <div className="card bg-light">
            <h4 className="text-primary text-left">{name}
            {' '}<span style={{float: "right"}} className={"badge "+(type==="professional"?"badge-success":"badge-blue")}>
            {type.charAt(0).toUpperCase()+type.slice(1)}</span>
            </h4>
            <ul>
                {email && <li>
                <i className="fas fa-envelope"></i>{" "}{email}</li>}
                {phone && <li>
                <i className="fas fa-phone"></i>{" "}{phone}</li>}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={()=> setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}
export default ContactItem;
