import { Request, Response } from "express"   
import { Token } from "../../../shared/models/authenticate"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"
import { Idatabase } from "../../../shared/interfaces/database/Idatabase" 
import * as query from "../databaseUrlQuery/queries"
import * as mysql from 'mysql'
import { Database } from "../../../shared/modules/database/src/database"
import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"


export class UrlService {
    database: Database;
    authHttpClient: AuthServiceHttpClient;

    constructor(database: Database, authHttpClient: AuthServiceHttpClient){
        this.database = database;
        this.authHttpClient = authHttpClient;
    }
    
    async Execute<T>(query: string): Promise<T>{
            return await this.database.Execute<T>(query); 
    }

    async LinkValidetionToken(validToken: Token) {
        return await this.authHttpClient.LinkValidetionToken(validToken);
    }

    async ProduceShortUrl(reqEmail: string , shortUrl: string, longUrl: string): Promise<void>{
        return await this.ProduceShortUrl(reqEmail, shortUrl, longUrl);
    }         
}