import {
    ERROR_MODAL_CLOSE,
    ERROR_MODEL_OPEN
} from '../actions/actionConstants';


export const errorPopup = (state = { 
    isErrorModalOpen: false,
    errorMessage:{ validationError:[], message:''}
 }, action) => {
switch (action.type) {
    case ERROR_MODEL_OPEN:
        return{
            ...state,
            isErrorModalOpen:true,
            errorMessage: action.payload.errorMessage
        };  
    case ERROR_MODAL_CLOSE:
        return{
            ...state,
            isErrorModalOpen:false,
            errorMessage: { validationError:[], message:''}
        };  
    default:
       return state;
}
}
