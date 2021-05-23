import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addInitialDiagnosis, updateInitialDiagnosis } from '../../../../actions/initialDiagnosis';

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

export default function InitialDiagnosis(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {tokenId,loggedInUser} = useSelector(state => state.auth);
    const [initialDiagnosis, setInitialDiagnosis] = useState( props.data );
    //console.logog(initialDiagnosis);
    const changeHandler = (key,value)=>{
        const updateinitialDiagnosis = initialDiagnosis;   
        updateinitialDiagnosis[key]=value;   
        setInitialDiagnosis({...updateinitialDiagnosis});
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(initialDiagnosis.Id === null || initialDiagnosis.Id === undefined){
          dispatch(addInitialDiagnosis(initialDiagnosis,tokenId));
          } else {
            initialDiagnosis.UserModified=loggedInUser;
            dispatch(updateInitialDiagnosis(initialDiagnosis,tokenId));
          }
    }
  return (
    <form className={classes.root} noValidate autoComplete="off" >
        <TextField id="SymptomDate" label="SymptomDate*" type="date" defaultValue={initialDiagnosis.SymptomDate ?? '0000-00-00'} 
        className={classes.textField} InputLabelProps={{shrink: true}} onChange={(e)=>changeHandler('SymptomDate',e.currentTarget.value)}/>
         <TextField id="SampleDate" label="SampleDate*" type="date" defaultValue={initialDiagnosis.SampleDate ?? '0000-00-00'} 
        className={classes.textField} InputLabelProps={{shrink: true}} onChange={(e)=>changeHandler('SampleDate',e.currentTarget.value)}/>
        <RadioGroup aria-label="Result" name="Result" value={initialDiagnosis.Result?.toString() } onChange={(e)=>changeHandler('Result',e.currentTarget.value)}>
            <FormControlLabel value="0" control={<Radio />} label="Negative" />
            <FormControlLabel value="1" control={<Radio />} label="Positive" />
            <FormControlLabel value="3" control={<Radio />} label="NA" />
        </RadioGroup>
        <TextareaAutosize
        id="Remark" rowsMin={3} aria-label="Remark" placeholder="Remark" defaultValue={initialDiagnosis.Remark} onChange={(e)=>changeHandler('Remark',e.currentTarget.value)}/>
        <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
    </form>
  );
}