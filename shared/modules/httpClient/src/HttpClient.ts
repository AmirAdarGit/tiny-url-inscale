import { IHttpClient } from "../../../interfaces/httpClient"
import axios, { AxiosResponse } from "axios"
import { Token } from "../../../models/authenticate/Token"

export class HttpClient implements IHttpClient {

    async get<T>(url: string, params: object, token?: Token): Promise<T> {
        console.log("in httpClient, params: ", params);
        
        const config = {
            headers : { 'Authorization': `Bearer ${token}`},
            params : { params }
        }
        const response = await axios.get<T>(url, config);

        if (response.status != 200) {
            return new Promise((resolve, reject) => reject(response.data));
        }

        return response.data;
    }
    async post<T>(url: string, payload: object, token?: Token): Promise<T> {
        const config = {
            headers : { 'Authorization': `Bearer ${token}`},
        }
        const response: AxiosResponse = await axios.post<T>(url, { ...payload }, config); 
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject(response.data));
        }
        return response.data;    
    }
}