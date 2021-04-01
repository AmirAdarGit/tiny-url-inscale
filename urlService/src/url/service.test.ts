import { HttpClient } from "../../../shared/modules/httpClient/src/HttpClient"
import { IHttpClient } from "../../../shared/interfaces/httpClient";

import { AuthServiceHttpClient } from "../../../shared/modules/authServiceHttpClient/src/client"
import { IAuthServiceHttpClient } from "../../../shared/interfaces/authenticate/IAuthServiceHttpClient"

import { Database } from "../../../shared/modules/database/src/database";
import { Idatabase } from "../../../shared/interfaces/database/Idatabase";

import { UrlService } from "./service"
import { NewUrlProducer } from "../produce.url.sqs/produce";
import { ISqsProducer } from "../../../shared/interfaces/sqsProducer" 
import  * as sinon from "sinon";
import { Token } from "../../../shared/models/authenticate";

import  * as mysql  from 'mysql';
import  * as errors  from "../../../shared/errors"
import  * as AWS  from "aws-sdk"
import { Url } from "../../../shared/models/url";


// Dependencies
const database: Idatabase = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const httpClient: IHttpClient = new HttpClient();
const authServiceHttpClient: IAuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlProducer: ISqsProducer = new NewUrlProducer(process.env.AWS_QUEUE_REGION, process.env.AWS_QUEUE_URL); //inject the region
const urlService: UrlService = new UrlService (database, authServiceHttpClient, urlProducer);

// Stubbing

const databaseExecuteStub: sinon.SinonStub = sinon.stub(database, "Execute");
const urlProducerStub: sinon.SinonStub = sinon.stub(urlProducer, "SqSProduce"); 
const httpClientStub: sinon.SinonStub = sinon.stub(authServiceHttpClient, "getEmail");

const isPrivate: boolean = true;
const email: string = "vasilisky@gmail.com";
const legalUrl: string = "https://www.yoddsdutube.ccom";
const expectedShortUrl: string = "10";
const token: Token = new Token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2lsaXNreUBnbWFpbC5jb20iLCJpYXQiOjE2MTI5NTY1Njl9.ui8tjpxTCJ437HeM3nFLw9obzej7_sfdMKvl36ZfkAc");

const getShortUrlQuery: string = `SELECT ShortURL FROM tiny_url.Links WHERE LongURL = '${legalUrl}'`;
const insertUrlQuery: string = `INSERT INTO tiny_url.Links (LongURL, Email, IsPrivate) VALUES ('${legalUrl}', '${email}', ${isPrivate})`;
const getUrlQuery: string = `SELECT * FROM tiny_url.Links where ShortURL = '${expectedShortUrl}'`;


describe("Url service - read method", () => {

    beforeEach(() => {
        httpClientStub.reset();
        databaseExecuteStub.reset();
    })

    test("Should return url when nothing fails ", async () => {
       
        httpClientStub.returns(email);
        const url: Url = new Url(legalUrl, email, isPrivate)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);

        const actual = await urlService.read(expectedShortUrl, token);
        const expected = legalUrl;

        expect(actual).toBe(expected);

    });

    test("Should return url when the access privacy is public", async () => {

        const publicAccess: boolean = false;
        const url: Url = new Url(legalUrl, email, publicAccess)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);
        const spyHttpClient = jest.spyOn(authServiceHttpClient, 'getEmail');

        const actual = await urlService.read(expectedShortUrl, token);
        const expected = legalUrl;

        expect(actual).toBe(expected);
        expect(spyHttpClient).not.toBeCalled();

    });


    // TODO: fix the 3 test cases.
    
    test("Should fail when short url is invalid", async () => {
        
        const negativNumber: string = "-10";
        const decimalNumber: string = "3.5"
        const englishWord: string = "hello world";

        const expected = new errors.ValidationError("invalid Url");
        const actual1 = urlService.read(negativNumber, token);
        const actual2 = urlService.read(decimalNumber, token);
        const actual3 = urlService.read(englishWord, token);
        
        
        await expect(actual1).rejects.toThrow(expected);
        await expect(actual2).rejects.toThrow(expected);
        await expect(actual3).rejects.toThrow(expected);

    });

        test("Should fail when the database cannot get url", async () => {

            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(getUrlQuery).returns(null);
        
            const expected: Error = new errors.DatabaseError("Error inserting url to the database");
            const actual = urlService.read(expectedShortUrl, token);

            await expect(actual).rejects.toThrow(expected);
    });

    test("Should fail when the link is private and no token is attachet to the request", async () => {

        httpClientStub.returns(email);
        const url: Url = new Url(legalUrl, email, isPrivate)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);
        const invalidToken: Token = new Token(null);

        const expected: Error = new errors.ValidationError("Private links must have token for validation");
        const actual = urlService.read(expectedShortUrl, invalidToken);
       
        expect(actual).rejects.toThrow(expected);
    });

    test("Should fail when the link is private and the token is invalid", async () => {

        const url: Url = new Url(legalUrl, email, isPrivate)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);
        httpClientStub.returns(null);

        const expected: Error = new errors.ValidationError("invalid Token");
        const actual = urlService.read(expectedShortUrl, token);
       
        expect(actual).rejects.toThrow(expected);
    });
});

    describe("Url service - create method", () => {

        beforeEach(() => {
            httpClientStub.reset();
            databaseExecuteStub.reset();
        })
    
        test("Should return short url when nothing fails ", async () => {
           
            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
            const expected: string = expectedShortUrl;
            const actual = await urlService.create(token, legalUrl, isPrivate)
            
            expect(actual).toBe(expected);
        });
    
        test("Should fail when the token is invalid", async () => {
            
            httpClientStub.returns(null);
            const actual = urlService.create(token, legalUrl, isPrivate);
            const expected: Error = new errors.ValidationError("invalid Token");
            
            await expect(actual).rejects.toThrow(expected);
        });
    
        test("Should fail when the site is not legal", async () => {

            const ilegalUrl: string = "https://www.yodds dutube.ccom";
            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
            const expected: Error = new errors.ValidationError("invalid Url");
            const actual = urlService.create(token, ilegalUrl, isPrivate)
            
            await expect(actual).rejects.toThrow(expected);
        });
    
        test("Should fail when an the database cannot insert new url", async () => {
            
            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(insertUrlQuery).returns(false);
            
            const expected: Error = new errors.DatabaseError("Error inserting url to the database");
            const actual = urlService.create(token, legalUrl, isPrivate)
            
            expect(actual).rejects.toThrow(expected);
        });
    
        test("Should fail when an the database cannot get short url", async () => {
    
            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("");
    
            const expected: Error = new errors.DatabaseError("Error selecting url from the database");
            const actual = urlService.create(token, legalUrl, isPrivate)
        
            expect(actual).rejects.toThrow(expected);
        });
    
        test("Should success to create short Url if sqs producer faild ", async () => {
    
            httpClientStub.returns(email);
            databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            urlProducerStub.throws();

            const expected: string = expectedShortUrl;
            const actual = await urlService.create(token, legalUrl, isPrivate)
            expect(actual).toBe(expected);
            expect(urlProducerStub.threw()).toBe(true);
        });
    });