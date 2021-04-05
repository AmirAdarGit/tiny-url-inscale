import { IHttpClient } from "../../../interfaces/httpClient"
import axios, { AxiosResponse } from "axios"
import { Token } from "../../../models/authenticate/Token"
import { json } from "express";

export class HttpClient implements IHttpClient {

    async get<T>(url: string, params: object, token?: Token): Promise<T> {
        console.log("in httpClient, params: ", params);
        
        const config = {
            headers: { 'Authorization': `Bearer ${token}`},
            params,
            json: true        }
        const response = await axios.get<T>(url, config);

        if (response.status != 200) {
            return new Promise((resolve, reject) => reject(response.data));
        }
        console.log("[HttpClient] get ", response.data);

        return response.data;
    }
    async post<T>(url: string, payload: object, token?: Token): Promise<T> {
        try{
        console.log(`[HttpClient] post - url: ${url}`);
        console.log(`[HttpClient] post - payloas: ${JSON.stringify(payload)}`);
        if(!token){
            token = new Token(null);
        }
        console.log(`[HttpClient] post - token: ${token.value}`);
        } catch (err) {
            console.log("[in error]",err);
        }

        const config = {
            headers : { 'Authorization': `Bearer ${token.value}`}
        }
        

        const response: AxiosResponse = await axios.post<T>(url, { ...payload }, config); 
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject(response.data));
        }
        console.log("[HttpClient] post ", response.data)
        return response.data;    
    }
}