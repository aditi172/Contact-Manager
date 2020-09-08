import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
    const contactContext=useContext(ContactContext);
    const { current, addContact, clearCurrent, updateContact }=contactContext;
    useEffect(()=> {
        if(current!==null) {
            setContacts(current);
        } else {
            setContacts({
                name: '',
                phone: '',
                email: '',
                type: 'personal'
            });
        }
    }, [contactContext, current])
    const [contacts, setContacts]=useState({
        name: '',
        phone: '',
        email: '',
        type: 'personal'
    });
    const clearAll=()=> {
        clearCurrent();
    }
    const onChange=e=> setContacts({...contacts, [e.target.name]: e.target.value})
    const onSubmit=e=> {
        e.preventDefault();
        if(current===null) {
            addContact(contacts);
        } else {
            updateContact(contacts);
        }
        setContacts({
            name: '',
            phone: '',
            email: '',
            type: 'personal'
        });
    }

    const { name, phone, email, type}=contacts;
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? "Edit Contact": "Add Contact"}</h2>
            <input type="text" name="name" value={name} placeholder="Name" onChange={onChange}></input>
            <input type="email" name="email" value={email} placeholder="Email" onChange={onChange}></input>
            <input type="text" name="phone" value={phone} placeholder="Phone" onChange={onChange}></input>
            <h4>Contact Type:</h4>
            <input type="radio" name="type" value="personal" checked={type==="personal"} onChange={onChange}></input>{" "}Personal{" "}
            <input type="radio" name="type" value="professional" checked={type==="professional"} onChange={onChange}></input>{" "}Professional{" "}
            <div>
                <input type="submit" value={current ? "Update Contact": "Add Contact"} className="btn btn-primary btn-block"></input>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}
export default ContactForm;