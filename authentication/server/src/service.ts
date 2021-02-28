import { Credentials , UserMetadata} from '../../../shared/models/common'
import { IUserServiceHttpClient } from "../../../shared/interfaces/user/IUserServiceHttpClient"
import { User } from '../../../shared/models/user'
import { Token } from "../../../shared/models/authenticate"
import { SignUpProducer } from "../produce.email.sqs/produce";

import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 

export class AuthService {

    userHttpClient: IUserServiceHttpClient;
    private signUpProducer: SignUpProducer;

    constructor(userServiceHttpClient: IUserServiceHttpClient, signUpProducer: SignUpProducer){
        this.userHttpClient = userServiceHttpClient;
        this.signUpProducer = signUpProducer;
    }

    async signUp (credentials: Credentials, userMetadata: UserMetadata): Promise<boolean> {   

        const encryptedPass = await this.getEncryptPassword(credentials.password);
        const encryptedCredentials: Credentials = {
            email: credentials.email,
            password: encryptedPass 
        } 
        const isSignUp = await this.userHttpClient.create(encryptedCredentials, userMetadata);
        if (isSignUp) {
            await this.signUpProducer.SqSProduceSignUp(credentials.email); // only if the sighUp flow is working send to sqs the email.
        }
        return isSignUp;
    }

    async logIn (credentials: Credentials): Promise<Token> { 

        const user: User = await this.userHttpClient.get(credentials.email);
        const { password: userEncryptedPassFromDb, email: email } = user;
        const isValidPassword = await this.comparePasswords(credentials.password, userEncryptedPassFromDb);

        if (isValidPassword) { 
            return this.createToken(email);
        } else { 
            return new Promise((res, rej) => { rej("Password is not valid."); })
        }
    }
    
    authenticate(token: Token): string {
        return this.getEmail(token);     
    }

    private async comparePasswords(originalPassword: string, encryptedPassword: string): Promise<boolean> {
        return await bcrypt.compare(originalPassword, encryptedPassword);
    }
            
    private async getEncryptPassword(userPassword: string): Promise<string>{
        const salt = await bcrypt.genSalt(); 
        return await bcrypt.hash(userPassword, salt);
    }

    private createToken(email: string): Token{
        console.log("Authenticate-Module: generate new user Token");
        const value: string = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET );
        return new Token (value);        
    }

    private getEmail(token: Token): string {
        const decrypted = <any>jwt.verify(token.value, process.env.ACCESS_TOKEN_SECRET)
        if (decrypted){
            return String(decrypted['email'])
        } else return '';
    }
}    