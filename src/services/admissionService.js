import {get, post, del} from '../utilities/api';
import {ADMISSION_DELETE, ADMISSION_UPDATE,ADMISSION_SAVE} from '../utilities/apiUrl';

export const addAdmissionData = async (admission,token) => {
    return await post(ADMISSION_SAVE, admission,token);
}

export const updateAdmissionData = async (admission,token) => {
    return await post(ADMISSION_UPDATE, admission,token);
}

export const deleteAdmissionData = async (id,token) => {
    return await del(ADMISSION_DELETE, [id],token);
}