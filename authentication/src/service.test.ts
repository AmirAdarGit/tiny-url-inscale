import { AuthService } from "./service";
import { IUserServiceHttpClient } from "../../shared/interfaces/user/IUserServiceHttpClient"
import { ISqsProducer, SignUpProducer } from "../produce.email.sqs/produce";
import { Credentials , UserMetadata} from '../../shared/models/common';
import { IHttpClient } from "../../shared/interfaces/httpClient/IHttpClient"
import  * as sinon from "sinon"
import { HttpClient } from "../../shared/modules/httpClient/src/HttpClient";
import { UserServiceHttpClient } from "../../shared/modules/userServiceHttpClient/src/client"
import { HttpClientError, ValidationError } from "./errors";

const httpClient: IHttpClient = new HttpClient() 
const userServiceHttpClient: IUserServiceHttpClient = new UserServiceHttpClient(httpClient);
const sqsProducer: ISqsProducer = new SignUpProducer();
const service = new AuthService(userServiceHttpClient, sqsProducer);
const credentials = new Credentials("carmels@gmail.com", "password");
const httpClientStub: sinon.SinonStub = sinon.stub(userServiceHttpClient, "create");
const sqsProducerStub: sinon.SinonStub = sinon.stub(sqsProducer, "SqSProduceSignUp");

describe("Auth service signUp", () => {

    beforeEach(() => {
        httpClientStub.reset();
        sqsProducerStub.reset();
    })

    test("Should succeed when http request to user service returns positive response", async () => {

        httpClientStub.returns(true);
        sqsProducerStub.returns(null);

        await service.signUp(credentials, new UserMetadata());
        expect(httpClientStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(true);

    });

    test("Should fail when http request to user service returns negative response", async () => {

        httpClientStub.returns(false);
        sqsProducerStub.returns(null);
        
        await expect(service.signUp(credentials, null)).rejects.toThrow(new HttpClientError());
        expect(httpClientStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should fail when input is invalid", async () => {
        httpClientStub.returns(false);
        sqsProducerStub.returns(null);

        await expect(service.signUp(null, null)).rejects.toThrow(new ValidationError());

        expect(httpClientStub.calledOnce).toBe(false);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should throw an exception when userHttpClient fails", async () => {

        const expectedError: Error = new Error("error!");

        httpClientStub.throws(expectedError);
        sqsProducerStub.returns(null);

        await expect(service.signUp(credentials, new UserMetadata())).rejects.toThrow(expectedError);
        expect(httpClientStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(false);
    });

    test("Should not throw an exception when sqsProducer fails", async () => {

        httpClientStub.returns(true);
        sqsProducerStub.throws(new Error("error!"));

        await expect(service.signUp(credentials, new UserMetadata())).resolves.toBeUndefined();
        expect(httpClientStub.calledOnce).toBe(true);
        expect(sqsProducerStub.calledOnce).toBe(true);
        expect(sqsProducerStub.threw()).toBe(true);
    });
    
});