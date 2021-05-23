import { combineReducers } from "redux";
import { auth } from './auth';
import { patient } from './patient';
import { modalPopup } from './modalPopup';
import { errorPopup } from './errorPopup';
import { loader } from './loader';

const rootReducer = combineReducers({
    auth,
    patient,
    errorPopup,
    modalPopup,
    loader
});

export default rootReducer;