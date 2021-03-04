import { AuthService } from "./service";
import { IUserServiceHttpClient } from "../../shared/interfaces/user/IUserServiceHttpClient";
import { SignUpProducer } from "../produce.email.sqs/produce";
import { ISqsProducer } from "../../shared/interfaces/sqsProducer"
import { Credentials , UserMetadata} from '../../shared/models/common';
import { IHttpClient } from "../../shared/interfaces/httpClient/IHttpClient";
import { HttpClient } from "../../shared/modules/httpClient/src/HttpClient";
import { UserServiceHttpClient } from "../../shared/modules/userServiceHttpClient/src/client";
import { HttpClientError, ValidationError } from "./errors";
import { User } from "../../shared/models/user";
import { Token } from "../../shared/models/authenticate";
import  * as sinon from "sinon";
import * as jwt from 'jsonwebtoken'; 

// Dependencies
   
const httpClient: IHttpClient = new HttpClient();
const userServiceHttpClient: IUserServiceHttpClient = new UserServiceHttpClient(httpClient);
const signUpProducer: ISqsProducer = new SignUpProducer();
const service = new AuthService(userServiceHttpClient, signUpProducer);

var user: User = { 
    email: "vasilisky@gmail.com",
    password: "$2b$10$aMameXgn6zr31D7WpaU0TOQr6Tk8fKfvt2SRYHGZN2bGcg3H5v0Vq" 
}

var credentials: Credentials = {
    email: "vasilisky@gmail.com",
    password: "talV" 
}

// Stubbing

const httpClientCreateStub: sinon.SinonStub = sinon.stub(userServiceHttpClient, "create");
const httpClientGetStub: sinon.SinonStub = sinon.stub(userServiceHttpClient, "get");
const sqsProducerStub: sinon.SinonStub = sinon.stub(signUpProducer, "SqSProduce");
const jwtSignStub: sinon.SinonStub = sinon.stub(jwt, "sign");
const jwtVerifyStub: sinon.SinonStub = sinon.stub(jwt, "verify");

// Testing

describe("Auth service - authenticate method", () => {

    beforeEach(() => {
        jwtVerifyStub.reset()
    })

    test("Should return user email from the encoded token", () => {
        const expected = "vasilisky@gmail.com";
        jwtVerifyStub.returns({ email: expected })

        const actual: string = service.authenticate(new Token(""));
        
        expect(actual).toEqual(expected);
        expect(jwtVerifyStub.calledOnce).toBe(true);
    });

    test("Should fail when the token is invalid", async () => {
        jwtVerifyStub.returns(null);

        const token: Token = new Token("invalid token");
        const expected: string = "";
        const actual = service.authenticate(token); 
        
        expect(actual).toBe(expected);
        expect(jwtVerifyStub.calledOnce).toBe(true);
    });

    test("Should fail when an exception is thrown", async () => {
        jwtVerifyStub.throws(new Error("error!"));
        const token: Token = new Token("invalid token");

        const expected: string = "";
        const actual = service.authenticate(token); 

        expect(actual).toBe(expected);
        expect(jwtVerifyStub.calledOnce).toBe(true);
    });
});


describe("Auth service logIn", () => {

    beforeEach(() => {
        httpClientGetStub.reset();
        jwtSignStub.reset();
    })

    test("Should succeed when nothing fails", async () => {
        const jwtToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhc2lsaXNreUBnbWFpbC5jb20iLCJpYXQiOjE2MTI5NTY1Njl9.ui8tjpxTCJ437HeM3nFLw9obzej7_sfdMKvl36ZfkAc";
        httpClientGetStub.returns(user);
        jwtSignStub.returns(jwtToken)

        const expected = new Token(jwtToken);
        const actual = await service.logIn(credentials);

        expect(actual).toEqual(expected);
        expect(httpClientGetStub.calledOnce).toBe(true);
        expect(jwtSignStub.calledOnce).toBe(true);
    });


    test("Should fail when input is invalid", async () => {
        await expect(service.logIn(null)).rejects.toThrow(new ValidationError("invalid credentials"));
    });

    test("Should fail when http request to user service returns null", async () => {
        httpClientGetStub.returns(null);

        await expect(service.logIn(credentials)).rejects.toThrow(new HttpClientError("Failed to get user"));
        expect(httpClientGetStub.calledOnce).toBe(true);
    });

    test("Should throw an exception when user password is incorrect", async () => {
        var credentials: Credentials = {
            email: "vasilisky@gmail.com",
            password: "different" 
        };

        httpClientGetStub.returns(user);

        await expect(service.logIn(credentials)).rejects.toThrow(new ValidationError("Password does not match."));
        expect(httpClientGetStub.calledOnce).toBe(true);
        expect(jwtSignStub.calledOnce).toBe(false);
    });  
    
});


describe("Auth service signUp", () => {

    beforeEach(() => {
        httpClientCreateStub.reset();
        sqsProducerStub.reset();
    })

    test("Should succeed when http request to user service returns positive response", async () => {

        httpClientCreateStub.returns(true);
        sqsProducerStub.returns(null);

        await service.signUp(credentials, new UserMetadata());
        expect(httpClientCreateStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(true);

    });

    test("Should fail when http request to user service returns negative response (isSignUp: false)", async () => {

        httpClientCreateStub.returns(false);
        sqsProducerStub.returns(null);
        
        await expect(service.signUp(credentials, null)).rejects.toThrow(new HttpClientError());
        expect(httpClientCreateStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should fail when input is invalid", async () => {
        httpClientCreateStub.returns(false);
        sqsProducerStub.returns(null);

        await expect(service.signUp(null, null)).rejects.toThrow(new ValidationError("invalid credentials"));

        expect(httpClientCreateStub.calledOnce).toBe(false);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should throw an exception when userHttpClient fails", async () => {

        const expectedError: Error = new Error("error!");

        httpClientCreateStub.throws(expectedError);
        sqsProducerStub.returns(null);

        await expect(service.signUp(credentials, new UserMetadata())).rejects.toThrow(expectedError);
        expect(httpClientCreateStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should not throw an exception when sqsProducer fails", async () => {

        httpClientCreateStub.returns(true);
        sqsProducerStub.throws(new Error("error!"));

        await expect(service.signUp(credentials, new UserMetadata())).resolves.toBeUndefined();
        expect(httpClientCreateStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(true);
        expect(sqsProducerStub.threw()).toBe(true);
    });
});