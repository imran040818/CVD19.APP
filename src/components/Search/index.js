import React from 'react'
import PatientInfo from './patientInfo';
import PatientSearch from './patientSearch'
import PatientSearchDetail from './patientSearchDetail';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchPatientsByName, viewPatientsById, addPatientData, updatePatientData, deletePatientData } from '../../actions/patient';
import { CLEAR_SEARCH_PATIENT , MODAL_OPEN} from '../../actions/actionConstants'
import Header from '../Shared/headerComponent';
import Footer from '../Shared/footerComponent';
import ModalPopup from '../Shared/modalPopup';
import ErrorPopup from '../Shared/errorPopup';
import Loader from '../Shared/loader';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import { populatePatientName } from '../../actions/patient'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingRight:20,
    paddingLeft:20,
    minHeight:800
  },
  search:{
      textAlign:'center',
      paddingTop: 40,
  }
}));


export default function Search(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {auth} = useSelector(state => state);
    const { searchList, searchText, searchedPatients, dailyDiagnoses, initialDiagnoses, admissions, displayPatientInfo, displaySearchResult, selectedPatientId } = useSelector(state => state.patient);

    let timer  = undefined;
    const searchPatientByName = (name) => {
        clearTimeout(timer);
        timer  = setTimeout(function(){
            if(name !== ""){
                dispatch(searchPatientsByName(name, auth.tokenId));
            }
        },1000);
        if(name === "" || name === " "){
            dispatch({
                type:CLEAR_SEARCH_PATIENT
            });
        }
    }

    const loadPatients =() =>{
        dispatch(populatePatientName())
    }

    const viewPatient = (data) => {
        dispatch(viewPatientsById(data.Id,auth.tokenId));
    }
    const addPatient =(data)=>{
        dispatch(
            {
                type: MODAL_OPEN,
                payload: 
                {
                 resourceName : 'patient',
                 operationName: 'New Patient',
                 popupWidth:300,
                 popupHeight:500,
                 data: { Id:undefined, Name:'', Age:20, Sex:'2', RelationOf:'', Village:'', District:'', MobileNo:'', AltMobileNo:'', UserCreated: auth.loggedInUser }
                },
            });
    }

    const editPatient = (data) => {
        dispatch({type: MODAL_OPEN, payload: {  resourceName : 'patient',  popupWidth:300,
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
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'dailyDiagnosis', operationName: 'Edit Daily Daignosis', popupWidth:300,
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
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'initialDiagnosis',  popupWidth:300,
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
        dispatch({type: MODAL_OPEN, payload: { resourceName : 'admission', popupWidth:300,
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
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <div className={classes.search}>
                            <Grid container spacing={0}>
                                <Grid item xs={11}>
                                    <PatientSearch searchList={searchList} onSearch={searchPatientByName} searchText={searchText}
                                    loadPatients={loadPatients}/>
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
