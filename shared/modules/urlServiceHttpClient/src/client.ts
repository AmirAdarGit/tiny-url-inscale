import { IUrlServiceHttpClient } from "../../../interfaces/url/IUrlServiceHttpClient"
import { HttpClient } from "../../httpClient/src/HttpClient";
import { Url } from "../../../models/url/index"
import { Token } from "../../../models/authenticate";

export class UrlServiceHttpClient implements IUrlServiceHttpClient {

    httpClient: HttpClient

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    async get(shortUrl: number, token: Token): Promise<Url> {
        return this.httpClient.get<Url>(process.env.URL_SERVICE_PATH, { shortUrl, ...token })
    }

    async create(userToken: Token, longUrl: string, email: string, isPrivate: boolean): Promise<string> {
        return this.httpClient.post<string>(process.env.URL_SERVICE_PATH, { longUrl, email, isPrivate }, userToken)
    }
}