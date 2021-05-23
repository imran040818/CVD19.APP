import { searchPatients, viewPatients,populatePatientNames,addPatient,updatePatient,deletePatient, getAllPatients  } from '../services/patientService';

import {
    ADD_PATIENT,
    DELETE_PATIENT,
    UPDATE_PATIENT,
    SEARCH_PATIENT,
    VIEW_PATIENT,
    LOADING_COMPLETE,
    LOADING_STARTED,
    POPULATE_PATIENTS,
    MODAL_CLOSE,
    ERROR_MODEL_OPEN,
    ALL_PATIENT
} from './actionConstants';

export const getPatients = (token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await getAllPatients(token);
    dispatch({
      type:ALL_PATIENT,
      payload: response
    });
    dispatch({
      type:LOADING_COMPLETE
    });
}
}
export const populatePatientName = (token) => {
    return async function(dispatch){
      dispatch({
        type:LOADING_STARTED
      });
      var response = await populatePatientNames(token);
      dispatch({
        type:POPULATE_PATIENTS,
        payload: response
      });
      dispatch({
        type:LOADING_COMPLETE
      });
  }
}

export const searchPatientsByName = (name, token) => {
    return async function(dispatch){
      dispatch({
        type:LOADING_STARTED
      });
      var response = await searchPatients(name, token);
      console.log(response);
      dispatch({
        type:SEARCH_PATIENT,
        payload: response
      });
      dispatch({
        type:LOADING_COMPLETE
      });
    }
}

export const viewPatientsById = (id, token) => {
    return async function(dispatch){
      dispatch({
        type:LOADING_STARTED
      });
      var response = await viewPatients(id, token);
      dispatch({
        type:VIEW_PATIENT,
        payload: response
      });
      dispatch({
        type:LOADING_COMPLETE
      });
    }
}

export const addPatientData = (patient, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await addPatient(patient, token);
    if(response.error === ''){
      dispatch({
        type:ADD_PATIENT,
        payload: response
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: {validationError : response?.error?.response?.data?.ValidationError, message: response?.error?.response?.data?.ErrorMessage}}
      });
    }
    if(response.error !== '' || response.error !== ' '){
        dispatch({
          type:MODAL_CLOSE,
        });
        }
      dispatch({
        type:LOADING_COMPLETE
      });
    }
}

export const updatePatientData = (patient, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await updatePatient(patient, token);
    if(response.error === ''){
      dispatch({
        type:UPDATE_PATIENT,
        payload: response
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: {validationError : response?.error?.response?.data?.ValidationError, message: response?.error?.response?.data?.ErrorMessage}}
      });
    }
    if(response.error !== '' || response.error !== ' '){
        dispatch({
          type:MODAL_CLOSE,
        });
        }
      dispatch({
        type:LOADING_COMPLETE
      });
    }
}

export const deletePatientData = (id, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await deletePatient(id, token);
    if(response.error === ''){
      dispatch({
        type:DELETE_PATIENT,
        payload: response
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: {validationError : response?.error?.response?.data?.ValidationError, message: response?.error?.response?.data?.ErrorMessage}}
      });
    }
  if(response.error !== '' || response.error !== ' '){
      dispatch({
        type:MODAL_CLOSE,
      });
      }
    dispatch({
      type:LOADING_COMPLETE
    });
  }
}