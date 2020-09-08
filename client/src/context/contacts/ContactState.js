import React, {useReducer} from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState=props=> {
    const initialState={
        contacts: [],
        current: null,
        filteredContacts: null,
        errors: null,
        loading: true
    }
    const [state, dispatch]=useReducer(contactReducer, initialState);

    //get contacts
    const getContacts=async ()=> {
        try {
            const res=await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data});
        } catch(err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    //add contact
    const addContact=async contact=> {
        const config={
            headers: {
                "Content-Type":"application/json"
            }
        }
        try {
            const res=await axios.post("/api/contacts", contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data});
        } catch(err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }
    //delete contact
    const deleteContact=async (id)=> {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch(err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    //Update current contact 
    const updateContact=async (contact)=> {
        const config={
            headers: {
                "Content-Type":"application/json"
            }
        }
        try {
            const res=await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.data})
        } catch(err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    } 
    //set current contact
    const setCurrent=(contact)=> {
        dispatch({ type: SET_CURRENT, payload: contact})
    }
    //clear current contact
    const clearCurrent=()=> {
        dispatch({ type: CLEAR_CURRENT })
    }
    
    //filter contacts
    const filterContacts=(text)=> {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    //clear contacts
    const clearFilter=()=> {
        dispatch({ type: CLEAR_FILTER })
    }
    //clear contacts
    const clearContacts=()=> {
        dispatch({ type: CLEAR_CONTACTS });
    }

    return(
        <contactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filteredContacts: state.filteredContacts,
            errors: state.errors,
            loading: state.loading,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            { props.children }
        </contactContext.Provider>
    )
}
export default ContactState;
