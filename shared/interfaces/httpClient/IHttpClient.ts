export interface IHttpClient {
    Get<T>(url: string, params: object): Promise<T>
    Post<T>(url: string, payload: object): Promise<T>
}