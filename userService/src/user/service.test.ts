import { Database } from "../../../shared/modules/database/src/database";
import { Idatabase } from "../../../shared/interfaces/database/Idatabase";
import  * as sinon from "sinon";
import  * as errors  from ".././user/errors";
import { UserService } from "../user/service";


// Dependencies
const database: Idatabase = new Database(process.env.DB_CONFIGE_HOST, process.env.DB_CONFIGE_USER, process.env.DB_CONFIGE_PASSWORD, process.env.DB_CONFIGE_DATABASE);
const userService: UserService = new UserService(database);

// Stubbing

const databaseExecuteStub: sinon.SinonStub = sinon.stub(database, "Execute");


const email: string = "vasilisky@gmail.com";
const userName: string = "vasilisky";
const userPassword: string = "talV";

const insertUserQuery: string = `INSERT INTO Tiny_URL.Users VALUES ( '${email}', '${userName}', '${userPassword}')`; 
const selectUserQuery = `SELECT * FROM Tiny_URL.Users where Email = '${email}'`;


describe("User service - create method", () => {

    beforeEach(() => {
        databaseExecuteStub.reset();
    })

    test("Should success to create new user when nothing fails ", async () => {
       
        databaseExecuteStub.withArgs(insertUserQuery).returns(true);
        const actual = await userService.create(email, userPassword, userName);
        const expected = true;

        expect(actual).toBe(expected);

    });
    test("Should fail to create new user when database module faild ", async () => {
       
        databaseExecuteStub.withArgs(insertUserQuery).returns(false); 
        const actual = userService.create(email, userPassword, userName);
        const expected: Error = new errors.DatabaseError("Fail to create new user");

        await expect(actual).rejects.toThrow(expected);

    });

});

describe("User service - read method", () => {

    beforeEach(() => {
        databaseExecuteStub.reset();
    })

    test("Should success to get user when nothing faild ", async () => {
       
        databaseExecuteStub.withArgs(selectUserQuery).returns(true);
        const actual = await userService.read(email);
        const expected = true;

        expect(actual).toBe(expected);

    });
    test("Should fail getting user when database module faild ", async () => {
       
        databaseExecuteStub.withArgs(selectUserQuery).returns(false); 
        const actual = userService.read(email);
        const expected: Error = new errors.DatabaseError("Fail to get user");

        await expect(actual).rejects.toThrow(expected);

    });

});





    // describe("user service - read method", () => {

    //     beforeEach(() => {
    //         databaseExecuteStub.reset();
    //     })
    
    //     test("Should return short url when nothing fails ", async () => {
           
    //         databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
    //         databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
    //         const expected: string = expectedShortUrl;
    //         const actual = await urlService.create(token, legalUrl, isPrivate)
    //         expect(actual).toBe(expected);
    //     });
    
        // test("Should fail when the token is invalid", async () => {
            
        //     httpClientStub.returns(null);
        //     const actual = urlService.create(token, legalUrl, isPrivate);
        //     const expected: Error = new errors.ValidationError("invalid Token");
            
        //     await expect(actual).rejects.toThrow(expected);
        // });
    
        // test("Should fail when the site is not legal", async () => {
        //     const ilegalUrl: string = "https://www.yodds dutube.ccom";
    
        //     httpClientStub.returns(email);
        //     databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
        //     databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
            
        //     const expected: Error = new errors.ValidationError("invalid Url");
        //     const actual = urlService.create(token, ilegalUrl, isPrivate)
        //     await expect(actual).rejects.toThrow(expected);
        // });
    
        // test("Should fail when an the database cannot insert new url", async () => {
        //     httpClientStub.returns(email);
        //     databaseExecuteStub.withArgs(insertUrlQuery).returns(false);
            
        //     const expected: Error = new errors.DatabaseError("Error inserting url to the database");
        //     const actual = urlService.create(token, legalUrl, isPrivate)
        //     expect(actual).rejects.toThrow(expected);
    
        // });
    
        // test("Should fail when an the database cannot get short url", async () => {
    
        //     httpClientStub.returns(email);
        //     databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
        //     databaseExecuteStub.withArgs(getShortUrlQuery).returns("");
    
        //     const expected: Error = new errors.DatabaseError("Error selecting url from the database");
        //     const actual = urlService.create(token, legalUrl, isPrivate)
        //     expect(actual).rejects.toThrow(expected);
        // });
    
        // test("Should success to create short Url if sqs producer faild ", async () => {
    
        //     httpClientStub.returns(email);
        //     databaseExecuteStub.withArgs(insertUrlQuery).returns(true);
        //     databaseExecuteStub.withArgs(getShortUrlQuery).returns("10");
        //     urlProducerStub.throws();

        //     const expected: string = expectedShortUrl;
        //     const actual = await urlService.create(token, legalUrl, isPrivate)
        //     expect(actual).toBe(expected);
        //     expect(urlProducerStub.threw()).toBe(true);
        // });
    
    // });

