import { IS_LOGGED_IN, IS_LOGGED_OUT } from '../actions/actionConstants';

export const auth = (state = { isLoggedIn : false, loggedInUser:'System', tokenId:'' }, action) => {

    switch (action.type) {
        case IS_LOGGED_IN:
            return{
                ...state,
                isLoggedIn : true,
                loggedInUser: action.payload.loggedInUser,
                tokenId: action.payload.tokenId,
            }; 
        case IS_LOGGED_OUT:
            return{
                ...state,
                isLoggedIn : false,
                loggedInUser: 'Syste,',
                tokenId: '',
            };      
        default:
           return state;
    }
}