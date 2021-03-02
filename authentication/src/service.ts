import { Credentials , UserMetadata} from '../../shared/models/common'
import { IUserServiceHttpClient } from "../../shared/interfaces/user/IUserServiceHttpClient"
import { User } from '../../shared/models/user'
import { Token } from "../../shared/models/authenticate"
import { ISqsProducer } from "../produce.email.sqs/produce";
import  * as errors  from "./errors"

import * as bcrypt from "bcrypt"
import * as jwt from 'jsonwebtoken' 

export class AuthService {

    private userHttpClient: IUserServiceHttpClient;
    private signUpProducer: ISqsProducer;

    constructor(userHttpClient: IUserServiceHttpClient, signUpProducer: ISqsProducer){
        this.userHttpClient = userHttpClient;
        this.signUpProducer = signUpProducer;
    }

    async signUp (credentials: Credentials, userMetadata: UserMetadata): Promise<void> {   
        const isValid: boolean = this.validate(credentials);
        if(!isValid) return new Promise((res, rej) => { rej(new errors.ValidationError("invalid credentials"))});

        const encryptedPass = await this.getEncryptPassword(credentials.password);
        const encryptedCredentials: Credentials = {
            email: credentials.email,
            password: encryptedPass 
        } 
        const isSignUp = await this.userHttpClient.create(encryptedCredentials, userMetadata);
        if (!isSignUp) return new Promise((res, rej) => { rej(new errors.HttpClientError()) }); 
    
        try { await this.signUpProducer.SqSProduceSignUp(credentials.email); }   
        catch { /*console.log("Failed to send message to sqs");*/ }
        
    }

    async logIn (credentials: Credentials): Promise<Token> { 
        const isValid: boolean = this.validate(credentials);
        if(!isValid) return new Promise((res, rej) => { rej(new errors.ValidationError("invalid credentials"))});

        const user: User = await this.userHttpClient.get(credentials.email);
        if (!user) return new Promise((res, rej) => { rej(new errors.HttpClientError()) });  
        const { password: userEncryptedPassFromDb, email: email } = user;
        const isValidPassword = await this.comparePasswords(credentials.password, userEncryptedPassFromDb);

        if (isValidPassword) { 
            return this.createToken(email);
        } else { 
            return new Promise((res, rej) => { rej(new errors.ValidationError("Password does not match.")); })
        }
    }
    

    authenticate(token: Token): string {
        const email: string = this.getEmail(token);
        if (email) return email;
        else new Promise((res, rej) => { rej( new errors.jwtError("Exception from jew module")) })     
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
        } else return null;
    }

    private validate(credentials: Credentials): boolean {
        if (credentials == null) return false;
        if (credentials.password == "") return false;
        if (credentials.email == "") return false;

        return true;
    }
}    