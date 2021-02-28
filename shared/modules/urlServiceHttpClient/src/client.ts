import { IUrlServiceHttpClient } from "../../../interfaces/url/IUrlServiceHttpClient"
import { HttpClient } from "../../httpClient/src/HttpClient";
import { Token } from "../../../models/authenticate";
import { api, url } from "../../../const"

export class UrlServiceHttpClient implements IUrlServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async get(shortUrl: number, token: Token): Promise<string> {
        return this.httpClient.get<string>(`${process.env.URL_SERVICE_PATH}${api}${url}`, { shortUrl, ...token })
    }

    async create(userToken: Token, longUrl: string, email: string, isPrivate: boolean): Promise<string> {
        return this.httpClient.post<string>(`${process.env.URL_SERVICE_PATH}${api}${url}`, { longUrl, email, isPrivate }, userToken)
    }
}