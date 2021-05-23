import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addAdmission, updateAdmission } from '../../../../actions/admission';

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

export default function Admission(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {tokenId,loggedInUser} = useSelector(state => state.auth);
    const [admission, setAdmission] = useState( props.data );
    const changeHandler = (key,value)=>{
        const updateadmission = admission;   
        updateadmission[key]=value;   
        setAdmission({...updateadmission});
    }
    const onSubmit = (e) =>{ 
        e.preventDefault();
        if(admission.Id === null || admission.Id === undefined){
          dispatch(addAdmission(admission,tokenId));
          } else {
            admission.UserModified=loggedInUser;
            dispatch(updateAdmission(admission,tokenId));
          }
    }
  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField id="AdmissionDate" label="AdmissionDate*" type="date" defaultValue={admission.AdmissionDate ?? '0000-00-00'} 
        className={classes.textField} InputLabelProps={{shrink: true}} onChange={(e)=>changeHandler('AdmissionDate',e.currentTarget.value)}/>
        <TextField id="Result" label="RoomNo*" value={admission.RoomNo} onChange={(e)=>changeHandler('RoomNo',e.currentTarget.value)}/>
        <TextField id="Result" label="BedNo*" value={admission.BedNo} onChange={(e)=>changeHandler('BedNo',e.currentTarget.value)}/>
        <TextField id="DischargeDate" label="DischargeDate" type="date" defaultValue={admission.DischargeDate} 
        className={classes.textField} InputLabelProps={{shrink: true}} onChange={(e)=>changeHandler('DischargeDate',e.currentTarget.value)}/>
        <TextareaAutosize
        id="Remark" rowsMin={3} aria-label="Remark" placeholder="Remark" defaultValue={admission.Remark} onChange={(e)=>changeHandler('Remark',e.currentTarget.value)}/>
        <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
    </form>
  );
}