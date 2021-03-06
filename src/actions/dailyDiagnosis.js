import { addDailyDiagnosisData, updateDailyDiagnosisData, deleteDailyDiagnosisData,  } from '../services/dailyDiagnosisService';

import { 
    ADD_DAILY_DIAGNOSIS,
    DELETE_DAILY_DIAGNOSIS,
    UPDATE_DAILY_DIAGNOSIS,
    LOADING_COMPLETE,
    LOADING_STARTED,
    MODAL_CLOSE,
    ERROR_MODEL_OPEN
} from './actionConstants';

export const addDailyDiagnosis = (dailyDiagnosis, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await addDailyDiagnosisData(dailyDiagnosis, token);
        
        if(response.error === null){
          dispatch({
            type:ADD_DAILY_DIAGNOSIS,
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

export const updateDailyDiagnosis = (dailyDiagnosis, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await updateDailyDiagnosisData(dailyDiagnosis, token);
        if(response.error === null){
          dispatch({
            type:UPDATE_DAILY_DIAGNOSIS,
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

export const deleteDailyDiagnosis = (id, token) => {
    return async function(dispatch){
        dispatch({
          type:LOADING_STARTED
        });
        var response = await deleteDailyDiagnosisData(id, token);
        if(response.error === null){
          dispatch({
            type:DELETE_DAILY_DIAGNOSIS,
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