import { searchPatients, viewPatients,addPatient,updatePatient,deletePatient, uploadPhoto,getAllPatients  } from '../services/patientService';

import {
    ADD_PATIENT,
    DELETE_PATIENT,
    UPDATE_PATIENT,
    SEARCH_PATIENT,
    VIEW_PATIENT,
    LOADING_COMPLETE,
    LOADING_STARTED,
    MODAL_CLOSE,
    ERROR_MODEL_OPEN,
    ALL_PATIENT,
    UPLOAD_PATIENT_PHOTO,
} from './actionConstants';

export const getPatients = (token, regNo, filterType, startIndex, count) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await getAllPatients(regNo,filterType,startIndex,count,token);
    dispatch({
      type:ALL_PATIENT,
      payload: response
    });
    dispatch({
      type:LOADING_COMPLETE
    });
}
}

export const searchPatientsByName = (name,regNo, token) => {
    return async function(dispatch){
      dispatch({
        type:LOADING_STARTED
      });
      var response = await searchPatients(name,regNo, token);
      if(response.error === null){
      dispatch({
        type:SEARCH_PATIENT,
        payload: response
      });
      } else {
        dispatch({
          type:ERROR_MODEL_OPEN,
          payload: {errorMessage: response.error}
        });
      }
      dispatch({
        type:LOADING_COMPLETE
      });
    }
}

export const viewPatientsById = (id,regNo, token) => {
    return async function(dispatch){
      dispatch({
        type:LOADING_STARTED
      });
      var response = await viewPatients(id,regNo, token);
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
    if(response.error === null){
      dispatch({
        type:ADD_PATIENT,
        payload: response
      });
      dispatch({
        type:MODAL_CLOSE,
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: response.error}
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
    if(response.error === null){
      dispatch({
        type:UPDATE_PATIENT,
        payload: response
      });
      dispatch({
        type:MODAL_CLOSE,
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: response.error}
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
    if(response.error === null){
      dispatch({
        type:DELETE_PATIENT,
        payload: response
      });
      dispatch({
        type:MODAL_CLOSE,
      });
    } else {
      dispatch({
        type:ERROR_MODEL_OPEN,
        payload: {errorMessage: response.error}
      });
    }
    dispatch({
      type:LOADING_COMPLETE
    });
  }
}

export const uploadPatientPhoto = (files,token)=>{
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await uploadPhoto(files,token);
    dispatch({
      type:UPLOAD_PATIENT_PHOTO,
      payload: response
    });
    dispatch({
      type:LOADING_COMPLETE
    });
  }
}