import { IUrlServiceHttpClient } from "../../../interfaces/url/IUrlServiceHttpClient"
import { IHttpClient } from "../../../interfaces/httpClient/IHttpClient";
import { Token } from "../../../models/authenticate";
import { api, url } from "../../../const"
import { Url } from "../../../models/url";

export class UrlServiceHttpClient implements IUrlServiceHttpClient {

    httpClient: IHttpClient

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient;
    }

    async get(shortUrl: number, token: Token): Promise<string> {
        return this.httpClient.get<string>(`${process.env.URL_SERVICE_PATH}/${api}/${url}`, { shortUrl, ...token })
    }

    async create(userToken: Token, url: Url): Promise<string> {
        return this.httpClient.post<string>(`${process.env.URL_SERVICE_PATH}/${api}/${url}`, { url }, userToken)
    }
}