import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

export default (state, action)=> {
    switch(action.type) {
        case ADD_CONTACT: return {
            ...state,
            contacts: [action.payload,...state.contacts],
            loading: false
        }
        case GET_CONTACTS: return {
            ...state,
            contacts: action.payload,
            loading: false
        }
        case UPDATE_CONTACT: return{
            ...state,
            contacts: state.contacts.map(contact=> contact._id===action.payload._id? action.payload: contact),
            loading: false
        }
        case DELETE_CONTACT: return{
            ...state,
            contacts: state.contacts.filter(contact=> contact._id!==action.payload),
            loading: false
        }
        case SET_CURRENT: return{
            ...state,
            current: action.payload
        }
        case CLEAR_CURRENT: return{
            ...state,
            current: null
        }
        case FILTER_CONTACTS: return{
            ...state,
            filteredContacts: state.contacts.filter(contact=> {
                // console.log((action.payload));
                const regex= new RegExp((action.payload), 'gi');
                return (contact.name.match(regex) || contact.email.match(regex));
            })
        }
        case CLEAR_FILTER: return{
            ...state,
            filteredContacts: null
        }
        case CONTACT_ERROR: return {
            ...state,
            errors: action.payload
        }
        case CLEAR_CONTACTS: return {
            ...state,
            contacts: null,
            filteredContacts: null,
            error: null,
            current: null
        }
        default: return(state);
    }
}