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
import { addPatientData, updatePatientData,uploadPatientPhoto } from '../../../../actions/patient';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {DropzoneDialog} from 'material-ui-dropzone'

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
    const [patient, setPatient] = useState( props.data);
    const [open,handleOpen] = useState(false);

    const handleSave = (files) => {
      var formData = new FormData();
      formData.file=files[0];
      dispatch(uploadPatientPhoto(formData,tokenId))
    }
    const changeHandler = (key,value)=>{
        const updatePatient = patient;   
        var keys = key.split('.');
        //console.log(keys);
        if(keys.length === 1){
          updatePatient[key]=value;   
        } else{
          updatePatient[keys[0]][keys[1]] = value;
        }
        setPatient({...updatePatient});
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        //console.log(e);
        if(patient.Id === null || patient.Id === undefined){
          const regKey = patient.RegNo === "1" ? 'TN' : 'CCC';
          patient.RegNo = regKey;
          //console.log(regKey)
          dispatch(addPatientData(patient,tokenId));
        } else {
          patient.UserModified=loggedInUser;
          dispatch(updatePatientData(patient,tokenId));
        }
    }
  return (
    <Grid container spacing={0}>
        <Grid item xs={12}>
          <form className={classes.root} noValidate autoComplete="off" >
          <FormControl>
              <InputLabel htmlFor="age-native-simple">Organization</InputLabel>
              <Select disabled={true}
              native
              value={patient.RegNo}
              inputProps={{
                  name: 'organizarion',
                  id: 'org',
              }}
              >
              <option value={"1"}>TN</option>
              <option value={"2"}>CCC</option>
              </Select>
          </FormControl>
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
          <div style={{marginTop:20}}>Comorbidity</div>
          <FormControlLabel
          control={
            <Checkbox
              checked={patient.PatientComorbidity.IsDiabetic}
              onChange={(e)=>changeHandler('PatientComorbidity.IsDiabetic',e.currentTarget.checked)}
              name="diabetic"
              color="primary"
            />
          }
          label="Diabetic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.PatientComorbidity.IsHypertension}
              onChange={(e)=>changeHandler('PatientComorbidity.IsHypertension',e.currentTarget.checked)}
              name="hypertension"
              color="primary"
            />
          }
          label="Hypertension"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.PatientComorbidity.IsAsthamatic}
              onChange={(e)=>changeHandler('PatientComorbidity.IsAsthamatic',e.currentTarget.checked)}
              name="asthamatic"
              color="primary"
            />
          }
          label="Asthamatic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.PatientComorbidity.IsCardiac}
              onChange={(e)=>changeHandler('PatientComorbidity.IsCardiac',e.currentTarget.checked)}
              name="cardiac"
              color="primary"
            />
          }
          label="Cardiac"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={patient.PatientComorbidity.IsOther}
              onChange={(e)=>changeHandler('PatientComorbidity.IsOther',e.currentTarget.checked)}
              name="isOther"
              color="primary"
            />
          }
          label="Other"
        />

          <TextareaAutosize
          id="detail" rowsMin={3} aria-label="OtherComorbidity" placeholder="Other Comorbidity" 
          style={{display:patient.PatientComorbidity.IsOther? 'block' : 'none'}} 
          defaultValue={patient.PatientComorbidity.Detail} onChange={(e)=>changeHandler('PatientComorbidity.Detail',e.currentTarget.value)}/>
          

          <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
      </form>
          {/* <Button onClick={()=>handleOpen(true)} color='primary'>Select photo</Button>
              <DropzoneDialog
                  open={open}
                  onSave={(e)=>handleSave(e)}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={()=>handleOpen(false)}
              /> */}
        </Grid>
    </Grid>
  );
}