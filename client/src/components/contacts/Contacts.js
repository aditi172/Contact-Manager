import React, { useContext, useEffect } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext=useContext(ContactContext);
    const { contacts, filteredContacts, getContacts, loading } =contactContext;
    useEffect(()=> {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if(contacts!==null && contacts.length===0 && !loading) {
        return(<h4>Please add some Contacts...</h4>)
    }
    
    return (
        <div>
            {contacts!==null && !loading ? (
                <TransitionGroup>
                {filteredContacts !== null ? filteredContacts.map(contact=>(
                    <CSSTransition key={contact.id} timeout={500} classNames="item">
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                )) :
                contacts.map(contact=>(
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            ):(<Spinner></Spinner>)}
        </div>
    )
}
export default Contacts;
