import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addDailyDiagnosis, updateDailyDiagnosis } from '../../../../actions/dailyDiagnosis';

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DailyDiagnosis(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {tokenId,loggedInUser} = useSelector(state => state.auth);
    const [dailyDiagnosis, setDailyDiagnosis] = useState( props.data );
    const changeHandler = (key,value)=>{
        const updatedailyDiagnosis = dailyDiagnosis;   
        updatedailyDiagnosis[key]=value;   
        setDailyDiagnosis({...updatedailyDiagnosis});
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(dailyDiagnosis.Id === null || dailyDiagnosis.Id === undefined){
          dispatch(addDailyDiagnosis(dailyDiagnosis,tokenId));
          } else {
            dailyDiagnosis.UserModified=loggedInUser;
            dispatch(updateDailyDiagnosis(dailyDiagnosis,tokenId));
          }
    }
  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField id="DiagnosisDate*" label="DiagnosisDate" type="datetime-local" defaultValue={dailyDiagnosis.DiagnosisDate ?? '0000-00-00'} 
        className={classes.textField} InputLabelProps={{shrink: true}} onChange={(e)=>changeHandler('DiagnosisDate',e.currentTarget.value)}/>

        <TextField id="Spo2" label="Spo2" value={dailyDiagnosis.Spo2?.trim()} onChange={(e)=>changeHandler('Spo2',e.currentTarget.value)}/>
        <TextField id="Temp" label="Temp" value={dailyDiagnosis.Temp?.trim()} onChange={(e)=>changeHandler('Temp',e.currentTarget.value)}/>
        <TextField id="O2Needed" label="O2Needed" value={dailyDiagnosis.O2Needed?.trim()} onChange={(e)=>changeHandler('O2Needed',e.currentTarget.value)}/>
        <TextField id="BMP" label="BMP" value={dailyDiagnosis.BMP?.trim()} onChange={(e)=>changeHandler('BMP',e.currentTarget.value)}/>
        <TextField id="Weight" label="Weight" value={dailyDiagnosis?.Weight.trim()} onChange={(e)=>changeHandler('Weight',e.currentTarget.value)}/>
        <TextareaAutosize
        id="Medicine" rowsMin={5} aria-label="Medicine" placeholder="Medicine" defaultValue={dailyDiagnosis.Medicine} onChange={(e)=>changeHandler('Medicine',e.currentTarget.value)}/>
     
     <TextareaAutosize
        id="Advice" rowsMin={5} aria-label="Advice" placeholder="Advice" defaultValue={dailyDiagnosis.Advice} onChange={(e)=>changeHandler('Advice',e.currentTarget.value)}/>
     
     <TextField id="Cpr" label="CRP" value={dailyDiagnosis.Cpr} onChange={(e)=>changeHandler('Cpr',e.currentTarget.value)}/>
        <TextField id="Ddimer" label="Ddimer" value={dailyDiagnosis.Ddimer} onChange={(e)=>changeHandler('Ddimer',e.currentTarget.value)}/>

        <TextareaAutosize
        id="Other" rowsMin={5} aria-label="Other" placeholder="Other" defaultValue={dailyDiagnosis.Other} onChange={(e)=>changeHandler('Other',e.currentTarget.value)}/>
     
        <TextareaAutosize
        id="Remark" rowsMin={5} aria-label="Remark" placeholder="Remark" defaultValue={dailyDiagnosis.Remark} onChange={(e)=>changeHandler('Remark',e.currentTarget.value)}/>

        <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
    </form>
  );
}