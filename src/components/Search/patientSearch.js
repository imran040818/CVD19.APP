import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_SEARCH, CLEAR_SEARCH_PATIENT} from '../../actions/actionConstants';


export default function PatientSearch(props) {
  
const {patient} = useSelector(state=>state);  
const dispatch = useDispatch();

const handleChange = (name) =>{
    dispatch({ type:SET_SEARCH, payload: name});
    if(name.length%3 === 0 && name.length !== 0){
      props.onSearch(name);
    }
    
    if(name === "" || name === " "){
        dispatch({
            type:CLEAR_SEARCH_PATIENT
        });
    }
  }

  return (
    <TextField id="standard-basic" label="Search by patient name" 
    onChange={(e)=> handleChange(e.currentTarget.value)}
    value={patient.searchText}
    style={{width:'100%'}}/>
  );
}