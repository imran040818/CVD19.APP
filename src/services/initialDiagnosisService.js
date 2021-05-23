import {get, post, del} from '../utilities/api';
import {ID_DELETE, ID_SAVE,ID_UPDATE} from '../utilities/apiUrl';

export const addInitialDiagnosisData = async (initialDiagnosis,token) => {
    return await post(ID_SAVE, initialDiagnosis,token);
}

export const updateInitialDiagnosisData = async (initialDiagnosis,token) => {
    return await post(ID_UPDATE, initialDiagnosis,token);
}

export const deleteInitialDiagnosisData = async (id,token) => {
    return await del(ID_DELETE, [id],token);
}