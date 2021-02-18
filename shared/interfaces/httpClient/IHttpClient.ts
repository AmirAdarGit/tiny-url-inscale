export interface IHttpClient {
    get<T>(url: string, params: object): Promise<T>
    post<T>(url: string, payload: object): Promise<T>
}