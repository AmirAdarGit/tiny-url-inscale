import axios from "axios"

interface Credentials {
    Email: string
    Password: String
}

interface UserMetadata {
    Name: string
    Newsletter: boolean
}

interface Token {
    Value: string
}

interface IAuthServiceHttpClient {
    Login(Credentials): Promise<Token>
    SignUp(Credentials, UserMetadata): Promise<void>
}

class AuthServiceHttpClient implements IAuthServiceHttpClient {
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