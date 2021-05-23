import {
    LOADING_STARTED,
    LOADING_COMPLETE
} from '../actions/actionConstants';


export const loader = (state = { 
    isLoading: false
 }, action) => {
switch (action.type) {
    case LOADING_STARTED:
        return{
            ...state,
            isLoading:true
        };  
    case LOADING_COMPLETE:
        return{
            ...state,
            isLoading:false
        };  
    default:
       return state;
}
}
