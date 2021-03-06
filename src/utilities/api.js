import axios from 'axios';
import { DEFAULT_API_URL } from './apiUrl';
import { getResponseData, getError } from './apiResponse';

new axios
let headers = {
    'Content-Type' : 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin':'*'
}
const formatUrl = (url, data) => {
   if(data) {
       try {
            var indexes = url.match(/{.*?}/g);
            if(indexes) {
                indexes.map((index, i)=>{
                    url = url.replace(index,data[i]);
                })
            }
       } catch (error) {
           console.error("Unable to format url in api utility.",error)
       }
   }
   return url;
}
export const get = async(url, data, token) => {
    url = DEFAULT_API_URL + url;
    url = formatUrl(url, data);
    var responseData = {data: null, error: '' };
    try {
        headers.Authorization ='Bearer '+token;
        const response = await axios.get(url, {
            headers
        });
        responseData = getResponseData(response);
    } catch (error) {
        responseData = getError(error);
    }
    return responseData;
}

export const post = async (url, data,token,param=null, contentType='application/json; charset=utf-8') => {
    url = DEFAULT_API_URL + url;
    url = formatUrl(url, param);
    var responseData = {data: null, error: '' };
    try {
        headers['Content-Type']=contentType;
        headers.Authorization ='Bearer '+token;
        const response =  await axios.post(url, JSON.stringify(data), {
            headers
        });
        console.log(response);

        responseData = getResponseData(response);
    } catch (error) {
        responseData = getError(error);
    }
    return responseData;
}

export const del = async (url, data,token) => {
    url = DEFAULT_API_URL + url;
    url = formatUrl(url, data);
    var responseData = {data: null, error: '' };
    try {
        headers.Authorization ='Bearer '+token;
        const response =  await axios.delete(url, {
            headers
        });
        responseData = getResponseData(response);
    } catch (error) {
        responseData = getError(error);
    }
    return responseData;
}