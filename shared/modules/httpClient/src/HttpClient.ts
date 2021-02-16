import { IHttpClient } from "../../../interfaces/httpClient"
import axios from "axios"

export class HttpClient implements IHttpClient {

    async Get<T>(url: string, params: object): Promise<T> {
        console.log("in httpClient, params: ", params);
        const response = await axios.get<T>(url, { params: { ...params }});
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject());
        }
        return response.data
    }
    async Post<T>(url: string, payload: object): Promise<T> {
        const response = await axios.post<T>(url, payload); 
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject());
        }
        return response.data
    }
}