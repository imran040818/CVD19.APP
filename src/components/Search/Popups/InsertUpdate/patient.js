import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPatientData, updatePatientData } from '../../../../actions/patient';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    overflowY:'scroll',
    overflowX:'hidden',
    height:400,
    paddingLeft:10,
    paddingRight:20
  },
}));

export default function Patient(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {tokenId,loggedInUser} = useSelector(state => state.auth);
    const [patient, setPatient] = useState( props.data );
    const changeHandler = (key,value)=>{
        const updatePatient = patient;   
        updatePatient[key]=value;   
        setPatient({...updatePatient});
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        //console.log(e);
        if(patient.Id === null || patient.Id === undefined){
        dispatch(addPatientData(patient,tokenId));
        } else {
          patient.UserModified=loggedInUser;
          dispatch(updatePatientData(patient,tokenId));
        }
    }
  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField id="name" label="Name*" value={patient.Name} onChange={(e)=>changeHandler('Name',e.currentTarget.value)}/>
        <TextField id="age" label="Age*" value={patient.Age} onChange={(e)=>changeHandler('Age',e.currentTarget.value)}/>
        <FormLabel component="legend">Gender*</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={patient.Sex?.toString()} onChange={(e)=>changeHandler('Sex',e.currentTarget.value)}>
            <FormControlLabel value="2" control={<Radio />} label="Female" />
            <FormControlLabel value="1" control={<Radio />} label="Male" />
            <FormControlLabel value="3" control={<Radio />} label="Other" />
        </RadioGroup>
        <TextField id="relationOf" label="S/O D/O H/O*" value={patient.RelationOf} onChange={(e)=>changeHandler('RelationOf',e.currentTarget.value)}/>
        <TextField id="village" label="Village*" value={patient.Village} onChange={(e)=>changeHandler('Village',e.currentTarget.value)}/>
        <TextField id="district" label="District*" value={patient.District}  onChange={(e)=>changeHandler('District',e.currentTarget.value)}/>
        <TextField id="mobile" label="Mobile No" value={patient.MobileNo} onChange={(e)=>changeHandler('MobileNo',e.currentTarget.value)}/>
        <TextField id="altmobile" label="Alt Mobile No" value={patient.AltMobileNo} onChange={(e)=>changeHandler('AltMobileNo',e.currentTarget.value)}/>
        <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
    </form>
  );
}