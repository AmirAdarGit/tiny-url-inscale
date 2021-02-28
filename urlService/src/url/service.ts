import { Token } from "../../../shared/models/authenticate"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { UrlProducer } from "../produce.url.sqs/produce"
import { Url } from "../../../shared/models/url/index"

export class UrlService {
    private database: Idatabase;
    private authHttpClient: IAuthServiceHttpClient;
    private urlProducer: UrlProducer; // TODO: change to interface for dependency injection?

    constructor(database: Idatabase, authHttpClient: IAuthServiceHttpClient, urlProducer: UrlProducer) {
        this.database = database;
        this.authHttpClient = authHttpClient;
        this.urlProducer = urlProducer;
    }
    
    async create(token: Token, longUrl: string, isPrivate: boolean): Promise<string> {     
        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej("Token invalid") }); }

        const valid: boolean = this.isLegalSite(longUrl);
        if (!valid) { return new Promise((res, rej) => { rej("Url invalid") }); }
        
        const insertQuery: string = `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${longUrl}', '${email}', ${isPrivate})`;
        const isInserted: boolean = await this.database.Execute<boolean>(insertQuery);
        if (!isInserted) { return new Promise((res, rej) => { rej("Error inserting url to database") }); }

        const selectQuery: string = `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${longUrl}'`;
        const shortUrl: string = await this.database.Execute<string>(selectQuery);

        await this.urlProducer.ProduceShortUrl(email, shortUrl, longUrl);
        return shortUrl;
    }

    async read(shortUrl: string, token: Token): Promise<string> {

        if (!this.validNumber(Number(shortUrl))) {
            return new Promise((res, rej) => { rej("Url is not valid"); })
        }
        const query: string = `SELECT * FROM Tiny_URL.Links where ShortURL = '${shortUrl}'`;
        const linkInfo: Url  = await this.database.Execute<Url>(query);
        if (!linkInfo) { return new Promise((res, rej) => { rej("No such url.") }); }
        
        const { isPrivate: privacy, longUrl: url } = linkInfo; 
        if (!privacy) { return url; }

        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej("Invalid Token.") }); }
        return url;
    }

    private validNumber(shortUrl: number): boolean {
        if (isNaN(shortUrl) || shortUrl < 0) {
            return false;
        } else {
            return true;
        }
    }

    private isLegalSite(longUrl: string): boolean {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(longUrl)
    }

}