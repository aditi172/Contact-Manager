import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from "../../context/contacts/contactContext";

const ContactFilter = () => {
    const contactContext=useContext(ContactContext);
    const text=useRef("");
    const { filteredContacts, filterContacts, clearFilter } =contactContext;

    useEffect(()=> {
        if(filteredContacts===null) {
            text.current.value="";
        }
    })

    const onChange=e=> {
        if(text.current.value !== "") {
            filterContacts(e.target.value)
        } else {
            clearFilter();
        }
    }
    const onSubmit=e=> {
        e.preventDefault();
    }
    return (
        <form onSubmit={onSubmit}>
            <input ref={text} placeholder="Search Contacts..." type="text" onChange={onChange} ></input>
        </form>
    )
}
export default ContactFilter;