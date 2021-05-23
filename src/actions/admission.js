import { addAdmissionData, updateAdmissionData, deleteAdmissionData } from '../services/admissionService';

import { 
    ADD_ADMISSION,
    DELETE_ADMISSION,
    UPDATE_ADMISSION,
    LOADING_COMPLETE,
    LOADING_STARTED,
    MODAL_CLOSE,
    ERROR_MODEL_OPEN
} from './actionConstants';

export const addAdmission = (admission, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await addAdmissionData(admission, token);
       
        if(response.error === ''){
          dispatch({
            type:ADD_ADMISSION,
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

export const updateAdmission = (admission, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await updateAdmissionData(admission, token);
      
        if(response.error === ''){
          dispatch({
            type:UPDATE_ADMISSION,
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

export const deleteAdmission = (id, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await deleteAdmissionData(id, token);
      
        if(response.error === ''){
          dispatch({
            type:DELETE_ADMISSION,
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