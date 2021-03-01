import { AuthService } from "./service";
import { IUserServiceHttpClient } from "../../shared/interfaces/user/IUserServiceHttpClient"
import { ISqsProducer, SignUpProducer } from "../produce.email.sqs/produce";
import { Credentials , UserMetadata} from '../../shared/models/common'
import { User } from "../../shared/models/user";

class TestHttpClient implements IUserServiceHttpClient {
    get(email: string): Promise<User> {
        throw new Error("not implemented");
    }

    create(credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {
        if (credentials.email == "empty") { throw new Error("error!"); }

        return userMetadata ?
             new Promise((res, rej) => res(true)) : 
             new Promise((res, rej) => res(false));
    }
}

class TestSignUpProducer implements ISqsProducer {
    SqSProduceSignUp(userEmail: string): void { 
        if (userEmail == "empty2") { throw new Error("error!"); }
    }
}

const produceSpy = jest.spyOn(TestSignUpProducer.prototype, "SqSProduceSignUp");
const createSpy = jest.spyOn(TestHttpClient.prototype, "create");

const httpClient: IUserServiceHttpClient = new TestHttpClient();
const sqsProducer: ISqsProducer = new TestSignUpProducer();
const service = new AuthService(httpClient, sqsProducer);

const credentials = new Credentials("carmels@gmail.com", "password");

describe("Auth service signUp", () => {

    // beforeEach(() => {
    //     createSpy.mockRestore();
    //     produceSpy.mockRestore();
    // })

    test("Should return true when http request to user service returns positive response", async () => {
        const expected: boolean = true; 
        const actual: boolean = await service.signUp(credentials, new UserMetadata());

        expect(actual).toBe(expected);
        // expect(createSpy).toHaveBeenCalled();
        // expect(produceSpy).toHaveBeenCalled();
    });

    test("Should return false when http request to user service returns negative response", async () => {
        const expected: boolean = false; 
        const actual: boolean = await service.signUp(credentials, null);

        expect(actual).toBe(expected);
    });

    test("Should return false when input is invalid", async () => {
        const expected: boolean = false; 
        const actual: boolean = await service.signUp(null, new UserMetadata());

        expect(actual).toBe(expected);
    });

    test("Should throw an exception when userHttpClient fails", async () => {
        await expect(service.signUp(new Credentials("empty", "password"), new UserMetadata())).rejects.toThrow();
       
    });

    test("Should not throw an exception when sqsProducer fails", async () => {
        await expect(service.signUp(new Credentials("empty2", "password"), new UserMetadata())).resolves;
    });
    
});