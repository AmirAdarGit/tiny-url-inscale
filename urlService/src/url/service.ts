import { Token } from "../../../shared/models/authenticate"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { ISqsProducer } from "../../../shared/interfaces/sqsProducer"
import { Url } from "../../../shared/models/url/index"
import  * as errors  from "./errors";


export class UrlService {
    private database: Idatabase;
    private authHttpClient: IAuthServiceHttpClient;
    private urlProducer: ISqsProducer; 

    constructor(database: Idatabase, authHttpClient: IAuthServiceHttpClient, urlProducer: ISqsProducer) {
        this.database = database;
        this.authHttpClient = authHttpClient;
        this.urlProducer = urlProducer;
    }
    
    async create(token: Token, longUrl: string, isPrivate: boolean): Promise<string> {     
        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej(new errors.ValidationError("invalid Token")) }); }

        const valid: boolean = this.isLegalSite(longUrl);
        if (!valid) { return new Promise((res, rej) => { rej(new errors.ValidationError("invalid Url")) }); }
        const insertQuery: string = `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${longUrl}', '${email}', ${isPrivate})`;

        const isInserted: boolean = await this.database.Execute<boolean>(insertQuery);
        if (!isInserted) { return new Promise((res, rej) => { rej(new errors.DatabaseError("Error inserting url to the database")) }); }
        
        const selectQuery: string = `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${longUrl}'`;
        const shortUrl: string = await this.database.Execute<string>(selectQuery);
        if (!shortUrl) { return new Promise((res, rej) => { rej(new errors.DatabaseError("Error selecting url from the database")) }); }

        try {
            await this.urlProducer.SqSProduce({ email: email, shortUrl: shortUrl, longUrl: longUrl });
            return shortUrl;
        } catch(ex) {
            console.log("Error, SQS produc faild");
            return shortUrl;
        }
    }
    async read(shortUrl: string, token: Token): Promise<string> {

        if (!this.validNumber(Number(shortUrl))) {
            return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Url")); })
        }
        const query: string = `SELECT * FROM Tiny_URL.Links where ShortURL = '${shortUrl}'`;
        const linkInfo: Url  = await this.database.Execute<Url>(query);
        if (!linkInfo) {
            return new Promise((res, rej) => { rej( new errors.DatabaseError("Error inserting url to the database")) }); }
        
        const { isPrivate: privacy, longUrl: url } = linkInfo; 
        if (!privacy) { return url; }

        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej("Invalid Token for private url.") }); }
        return url;
    }

    private validNumber(shortUrl: number): boolean {
        if (isNaN(shortUrl) || shortUrl < 0) {
            return false;
        } else {
            return true;
        }
    }

    // private is_Natural(number: Number): boolean {
    //  if (typeof number !== 'number') { 
    //       return false;
    //  } else {
    //       return (number >= 0.0) && (Math.floor(number) === number) && number !== Infinity;
    //     }
    // }

    private isLegalSite(longUrl: string): boolean {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(longUrl)
    }

}