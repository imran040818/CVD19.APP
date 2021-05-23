import {
    MODAL_OPEN,
    MODAL_CLOSE
} from '../actions/actionConstants';


export const modalPopup = (state = { 
    width:300,
    height:500,
    isOpenModal: false,
    resourceName: '',
    operationName: ''
 }, action) => {
switch (action.type) {
    case MODAL_OPEN:
        return{
            ...state,
            isOpenModal:true,
            width:action.payload.popupWidth,
            height:action.payload.popupHeight,
            resourceName : action.payload.resourceName,
            operationName : action.payload.operationName,
            data: action.payload.data
        };  
    case MODAL_CLOSE:
        return{
            ...state,
            isOpenModal:false,
            resourceName : '',
            operationName : '',
            width:300,
            height:500,
            data: {}
        };  
    default:
       return state;
}
}
