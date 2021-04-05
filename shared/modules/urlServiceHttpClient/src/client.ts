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

    async create(userToken: Token, urlInfo: Url): Promise<string> {
        console.log(`[UrlServiceHttpClient] - create - Token: ${userToken.value} url:${urlInfo}`);
        return this.httpClient.post<string>(`${process.env.URL_SERVICE_PATH}/${api}/${url}`, { urlInfo }, userToken)
    }

    async get(shortUrl: number, token: Token): Promise<string> {
        return this.httpClient.get<string>(`${process.env.URL_SERVICE_PATH}/${api}/${url}`, { shortUrl, ...token })
    }


}