import { IUrlServiceHttpClient } from "../../interfaces/url/IUrlServiceHttpClient"
import { HttpClient } from "../httpClient/src/HttpClient";
import { Url } from "../../../shared/models/url/index"

export class UrlServiceHttpClient implements IUrlServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    // async Get(shortUrl: string): Promise<User> {
    //     return this.httpClient.Get<User>("http://url-service:8080/api/user", { email })
    // }

    async Create(url: Url): Promise<void> {

        return this.httpClient.Post<void>("http://url-service:8080/api/url", url)
    }

}