import { Token } from "../../../shared/models/authenticate/Token"

export interface IHttpClient {
    get<T>(url: string, params: object, token?: Token): Promise<T>
    post<T>(url: string, payload: object, token?: Token): Promise<T>
}