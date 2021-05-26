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
       
        if(response.error === null){
          dispatch({
            type:ADD_ADMISSION,
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

export const updateAdmission = (admission, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await updateAdmissionData(admission, token);
      
        if(response.error === null){
          dispatch({
            type:UPDATE_ADMISSION,
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

export const deleteAdmission = (id, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await deleteAdmissionData(id, token);
      
        if(response.error === null){
          dispatch({
            type:DELETE_ADMISSION,
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