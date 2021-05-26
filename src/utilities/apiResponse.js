export const getResponseData = (response) =>{
    if(response.status === 200){
        if(response.data.StatusCode === 1){
            return { data: response.data.Data, error: null };
        } else{
            return { data: null, error: {message: response.data.ErrorMessage ?? '', validationError: response.data.ValidationError ?? []}  };
        }
    } else{
        return { data: null, error: { message: 'Internal server error occured. Please contact system administartor.', validationError:[]} };
    }
}

export const getError = (error) =>
{
    console.log(error)

    let responseData = {};
    if(error.message.indexOf('401')>=0){
        responseData.data = null;
        responseData.error = { message: 'You are not authorized', validationError:[] };
    }
    if(error.message.indexOf('400')>=0){
        responseData.data = null;
        responseData.error = { message: '', validationError:error.response.data.ValidationError };
    }else{
        responseData.data = null;
        responseData.error = { message: 'Something went wrong. Please try after sometime.', validationError:[] };
    }
    return responseData;
}
