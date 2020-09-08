import React, {useReducer} from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT,
} from '../types';

const AlertState=props=> {
    const initialState=[];
    const [state, dispatch]=useReducer(alertReducer, initialState);

    //set Alerts
    const setAlerts=(msg, type)=> {
        const id=Math.floor((Math.random() * 100) + 1);
        dispatch({ type: SET_ALERT, payload: { msg, type, id}});
        setTimeout(()=> dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
    }
    return(
        <alertContext.Provider value={{
           alerts: state,
           setAlerts,
        }}>
            { props.children }
        </alertContext.Provider>
    )
}
export default AlertState;
