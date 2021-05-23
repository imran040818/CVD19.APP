import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function PatientSearch(props) {
  return (
    <TextField id="standard-basic" label="Search by patient name" onChange={(e) => {
      props.onSearch(e.currentTarget.value)
    }} style={{width:'100%'}}/>
  );
}