import { Token } from "../../../shared/models/authenticate"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { ISqsProducer } from "../../../shared/interfaces/sqsProducer"
import { Url } from "../../../shared/models/url/index"
import  * as errors  from "../../../shared/errors"
import * as mysql from "mysql"
import { OkPacket, RowDataPacket} from "mysql";
import { bool } from "aws-sdk/clients/signer"

export class UrlService {
    private database: Idatabase;
    private authHttpClient: IAuthServiceHttpClient;
    //private urlProducer: ISqsProducer; 

    constructor(database: Idatabase, authHttpClient: IAuthServiceHttpClient) {
        this.database = database;
        this.authHttpClient = authHttpClient;
        //this.urlProducer = urlProducer;
    }
    
    async create(token: Token, longUrl: string, isPrivate: boolean): Promise<string> {     
        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Token")) }); }

        const valid: boolean = this.isLegalSite(longUrl);
        if (!valid) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Url")) }); }
        const insertQuery: string = `INSERT INTO tiny_url.Links (LongURL, Email, IsPrivate) VALUES ('${longUrl}', '${email}', ${isPrivate})`;

        const isInserted = await this.database.Execute<boolean>(insertQuery);
        if (!(isInserted)) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error inserting url to the database")) }); }
        
        const selectQuery: string = `SELECT ShortURL FROM tiny_url.Links WHERE LongURL = '${longUrl}'`;
        const shortUrl: any = await this.database.Execute<any>(selectQuery);
        if (!shortUrl) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error selecting url from the database")) }); }

        // try {
        //     await this.urlProducer.SqSProduce({ email: email, shortUrl: shortUrl, longUrl: longUrl });
        //     return shortUrl;
        // } catch(ex) {
        //     console.log("Error, SQS produce faild");
        //     return shortUrl;
        // }
    }
    async read(shortUrl: string, token: Token): Promise<string> {
        
        const isValidNumner: boolean = this.validNumber(Number(shortUrl)); 
        if (!isValidNumner) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Url"))}); }

        const query: string = `SELECT * FROM tiny_url.Links where ShortURL = '${shortUrl}'`;
        const linkInfo: Url  = await this.database.Execute<Url>(query);
        
        if (!linkInfo) { return new Promise((res, rej) => { rej( new errors.DatabaseError("Error inserting url to the database")) }); }
        
        const { isPrivate: privacy, longUrl: url } = linkInfo; 
        if (!privacy) { return url; }

        if (token.value == null) { return new Promise((res, rej) => { rej (new errors.ValidationError("Private links must have token for validation"))})}
        
        const email = await this.authHttpClient.getEmail(token);
        if (!email) { return new Promise((res, rej) => { rej( new errors.ValidationError("invalid Token")) }); }
        return url;
    }

    private validNumber(shortUrl: number): boolean {
        if (shortUrl < 0 || !Number.isInteger(shortUrl)) {
            return false;
        } else {
            return true;
        }
    }

    private isLegalSite(longUrl: string): boolean {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(longUrl)
    }

}