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
    if(response.error === null){
      dispatch({
        type:ADD_INITIAL_DIAGNOSIS,
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

export const updateInitialDiagnosis = (initialDiagnosis, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await updateInitialDiagnosisData(initialDiagnosis, token);
    
    if(response.error === null){
      dispatch({
        type:UPDATE_INITIAL_DIAGNOSIS,
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

export const deleteInitialDiagnosis = (id, token) => {
  return async function(dispatch){
    dispatch({
      type:LOADING_STARTED
    });
    var response = await deleteInitialDiagnosisData(id, token);
    if(response.error === null){
      dispatch({
        type:DELETE_INITIAL_DIAGNOSIS,
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