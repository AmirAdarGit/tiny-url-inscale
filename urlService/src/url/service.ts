import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase" 
import * as query from "../databaseUrlQuery/queries"
import * as mysql from 'mysql'
import { Database } from "../../../shared/modules/database/src/database"
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { UrlProducer } from "../produce.url.sqs/produce"
import { Url } from "aws-sdk/clients/cloudformation"


export class UrlService {
    private database: Database;
    private authHttpClient: AuthServiceHttpClient;
    private urlProducer: UrlProducer;

    constructor(database: Database, authHttpClient: AuthServiceHttpClient, urlProducer: UrlProducer){
        this.database = database;
        this.authHttpClient = authHttpClient;
        this.urlProducer = urlProducer;
    }
    

    async Create(token: Token, reqLongUrl: string, reqEmail: string, reqIsPrivate: string): Promise<string>{
        /*
            steps
            1: is token authenticated? 
                * false - return rejected promise
            2: is valid url?
                * false - return rejected promise
            3: inert new url to mysql
            4: is inserted?
                * false - return rejected promise
            5: produce url created to sqs
            6: return url
        */

       const urlPropertiesQuery: string = '';
       const resLinkProperties: mysql.RowDataPacket = await this.urlService.Execute<mysql.RowDataPacket>(urlPropertiesQuery); 




        return ""

    }

    async Read(){

    }



    private async TokenValidate(reqEmail: string, userToken: Token){
        const response = await this.authHttpClient.UserValidetionToken(reqEmail, { ...userToken });
        return


    }



    async Execute<T>(query: string): Promise<T>{
            return await this.database.Execute<T>(query); 
    }

    async LinkValidetionToken(validToken: Token) {
        return await this.authHttpClient.LinkValidetionToken(validToken);
    }

    async ProduceShortUrl(reqEmail: string , shortUrl: string, longUrl: string): Promise<void>{
        return await this.urlProducer.ProduceShortUrl(reqEmail, shortUrl, longUrl);
    }         
}