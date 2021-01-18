import axios from "axios"
import { IAuthServiceHttpClient } from "../../interfaces/authenticate.interfaces/authention"
import { Credentials, UserMetadata, Token } from '../../interfaces/sheard.interfaces/Isheard';

export class AuthServiceHttpClient implements IAuthServiceHttpClient {
    async Login(credentials: Credentials): Promise<Token> {
        return this.post<Token>("http://localhost:8090/api/autentication/login", { ...credentials })
    }

    async SignUp(credentials: Credentials, userMetadata: UserMetadata): Promise<void> {
        const newUser = {
            ...credentials,
            ...userMetadata
        }
        
        return this.post("http://localhost:8090/api/autentication/signUp", newUser)
    }

    async post<T>(url: string, payload: object): Promise<T> {
        const response = await axios.post<T>(url, payload);
        
        if (response.status != 200) {
            return new Promise((resolve, reject) => reject() )
        }

        return response.data
    }
}