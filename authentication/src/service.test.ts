import { AuthService } from "./service";
import { IUserServiceHttpClient } from "../../shared/interfaces/user/IUserServiceHttpClient"
import { ISqsProducer, SignUpProducer } from "../produce.email.sqs/produce";
import { Credentials , UserMetadata} from '../../shared/models/common';
import { IHttpClient } from "../../shared/interfaces/httpClient/IHttpClient"
import  * as sinon from "sinon"
import { HttpClient } from "../../shared/modules/httpClient/src/HttpClient";
import { UserServiceHttpClient } from "../../shared/modules/userServiceHttpClient/src/client"

// class TestHttpClient implements IUserServiceHttpClient {
//     get(email: string): Promise<User> {
//         throw new Error("not implemented");
//     }

//     create(credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {
//         if (credentials.email == "empty") { throw new Error("error!"); }

//         return userMetadata ?
//              new Promise((res, rej) => res(true)) : 
//              new Promise((res, rej) => res(false));
//     }
// }

// class TestSignUpProducer implements ISqsProducer {
//     SqSProduceSignUp(userEmail: string): void { 
//         if (userEmail == "empty2") { throw new Error("error!"); }
//     }
// }

const httpClient = new HttpClient()// Post, Get 
const userServiceHttpClient: IUserServiceHttpClient = new UserServiceHttpClient(httpClient);
const sqsProducer: ISqsProducer = new SignUpProducer();
const service = new AuthService(userServiceHttpClient, sqsProducer);

const credentials = new Credentials("carmels@gmail.com", "password");



describe("Auth service signUp", () => {

    test("Should return true when http request to user service returns positive response", async () => {
        const stub: sinon.SinonStub = sinon.stub(userServiceHttpClient, "create");
        stub.withArgs(credentials, new UserMetadata()).returns(true);

        const expected: boolean = true; 
        const actual: boolean = await service.signUp(credentials, new UserMetadata());
        expect(actual).toBe(expected);

    });

    // test("Should return false when http request to user service returns negative response", async () => {
    //     const expected: boolean = false; 
    //     const actual: boolean = await service.signUp(credentials, null);

    //     expect(actual).toBe(expected);
    // });

    // test("Should return false when input is invalid", async () => {
    //     const expected: boolean = false; 
    //     const actual: boolean = await service.signUp(null, new UserMetadata());

    //     expect(actual).toBe(expected);
    // });

    // test("Should throw an exception when userHttpClient fails", async () => {
    //     await expect(service.signUp(new Credentials("empty", "password"), new UserMetadata())).rejects.toThrow();
       
    // });

    // test("Should not throw an exception when sqsProducer fails", async () => {
    //     await expect(service.signUp(new Credentials("empty2", "password"), new UserMetadata())).resolves;
    // });
    
});