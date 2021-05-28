import React from 'react'
import PatientInfo from './patientInfo';
import PatientSearch from './patientSearch'
import PatientSearchDetail from './patientSearchDetail';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchPatientsByName, viewPatientsById, addPatientData, updatePatientData, deletePatientData } from '../../actions/patient';
import { MODAL_OPEN} from '../../actions/actionConstants'
import Header from '../Shared/headerComponent';
import Footer from '../Shared/footerComponent';
import ModalPopup from '../Shared/modalPopup';
import ErrorPopup from '../Shared/errorPopup';
import Loader from '../Shared/loader';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingRight:20,
    paddingLeft:20,
    minHeight:800
  },
  search:{
      textAlign:'center',
      paddingTop: 50,
      paddingLeft:'0!important',
      marginLeft:'0!important',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '60%',
  },
}));


export default function Search(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [regNo,handleRegNo] = useState("1");
    const {auth, patient} = useSelector(state => state);
    const { searchList, searchText, searchedPatients, dailyDiagnoses, initialDiagnoses, admissions, displayPatientInfo, displaySearchResult, selectedPatientId } = useSelector(state => state.patient);

    const searchPatientByName = (name) => {
        const regKey = regNo === "1" ? 'TN' : 'CCC';
        //console.log(regKey);
        dispatch(searchPatientsByName(name,regKey, auth.tokenId));
    }

    const handleOrgChange = (value) =>{
        handleRegNo(value);
        if(patient.searchText !== ""){
            const regKey = value === "1" ? 'TN' : 'CCC';
            
            dispatch(searchPatientsByName(patient.searchText,regKey, auth.tokenId));
        }
    }
    const viewPatient = (data) => {

        const regKey = regNo === "1" ? 'TN' : 'CCC';
        dispatch(viewPatientsById(data.Id,regKey,auth.tokenId));
    }
    const addPatient =()=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                 resourceName : 'patient',
                 operationName: 'New Patient',
                 popupWidth:400,
                 popupHeight:500,
                 data: { 
                    Id:undefined, Name:'', Age:20, Sex:'2', RelationOf:'',
                    Village:'', District:'', MobileNo:'', AltMobileNo:'', UserCreated: auth.loggedInUser,
                    Photo:'',
                    RegistrationId:'',
                    RegNo:regNo,
                    File:null,
                    O2Needed:'',
                    BMP:'',
                    PatientComorbidity:{
                        IsDiabetic:false,
                        IsAsthamatic:false,
                        IsCardiac:false,
                        IsHypertension:false,
                        IsOther:false,
                        Detail:''
                    } }
                },
            });
    }

    const editPatient = (data) => {
        if(data.PatientComorbidity === undefined || data.PatientComorbidity === null){
            data.File=null;
            data.PatientComorbidity={
                IsDiabetic:false,
                IsAsthamatic:false,
                IsCardiac:false,
                IsHypertension:false,
                IsOther:false,
                Detail:''
            } 
        }
        dispatch({type: MODAL_OPEN, payload: {  resourceName : 'patient',  popupWidth:400,
        popupHeight:500 ,operationName: 'Edit Patient', data: data}})
    }

    const deletePatient = (data) => {
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                 resourceName : 'patient-delete',
                 operationName: 'Delete Patient',
                 popupWidth:350,
                 popupHeight:250,
                 data: data
                },
            });
    }

    const editDailyDiagnosis = (data)=>{
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'dailyDiagnosis', operationName: 'Edit Daily Daignosis', popupWidth:400,
        popupHeight:500, data: data}})
    }

    const deleteDailyDiagnosis = (data) =>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                    popupWidth:350,
                    popupHeight:250,
                 resourceName : 'dailyDiagnosis-delete',
                 operationName: 'Delete Daily Diagnosis',
                 data: data
                },
            });
    }

    const editInitialDiagnosis = (data) =>{
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'initialDiagnosis',  popupWidth:400,
        popupHeight:500, operationName: 'Edit Initial Daignosis', data: data}})
    }

    const deleteInitialDiagnosis = (data) =>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                    popupWidth:350,
                    popupHeight:250,
                 resourceName : 'initialDiagnosis-delete',
                 operationName: 'Delete Initial Diagnosis',
                 data: data
                },
            });
    }

    const editAdmission =(data)=>{
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'admission', popupWidth:400,
        popupHeight:500, operationName: 'Edit Admission', data: data}})
    }
    const deleteAdmission = (data)=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                    popupWidth:350,
                    popupHeight:250,
                 resourceName : 'admission-delete',
                 operationName: 'Delete Admission',
                 data: data
                },
            });
    }
   
    return (
        <div>
            <Header {...props}/>
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                            <Grid container spacing={0}>
                                <Grid item xs={4}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-native-simple">Organization</InputLabel>
                                        <Select
                                        native
                                        value={regNo}
                                        onChange={(e)=>
                                        {
                                            //console.log(e.currentTarget.value);
                                            handleOrgChange(e.currentTarget.value)
                                        }
                                        }
                                        inputProps={{
                                            name: 'organizarion',
                                            id: 'org',
                                        }}
                                        >
                                        <option value={1}>TN</option>
                                        <option value={2}>CCC</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={7}>
                                    <PatientSearch searchList={searchList} onSearch={searchPatientByName} searchText={searchText}/>
                                </Grid>
                                <Grid item xs={1}>
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={addPatient}>
                                    <Add />
                                    </IconButton>
                                </label>
                                </Grid>
                            </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.search} style={{display : displaySearchResult ? 'block' : 'none'}}>
                                <PatientSearchDetail 
                                onView = {viewPatient} 
                                onEdit = {editPatient}
                                onDelete = {deletePatient}
                                searchedPatients = {searchedPatients} />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.search} style={{display : displayPatientInfo ? 'block' : 'none'}}>
                                <PatientInfo 
                                    dailyDiagnosis={dailyDiagnoses}
                                    initialDiagnosis={initialDiagnoses}
                                    admission={admissions}
                                    onDailyDiagnosisEdit = {editDailyDiagnosis}
                                    onDailyDiagnosisDelete = {deleteDailyDiagnosis}
                                    onInitialDiagnosisEdit = {editInitialDiagnosis}
                                    onInitialDiagnosisDelete = {deleteInitialDiagnosis}
                                    onAdmissionEdit = {editAdmission}
                                    onAdmissionDelete = {deleteAdmission}
                                    selectedPatientId= {selectedPatientId}
                                    userCreated= {auth.loggedInUser}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            <Footer {...props}/>
            <Loader />
            <ModalPopup />
            <ErrorPopup />
        </div>
    )
}
