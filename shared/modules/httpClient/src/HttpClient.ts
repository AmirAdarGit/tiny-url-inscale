import { IHttpClient } from "../../../interfaces/httpClient"
import axios from "axios"
import { Token } from "../../../models/authenticate/Token"

export class HttpClient implements IHttpClient {

    async get<T>(url: string, params: object): Promise<T> {
        console.log("in httpClient, params: ", params);
        const response = await axios.get<T>(url, { params: { ...params }});
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject());
        }
        return response.data
    }
    async post<T>(url: string, payload: object, token: Token): Promise<T> {
        const response = await axios.post<T>(url, { payload }, { headers: { 'Authorization': `Bearer ${token}`} }); 
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject());
        }
        return response.data    
    }
}