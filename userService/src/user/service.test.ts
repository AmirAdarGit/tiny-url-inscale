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