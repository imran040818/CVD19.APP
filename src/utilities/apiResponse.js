export const getData = (response) =>{
    if(response.data === null){
        return { data: null, error: 'Internal server error occured. Please contact system administartor.' };
    } else {
        if(response.data.StatusCode === 1){
            return { data: response.data.Data, error: '' };
        } else{
            return { data: null, error: response.data.ErrorMessage.message };
        }
    }
}