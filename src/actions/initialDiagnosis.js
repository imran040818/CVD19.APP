import { addInitialDiagnosisData, updateInitialDiagnosisData, deleteInitialDiagnosisData } from '../services/initialDiagnosisService';

import {
    ADD_INITIAL_DIAGNOSIS,
    DELETE_INITIAL_DIAGNOSIS,
    UPDATE_INITIAL_DIAGNOSIS,
    LOADING_COMPLETE,
    LOADING_STARTED,
    MODAL_CLOSE,
    ERROR_MODEL_OPEN
} from './actionConstants';

export const addInitialDiagnosis = (initialDiagnosis, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await addInitialDiagnosisData(initialDiagnosis, token);
    if(response.error === ''){
      dispatch({
        type:ADD_INITIAL_DIAGNOSIS,
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

export const updateInitialDiagnosis = (initialDiagnosis, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await updateInitialDiagnosisData(initialDiagnosis, token);
    
    if(response.error === ''){
      dispatch({
        type:UPDATE_INITIAL_DIAGNOSIS,
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

export const deleteInitialDiagnosis = (id, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await deleteInitialDiagnosisData(id, token);
    if(response.error === ''){
      dispatch({
        type:DELETE_INITIAL_DIAGNOSIS,
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