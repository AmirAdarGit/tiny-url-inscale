import { IUrlServiceHttpClient } from "../../interfaces/url/IUrlServiceHttpClient"
import { HttpClient } from "../httpClient/src/HttpClient";
import { Url } from "../../../shared/models/url/index"
import { Token } from "../../models/authenticate";

export class UrlServiceHttpClient implements IUrlServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async Get(shortUrl: number, token: Token): Promise<void> {
        return this.httpClient.Get<void>("http://url-service:8080/api/url", { shortUrl, ...token })
    }

    async Create(url: Url): Promise<void> {
        return this.httpClient.Post<void>("http://url-service:8080/api/url", url)
    }

}