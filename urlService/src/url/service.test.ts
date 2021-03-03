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
import  * as errors  from "./errors";

import  * as AWS  from "aws-sdk"
import { Url } from "../../../shared/models/url";


// Dependencies
const sqs: AWS.SQS = new AWS.SQS({ apiVersion: '2012-11-05'});
const database: Idatabase = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const httpClient: IHttpClient = new HttpClient();
const authServiceHttpClient: IAuthServiceHttpClient = new AuthServiceHttpClient(httpClient);
const urlProducer: ISqsProducer = new NewUrlProducer(process.env.AWS_QUEUE_REGION, process.env.AWS_QUEUE_URL); //inject the region
const urlService: UrlService = new UrlService (database, authServiceHttpClient, urlProducer);

// Stubbing

const httpClentStub: sinon.SinonStub = sinon.stub(authServiceHttpClient, "getEmail");
//const databaseConnectStub: sinon.SinonStub = sinon.stub(database, "Connect");
const databaseExecuteStub: sinon.SinonStub = sinon.stub(database, "Execute");
//const mySqlStub: sinon.SinonStub = sinon.stub(mysql, "createConnection");

const urlProducerStub: sinon.SinonStub = sinon.stub(urlProducer, "SqSProduce") 
// const isLegal: sinon.SinonStub = sinon.stub()

const isPrivate: boolean = true;
const email: string = "vasilisky@gmail.com";
const legalUrl: string = "https://www.yoddsdutube.ccom";
const expectedShortUrl: string = "10";

const insertQuery: string = `INSERT INTO Tiny_URL.Links (LongURL, Email, IsPrivate) VALUES ('${legalUrl}', '${email}', ${isPrivate})`
const getShortUrlQuery: string = `SELECT ShortURL FROM Tiny_URL.Links WHERE LongURL = '${legalUrl}'`;
const getUrlQuery: string = `SELECT * FROM Tiny_URL.Links where ShortURL = '${expectedShortUrl}'`
const token: Token = new Token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2lsaXNreUBnbWFpbC5jb20iLCJpYXQiOjE2MTI5NTY1Njl9.ui8tjpxTCJ437HeM3nFLw9obzej7_sfdMKvl36ZfkAc");


describe("Url service - read method", () => {

    beforeEach(() => {
        httpClentStub.reset();
        databaseExecuteStub.reset();
    })

    test("Should return url when nothing fails ", async () => {
       
        httpClentStub.returns(email);
        const url: Url = new Url(legalUrl, email, isPrivate)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);

        const actual = await urlService.read(expectedShortUrl, token);
        const expected = legalUrl;

        expect(actual).toBe(expected);

    });

    test("Should return url when the access is public", async () => {

        const publicAccess: boolean = false;
        const url: Url = new Url(legalUrl, email, publicAccess)
        databaseExecuteStub.withArgs(getUrlQuery).returns(url);
        const spyHttpClient = jest.spyOn(authServiceHttpClient, 'getEmail');

        const actual = await urlService.read(expectedShortUrl, token);
        const expected = legalUrl;

        expect(actual).toBe(expected);
        expect(spyHttpClient).not.toBeCalled();

    });

    // test("Should fail when short url is invalid", async () => {
        
    //     const negativNumber: string = "-10";
    //     const decimalNumber: string = "2.3";
    //     const englishWord: string = "hello world";

    //     httpClentStub.returns(email);
    //     const url: Url = new Url(legalUrl, email, isPrivate)
    //     databaseExecuteStub.withArgs(getUrlQuery).returns(url);

    //     const expected: Error = new errors.ValidationError("invalid Url");
    //     const actual1 = await urlService.read(negativNumber, token);
    //     // const actual2 = await urlService.read(decimalNumber, token);
    //     // const actual3 = await urlService.read(englishWord, token);

    //     await expect(actual1).toThrow(expected);

    // });

    //     test("Should fail when the database cannot get url", async () => {

    //         httpClentStub.returns(email);
    //         databaseExecuteStub.withArgs(getUrlQuery).returns(null);
        
    //         const expected: Error = new errors.DatabaseError("Error inserting url to the database");
    //         const actual = await urlService.read(expectedShortUrl, token);

    //         await expect(actual).rejects.toThrow(expected);
    // });



    // test("Should return url when nothing fails ", async () => {

    //     httpClentStub.returns(null);
    //     const url: Url = new Url(legalUrl, email, isPrivate)
    //     databaseExecuteStub.withArgs(getUrlQuery).returns(url);

    //     const expected: Error = new errors.ValidationError("Invalid Token for private url.");
    //     const actual = await urlService.read(expectedShortUrl, token);

    //     await expect(actual).rejects.toThrow(expected);
    // });
});






    describe("Url service - create method", () => {

        beforeEach(() => {
            httpClentStub.reset();
            databaseExecuteStub.reset();
        })
    
        test("Should return short url when nothing fails ", async () => {
           
            httpClentStub.returns(email);
            databaseExecuteStub.withArgs(insertQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
            const expected: string = expectedShortUrl;
            const actual = await urlService.create(token, legalUrl, isPrivate)
            expect(actual).toBe(expected);
        });
    
        test("Should fail when the token is invalid", async () => {
            
            httpClentStub.returns(null);
            const actual = urlService.create(token, legalUrl, isPrivate);
            const expected: Error = new errors.ValidationError("invalid Token");
            
            await expect(actual).rejects.toThrow(expected);
        });
    
        test("Should fail when the site is not legal", async () => {
            const ilegalUrl: string = "https://www.yodds dutube.ccom";
    
            httpClentStub.returns(email);
            databaseExecuteStub.withArgs(insertQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
            const expected: Error = new errors.ValidationError("invalid Url");
            const actual = urlService.create(token, ilegalUrl, isPrivate)
            await expect(actual).rejects.toThrow(expected);
        });
    
        test("Should fail when an the database cannot insert new url", async () => {
            httpClentStub.returns(email);
            databaseExecuteStub.withArgs(insertQuery).returns(false);
            
            const expected: Error = new errors.DatabaseError("Error inserting url to the database");
            const actual = urlService.create(token, legalUrl, isPrivate)
            expect(actual).rejects.toThrow(expected);
    
        });
    
        
        test("Should fail when an the database cannot get short url", async () => {
    
            httpClentStub.returns(email);
            databaseExecuteStub.withArgs(insertQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("");
    
            const expected: Error = new errors.DatabaseError("Error selecting url from the database");
            const actual = urlService.create(token, legalUrl, isPrivate)
            expect(actual).rejects.toThrow(expected);
    
    
        });
    
        test("Should success to create short Url if sqs producer faild ", async () => {
    
            httpClentStub.returns(email);
            databaseExecuteStub.withArgs(insertQuery).returns(true);
            databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            urlProducerStub.throws();
    
            const expected: string = expectedShortUrl;
            const actual = await urlService.create(token, legalUrl, isPrivate)
            expect(actual).toBe(expected);
        });
    


    });

